// controllers/userController.js
const User = require('../models/User');

// Lấy thông tin người dùng
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Không trả mật khẩu
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật thông tin người dùng
const updateUserProfile = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Cập nhật thông tin người dùng
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10); // Mã hóa mật khẩu mới
    }

    await user.save();
    res.status(200).json({ message: 'User profile updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
