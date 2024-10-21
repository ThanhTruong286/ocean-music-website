const db = require('../config/db'); // Kết nối với MySQL
const bcrypt = require('bcryptjs');

// Hàm đăng ký người dùng
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const [existingUser] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Băm mật khẩu người dùng
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng mới vào cơ sở dữ liệu
    const newUser = {
      username: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phone_number: phone,
      role_id: 1,
      profile_url: '',
      status: 'active',
      is_vip: false,
    };

    const query = 'INSERT INTO users (username, email, password, phone_number, role_id, profile_url, status, is_vip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    await new Promise((resolve, reject) => {
      db.query(query, [newUser.username, newUser.email, newUser.password, newUser.phone_number, newUser.role_id, newUser.profile_url, newUser.status, newUser.is_vip], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.status(201).json({ message: 'User registered successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Hàm đăng nhập người dùng
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu theo email
    const [results] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!results || results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Lấy đối tượng người dùng từ kết quả
    const user = results[0];

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Nếu đúng, trả về thông báo thành công (hoặc token JWT nếu cần)
    res.status(200).json({ message: 'Login successful', userId: user.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
