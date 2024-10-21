// UserModel.js
const db = require('../config/db'); // Kết nối DB

class UserModel {
    static getAllUsers(callback) {
        db.query('SELECT * FROM users', callback);
    }

    static getUserById(userId, callback) {
        db.query('SELECT * FROM users WHERE user_id = ?', [userId], callback);
    }

    static createUser(userData, callback) {
        db.query('INSERT INTO users (username, email, password, phone_number, role_id, status) VALUES (?, ?, ?, ?, ?, ?)',
            [userData.username, userData.email, userData.password, userData.phone_number, userData.role_id, userData.status],
            callback);
    }

    static updateUser(userId, userData, callback) {
        db.query('UPDATE users SET username = ?, email = ?, password = ?, role_id = ?, profile_url = ?, status = ?, phone_number = ?, is_vip = ?, date_of_birth = ? WHERE user_id = ?',
            [userData.username, userData.email, userData.password, userData.role_id, userData.profile_url, userData.status, userData.phone_number, userData.is_vip, userData.date_of_birth, userId],
            callback);
    }

    static deleteUser(userId, callback) {
        db.query('DELETE FROM users WHERE user_id = ?', [userId], callback);
    }
}

module.exports = UserModel;
