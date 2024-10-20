// backend/models/Album.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    album_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    title: {
        type: String, // Varchar 50
        maxlength: 50,
        required: true,
    },
    cover_image_url: {
        type: String, // Text, có thể sử dụng String cho URL
        required: true,
    },
    artist_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
    },
    release_date: {
        type: Date, // Sử dụng kiểu Date cho Datetime
        default: Date.now, // Sử dụng timestamp hiện tại nếu không được chỉ định
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

// Thiết lập album_id là khóa chính
albumSchema.index({ album_id: 1 }, { unique: true });

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
