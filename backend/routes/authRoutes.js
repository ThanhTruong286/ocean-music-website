const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route cho đăng ký người dùng
router.post('/register', authController.registerUser);

// Route cho đăng nhập người dùng
router.get('/login', authController.loginUser);

router.get('/login/callback', authController.loginCallback);

router.post('/logout', authController.logoutUser);

router.put('/change-password', authController.changePassword);

router.post('/send-email', authController.sendEmail);

router.post('/reset-password', authController.resetPassword);

module.exports = router;
