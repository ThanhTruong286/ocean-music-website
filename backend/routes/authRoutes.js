const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

// Route cho đăng ký người dùng
router.post('/register', authController.registerUser);

// Route cho đăng nhập người dùng
router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

router.put('/change-password', authController.changePassword);

router.post('/send-email', authController.sendEmail);

module.exports = router;
