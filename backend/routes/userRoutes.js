// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { route } = require('./authRoutes');
const authenticateToken = require('../middlewares/authMiddleware');

// Lấy danh sách người dùng
router.get('/', UserController.getUsers);

// Tạo người dùng mới
router.post('/', UserController.createUser);

// Xóa người dùng
router.delete('/:id', UserController.deleteUser);

router.get('/profile', authenticateToken, UserController.getUserById);

module.exports = router;
