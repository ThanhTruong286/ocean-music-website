const db = require('../config/db'); // Kết nối với MySQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const nodemailer = require('nodemailer');

exports.resetPassword = async (req, res) => {
  const { password, confirmPassword, resetToken, captchaToken } = req.body;

  console.log(password, confirmPassword, resetToken);

  // Kiểm tra nếu mật khẩu mới và mật khẩu xác nhận khớp
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
  }

  try {
    // Tìm người dùng có `resetToken`
    UserModel.findByResetToken(resetToken, (err, user) => {
      if (err) {
        console.error('Error finding user by reset token:', err);
        return res.status(500).json({ message: "Lỗi khi tìm người dùng" });
      }

      // Kiểm tra nếu không tìm thấy người dùng
      if (!user) {
        console.log("Không tìm thấy user với token:", resetToken);
        return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
      }

      // Kiểm tra xem token có hết hạn hay không
      if (new Date() > new Date(user.reset_token_expires)) {
        return res.status(400).json({ message: "Token đã hết hạn." });
      }

      console.log("User found: ", user);

      // Mã hóa mật khẩu mới
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ message: "Lỗi khi mã hóa mật khẩu." });
        }

        // Cập nhật mật khẩu cho người dùng
        UserModel.update(user.user_id, {
          password: hashedPassword,
          reset_token: null,
          reset_token_expires: null
        }, (updateErr, updateResults) => {
          if (updateErr) {
            console.error('Error during password update:', updateErr);
            return res.status(500).json({ message: "Đã có lỗi xảy ra trong quá trình thay đổi mật khẩu." });
          }

          console.log("Password updated successfully:", updateResults);
          return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công." });
        });
      });
    });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ message: "Đã có lỗi xảy ra trong quá trình thay đổi mật khẩu." });
  }
};

exports.sendEmail = async (req, res) => {
  const { email } = req.body;

  // Gọi hàm generateResetToken để tạo reset token và gửi email
  UserModel.generateResetToken(email, async (err, result) => {
    if (err) {
      console.error('Error generating reset token:', err);
      return res.status(500).json({ message: 'Error generating reset token' });
    }

    const resetLink = `http://localhost:3000/reset-password?token=${result.resetToken}`;

    // Tạo transporter để gửi email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'thainho24@gmail.com',
        pass: 'rojn bxuk lcsn gicg'
      }
    });

    // Thiết lập thông tin email
    const mailOptions = {
      from: 'thainho24@gmail.com',
      to: email,
      subject: 'Reset Password Request',
      text: 'Yêu cầu lấy lại mật khẩu',
      html: `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Yêu Cầu Lấy Lại Mật Khẩu</title>
          <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; }
              .container { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
              h1 { color: #007bff; }
              p { font-size: 16px; }
              .footer { margin-top: 20px; font-size: 14px; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Yêu Cầu Lấy Lại Mật Khẩu</h1>
              <p>Chào bạn,</p>
              <p>Chúng tôi đã nhận được yêu cầu lấy lại mật khẩu cho tài khoản của bạn. Nếu bạn không thực hiện yêu cầu này, bạn có thể bỏ qua email này.</p>
              <p>Để tiếp tục, hãy nhấn vào liên kết bên dưới:</p>
              <p><a href="${resetLink}">Đặt lại mật khẩu của bạn</a></p>
              <p>Trân trọng,<br>Đội ngũ hỗ trợ của chúng tôi</p>
              <div class="footer">
                  <p>© 2024 Công ty của bạn. Tất cả quyền được bảo lưu.</p>
              </div>
          </div>
      </body>
      </html>
      `
    };

    try {
      // Gửi email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.log("Error sending email:", error);
      res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
  });
};

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
        {
          userId: user.user_id,
          userRole: user.role_id
        }, // Payload
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
  const userId = req.user.userId;

  console.log(userId);

  // Kiểm tra thông tin đầu vào
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Missing password' });
  }

  try {
    UserModel.findById(userId, async (err, foundUser) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      // Kiểm tra nếu không tìm thấy user
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kiểm tra mật khẩu hiện tại
      const checkPass = await bcrypt.compare(currentPassword, foundUser.password);

      if (!checkPass) {
        return res.status(401).json({ message: "Password is incorrect" });
      }

      // Băm mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      UserModel.update(foundUser.user_id, { password: hashedPassword }, (err) => {
        if (err) {
          return res.status(500).json({ message: "Server error" });
        }
        res.status(200).json({ message: "Change successfully" });
      });
    });
  } catch (error) {
    console.error('Error in changePassword:', error); // Ghi log lỗi
    res.status(500).json({ message: 'Server error', error });
  }
};



