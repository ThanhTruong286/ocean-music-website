// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đăng ký người dùng mới
router.post('/register', authController.registerUser);

// Đăng nhập người dùng
router.post('/login', authController.loginUser);

module.exports = router;
