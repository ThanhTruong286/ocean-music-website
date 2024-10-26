// UserController.js
const UserModel = require('../models/User');

// Lấy danh sách tất cả người dùng
exports.getUsers = (req, res) => {
  UserModel.getAllUsers((err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Error fetching users', error: err });
      }
      res.json(results);
  });
};

// Cập nhật thông tin người dùng theo ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
      const updatedUser = new UserModel(updatedData);
      await updatedUser.update(userId, (err, result) => {
          if (err) {
              return res.status(500).json({ message: 'Error updating user', error: err });
          }
          res.json({ message: 'User updated successfully' });
      });
  } catch (err) {
      res.status(500).json({ message: 'Error processing update request', error: err });
  }
};
// Tạo mới người dùng
exports.createUser = async (req, res) => {
  const userData = req.body;

  try {
      // Khởi tạo đối tượng User và lưu vào cơ sở dữ liệu
      const newUser = new UserModel(userData);
      await newUser.save((err, result) => {
          if (err) {
              return res.status(500).json({ message: 'Error creating user', error: err });
          }
          res.status(201).json({ message: 'User created successfully', userId: result.insertId });
      });
  } catch (err) {
      res.status(500).json({ message: 'Error processing request', error: err });
  }
};

// Xóa người dùng theo ID
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  UserModel.deleteById(userId, (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Error deleting user', error: err });
      }
      res.json({ message: 'User deleted successfully' });
  });
};

// Lấy thông tin người dùng theo ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  UserModel.findById(userId, (err, user) => {
      if (err) {
          return res.status(500).json({ message: 'Error fetching user by ID', error: err });
      }
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  });
};

