const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    name: {
        type: String, // Varchar 50
        maxlength: 50,
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

// Thiết lập genre_id là khóa chính
genreSchema.index({ genre_id: 1 }, { unique: true });

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
