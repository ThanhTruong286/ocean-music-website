const db = require('../config/db'); // Kết nối với MySQL
const bcrypt = require('bcryptjs');

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
      return res.status(200).json({ message: 'Login successful', userId: user.user_id });
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



