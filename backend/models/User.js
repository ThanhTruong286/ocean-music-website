// backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
        // Không tự động sinh trường _id
    },
    username: {
        type: String, // Varchar 50
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        maxlength: 50,
        required: true,
    },
    role_id: {
        type: Number, // Integer
        required: true,
    },
    date_registered: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi tạo user
    },
    profile_url: {
        type: String,
    },
    status: {
        type: String,
        maxlength: 255,
        default: null,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
    subscription_type: {
        type: String,
        maxlength: 50,
        default: 'Thường',
    },
    phone_number: {
        type: Number,
        default: null,
    },
    is_vip: {
        type: Boolean,
        default: false,
    },
    vip_expiration: {
        type: Date,
        default: Date.now,
    },
    login_attempts: {
        type: Number,
        default: 0,
    },
    last_login_attempt: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: Boolean,
        default: false,
    },
    date_of_birth: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, {
    // Tắt sinh trường _id
    _id: false,
});

// Thiết lập user_id là khóa chính
userSchema.index({ user_id: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
