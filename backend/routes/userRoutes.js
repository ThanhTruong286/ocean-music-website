// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { route } = require('./authRoutes');

// Lấy danh sách người dùng
router.get('/', UserController.getUsers);

// Tạo người dùng mới
router.post('/', UserController.createUser);

// Xóa người dùng
router.delete('/:id', UserController.deleteUser);

// Bạn có thể thêm các route khác cho người dùng ở đây
router.get('/profile', UserController.getUserById);

module.exports = router;
