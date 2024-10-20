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

