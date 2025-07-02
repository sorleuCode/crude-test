const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
