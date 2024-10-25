const db = require('../config/db'); // Kết nối với MySQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

// Hàm đăng ký người dùng
exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, phone } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Database query error during user check:', err); // Ghi lỗi vào console
          return reject(err);
        }
        resolve(results); // Kết quả từ database trả về có thể là một mảng
      });
    });

    // Kiểm tra nếu existingUser là một mảng và có người dùng trùng email
    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Băm mật khẩu người dùng
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng mới vào cơ sở dữ liệu
    const newUser = {
      username: username,
      email,
      phone_number: phone,
      role_id: 1,
      profile_url: '',
      status: 'active',
      is_vip: false,
      firstName: firstName,
      lastName: lastName
    };

    const query = 'INSERT INTO users (username, email, password, phone_number, role_id, profile_url, status, is_vip, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    await new Promise((resolve, reject) => {
      db.query(query, [newUser.username, newUser.email, hashedPassword, newUser.phone_number, newUser.role_id, newUser.profile_url, newUser.status, newUser.is_vip, newUser.firstName, newUser.lastName], (err, result) => {
        if (err) {
          console.error('Database query error during user registration:', err); // Ghi lỗi vào console
          return reject(err);
        }
        resolve(result);
      });
    });

    res.status(201).json({ message: 'User registered successfully.' });

  } catch (err) {
    console.error('Server error during registration:', err); // Ghi lỗi vào console
    res.status(500).json({ message: 'Server error', error: err.message }); // Gửi thêm thông tin lỗi
  }
};


// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Truy vấn để lấy thông tin người dùng
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Database query error during user login:', err);
          return reject(err);
        }
        resolve(results);
      });
    });

    // Kiểm tra xem có người dùng nào được tìm thấy không
    if (!results || results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];

    // Kiểm tra mật khẩu đã băm có tồn tại không
    if (!user.password) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Kiểm tra mật khẩu
    const passwordMatch = await bcrypt.compare(password, user.password)
      .catch(err => {
        console.error('Error during password verification:', err);
        return false; // Nếu có lỗi, giả sử mật khẩu không khớp
      });

    // Phản hồi kết quả xác thực
    if (passwordMatch) {
      // Tạo token
      const token = jwt.sign(
        { userId: user.user_id }, // Payload
        "MIKASA",
        { expiresIn: '30d' } // Thời hạn token là 30 ngày
      );

      // Trả về token và thông tin người dùng
      return res.status(200).json({
        message: 'Login successful',
        userId: user.user_id,
        token: token // Gửi token về client
      });
    } else {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGOUT
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during user logout:', err);
      return res.status(500).json({ message: 'Server error during logout' });
    }
    res.clearCookie('connect.sid'); // Xóa cookie lưu phiên
    return res.status(200).json({ message: 'Logout successful' });
  });
};


//Change Password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Kiểm tra đầu vào
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Mật khẩu không được để trống.' });
  }

  try {
    // Lấy thông tin người dùng từ req.user (đã được xác thực bởi middleware)
    const userId = req.user.id; // Giả sử bạn đã lưu id của người dùng trong req.user
    const user = await User.findById(userId); // Tìm người dùng trong cơ sở dữ liệu

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // So sánh mật khẩu hiện tại với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: 'Mật khẩu hiện tại không chính xác.' });
    }

    // Mã hóa mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    user.password = hashedNewPassword;
    await user.save();

    // Trả về phản hồi thành công
    return res.status(200).json({ message: 'Thay đổi mật khẩu thành công.' });
  } catch (error) {
    console.error('Lỗi khi thay đổi mật khẩu:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi thay đổi mật khẩu.' });
  }
};


