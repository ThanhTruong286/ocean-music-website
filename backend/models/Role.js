// backend/models/Role.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    role_name: {
        type: String, // Tương ứng với kiểu Varchar trong SQL
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi tạo
    },
    updated_at: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi cập nhật
    }
}, {
    // Tắt sinh trường _id
    _id: false,
});

// Thiết lập role_id là khóa chính
roleSchema.index({ role_id: 1 }, { unique: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
