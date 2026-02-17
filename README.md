![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![Express](https://img.shields.io/badge/express-4.x-black)
![License](https://img.shields.io/badge/license-MIT-blue)
![Security](https://img.shields.io/badge/security-layered-success)
![Status](https://img.shields.io/badge/status-active-brightgreen)


# 🔐 Secure Express API

A production-ready Express.js security template featuring HTTPS, JWT authentication, RBAC authorization, Helmet with custom CSP, rate limiting, and centralized error handling.

This project demonstrates how to implement layered API security using modern backend best practices.

---

## 🚀 Features

- 🔐 HTTPS (TLS encryption)
- 🪖 Helmet with custom Content Security Policy (CSP)
- 🌍 CORS configuration
- 🚦 Rate limiting (IP-based)
- 🔑 JWT Authentication
- 👑 Role-Based Access Control (RBAC)
- 🧱 Global Error Handling Middleware
- ⚙ Modular project structure
- 📦 Environment-based configuration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Helmet
- CORS
- express-rate-limit
- jsonwebtoken
- bcryptjs
- node-forge (for self-signed HTTPS)

---

## 📂 Project Structure

```
secure-express-api
│
├── src
│   ├── app.js
│   ├── config.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── error.middleware.js
│   ├── routes
│   │   └── auth.routes.js
│   └── utils
│       └── asyncHandler.js
│
├── package.json
└── README.md
```

---

## 🔐 Security Layers Implemented

### 1️⃣ HTTPS (TLS)
The server runs over HTTPS using a self-signed certificate for development.

> ⚠ Browsers will show a certificate warning in development. This is expected.

---

### 2️⃣ Helmet Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- HSTS
- X-Content-Type-Options
- Referrer Policy

---

### 3️⃣ CORS Protection
Restricts allowed origins via environment configuration.

---

### 4️⃣ Rate Limiting
Limits excessive requests per IP to prevent abuse and brute-force attempts.

---

### 5️⃣ JWT Authentication
- Secure login endpoint
- Token expiration
- Protected routes
- Token verification middleware

---

### 6️⃣ Role-Based Access Control (RBAC)
- Role embedded inside JWT
- Admin-only route protection

---

### 7️⃣ Centralized Error Handling
- Global error middleware
- Async wrapper for promise-based routes
- Clean JSON error responses

---

## ⚙ Installation

Clone the repository:

```bash
git clone https://github.com/nick2726/secure_express_api.git
cd secure_express_api
```

Install dependencies:

```bash
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h
CLIENT_URL=https://localhost:3000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

---

## ▶ Running the Server

```bash
npm run dev
```

Server will run at:

```
https://localhost:3000
```

---

## 🧪 API Endpoints

### 🔓 Public Route

```
GET /
```

Response:
```json
{
  "success": true,
  "message": "Secure Express Server Running 🚀"
}
```

---

### 🔑 Login

```
POST /api/auth/login
```

Body:
```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

Returns:
```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

### 🔐 Protected Route

```
GET /api/protected
```

Header:
```
Authorization: Bearer <token>
```

---

### 👑 Admin Route

```
GET /api/admin
```

Requires:
- Valid JWT
- role = admin

---

## 📌 Future Enhancements

- Request validation (Zod / Joi)
- Structured logging (Pino)
- Refresh token system
- Per-user rate limiting
- CSRF protection
- Production SSL via reverse proxy

---

## 🏗 Architecture Philosophy

This project follows:

- Layered security approach
- Middleware-driven architecture
- Separation of concerns
- Environment-based configuration
- Production-style error handling

---

## 📜 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome.

If you’d like to enhance the security layer or improve architecture, feel free to fork and submit a PR.

---

## ⭐ If You Found This Useful

Give the repository a star!
