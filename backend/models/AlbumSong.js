// backend/models/AlbumSong.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSongSchema = new Schema({
    album_song_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    album_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
    },
    song_id: {
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

// Thiết lập album_song_id là khóa chính
albumSongSchema.index({ album_song_id: 1 }, { unique: true });

const AlbumSong = mongoose.model('AlbumSong', albumSongSchema);

module.exports = AlbumSong;
