// UserController.js
const UserModel = require('../models/User');

exports.getUsers = (req, res) => {
  UserModel.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const userData = req.body; // Giả định dữ liệu người dùng được gửi qua body
  UserModel.createUser(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user' });
    }
    res.status(201).json({ message: 'User created', userId: result.insertId });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id; // Lấy ID từ URL
  UserModel.deleteUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user' });
    }
    res.json({ message: 'User deleted' });
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  UserModel.getUserById(userId, (error, result) => {
    if (error) {
      console.error('Error fetching user by ID:', error); // Ghi lại lỗi
      return res.status(500).json({ message: 'Error getting user by ID' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' }); // Trả về thông báo nếu không tìm thấy người dùng
    }

    res.json(result[0]); // Trả về thông tin người dùng đầu tiên
  });
};

