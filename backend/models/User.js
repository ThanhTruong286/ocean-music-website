const db = require('../config/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class User {
    constructor({
        user_id,
        username,
        email,
        password,
        role_id,
        date_registered,
        profile_url,
        status,
        last_login,
        subscription_id,
        phone_number,
        is_vip,
        vip_expiration,
        login_attempts,
        last_login_attempt,
        gender,
        date_of_birth,
        first_name,
        last_name,
        subscription_name
    }) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
        this.date_registered = date_registered;
        this.profile_url = profile_url;
        this.status = status;
        this.last_login = last_login;
        this.subscription_id = subscription_id;
        this.phone_number = phone_number;
        this.is_vip = is_vip;
        this.vip_expiration = vip_expiration;
        this.login_attempts = login_attempts;
        this.last_login_attempt = last_login_attempt;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
        this.first_name = first_name;
        this.last_name = last_name;
        this.subscription_name = subscription_name
    }

    // Tìm người dùng theo resetToken
    static findByResetToken(resetToken, callback) {
        db.query('SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()', [resetToken], (err, results) => {
            if (err) {
                console.error('Error during database query:', err);
                return callback(err);
            }

            console.log("Results from DB: ", results); // Log kết quả từ truy vấn SQL

            if (!results || results.length === 0) {
                console.log('Token không hợp lệ hoặc đã hết hạn');
                return callback(null, null);
            }

            const user = new User(results[0]);
            callback(null, user);
        });
    }

    // Hash mật khẩu
    static async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    // Tạo mã thông báo đặt lại mật khẩu và lưu vào cơ sở dữ liệu
    static async generateResetToken(email, callback) {
        const token = crypto.randomBytes(32).toString('hex'); // Tạo mã thông báo ngẫu nhiên
        const expiresAt = new Date(Date.now() + 3600000); // Hết hạn trong 1 giờ

        db.query(
            `UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?`,
            [token, expiresAt, email],
            (err, results) => {
                if (err) return callback(err);
                if (results.affectedRows === 0) return callback(null, { message: 'Email not found' });
                callback(null, { resetToken: token, expiresAt });
            }
        );
    }

    // Lưu người dùng mới vào cơ sở dữ liệu
    async save(callback) {
        this.password = await User.hashPassword(this.password); // Hash mật khẩu trước khi lưu

        db.query(
            `INSERT INTO users (username, email, password, role_id, profile_url, status, 
             subscription_id, phone_number, is_vip, vip_expiration, gender, date_of_birth, 
             first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.username, this.email, this.password, this.role_id, this.profile_url,
                this.status, this.subscription_id, this.phone_number, this.is_vip,
                this.vip_expiration, this.gender, this.date_of_birth, this.first_name, this.last_name
            ],
            callback
        );
    }

    // Tìm người dùng theo ID
    static findById(userId, callback) {
        // Update the query to join with the subscriptions table
        db.query(`
        SELECT users.*, subscription.subscription_name 
        FROM users 
        LEFT JOIN subscription ON users.subscription_id = subscription.subscription_id 
        WHERE users.user_id = ?`,
            [userId],
            (err, results) => {
                if (err) {
                    console.error('Error during database query:', err);
                    return callback(err);
                }

                // Nếu không tìm thấy user
                if (!results || results.length === 0) {
                    console.log('User not found');
                    return callback(null, null);
                }
                const user = new User(results[0]);
                user.sub_name = results[0].sub_name;
                callback(null, user);
            }
        );
    }


    // Kiểm tra mật khẩu
    static async validatePassword(storedPassword, enteredPassword) {
        return await bcrypt.compare(enteredPassword, storedPassword);
    }

    // Đăng nhập người dùng
    static async login(email, password, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, { message: 'User not found' });

            const user = new User(results[0]);
            const isValidPassword = await User.validatePassword(user.password, password);

            if (!isValidPassword) {
                db.query(
                    'UPDATE users SET login_attempts = login_attempts + 1, last_login_attempt = NOW() WHERE user_id = ?',
                    [user.user_id]
                );
                return callback(null, { message: 'Invalid password' });
            }

            db.query('UPDATE users SET login_attempts = 0, last_login = NOW() WHERE user_id = ?', [user.user_id]);
            callback(null, { message: 'Login successful', user });
        });
    }

    // Cập nhật người dùng
    static update(userId, updatedData, callback) {
        db.query('UPDATE users SET ? WHERE user_id = ?', [updatedData, userId], (err, results) => {
            if (err) {
                console.error('Error during update query:', err);
                return callback(err); // Gọi callback với lỗi
            }
            callback(null, results); // Gọi callback với kết quả
        });
    }

    // Xóa người dùng theo ID
    static deleteById(userId, callback) {
        db.query('DELETE FROM users WHERE user_id = ?', [userId], callback);
    }

    // Tìm tất cả người dùng
    static getAllUsers(callback) {
        db.query('SELECT * FROM users', callback);
    }
}

module.exports = User;
