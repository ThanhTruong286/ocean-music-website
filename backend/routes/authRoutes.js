const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route cho đăng ký người dùng
router.post('/register', authController.registerUser);

// Route cho đăng nhập người dùng
router.post('/login', authController.loginUser); // Sử dụng POST

router.post('/logout', authController.logoutUser);

module.exports = router;
