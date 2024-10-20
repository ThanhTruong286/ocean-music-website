// backend/models/Playlist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    playlist_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    title: {
        type: String, // Varchar 50
        maxlength: 50,
        required: true,
    },
    user_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
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

// Thiết lập playlist_id là khóa chính
playlistSchema.index({ playlist_id: 1 }, { unique: true });

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
