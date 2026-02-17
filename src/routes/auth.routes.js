import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

/* Fake user */
const user = {
  id: 1,
  email: "admin@test.com",
  password: bcrypt.hashSync("password123", 10),
  role: "admin",
};

/* Login Route */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email !== user.email) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({ success: true, token });
  })
);

export default router;
