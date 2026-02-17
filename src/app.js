import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import https from "https";
import forge from "node-forge";

import { config } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import { authenticateToken, authorizeRoles } from "./middleware/auth.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

/* =============================
   Body Parsing
============================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =============================
   Security Headers (Helmet + CSP)
============================= */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

/* =============================
   CORS
============================= */
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

/* =============================
   Rate Limiting
============================= */
const limiter = rateLimit({
  windowMs: config.rateLimitWindow * 60 * 1000,
  max: config.rateLimitMax,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/* =============================
   Auth Routes
============================= */
app.use("/api/auth", authRoutes);

/* =============================
   Public Route
============================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Secure Express Server Running 🚀",
  });
});

/* =============================
   Protected Route
============================= */
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route 🔐",
    user: req.user,
  });
});

/* =============================
   Admin Only Route (RBAC)
============================= */
app.get(
  "/api/admin",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin 👑",
      user: req.user,
    });
  }
);

/* =============================
   Global Error Handler
============================= */
app.use(errorHandler);

/* =============================
   HTTPS Server Setup
============================= */
function generateCertificate() {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();

  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(
    cert.validity.notBefore.getFullYear() + 1
  );

  const attrs = [{ name: "commonName", value: "localhost" }];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  return {
    key: forge.pki.privateKeyToPem(keys.privateKey),
    cert: forge.pki.certificateToPem(cert),
  };
}

const ssl = generateCertificate();

https
  .createServer(
    {
      key: ssl.key,
      cert: ssl.cert,
      minVersion: "TLSv1.2",
    },
    app
  )
  .listen(config.port, () => {
    console.log(
      `🚀 HTTPS Server running at https://localhost:${config.port}`
    );
  });
