const db = require('../config/db'); // Đảm bảo đã kết nối với MySQL
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Nếu người dùng không tồn tại, tiến hành thêm người dùng mới
      const hashedPassword = await bcrypt.hash(password, 10); // Băm mật khẩu
      const newUser = {
        username: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        phone_number: phone,
        role_id: 1, // Giả sử role_id mặc định là 1
        profile_url: '', // Giả định không có profile URL ban đầu
        status: 'active',
        is_vip: false
      };

      const query = 'INSERT INTO users (username, email, password, phone_number, role_id, profile_url, status, is_vip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [newUser.username, newUser.email, newUser.password, newUser.phone_number, newUser.role_id, newUser.profile_url, newUser.status, newUser.is_vip], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error saving user to database' });
        }

        res.status(201).json({ message: 'User registered successfully.' });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
