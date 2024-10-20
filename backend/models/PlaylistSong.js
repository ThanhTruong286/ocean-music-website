// backend/models/PlaylistSong.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSongSchema = new Schema({
    playlist_song_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    playlist_id: {
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

// Thiết lập playlist_song_id là khóa chính
playlistSongSchema.index({ playlist_song_id: 1 }, { unique: true });

const PlaylistSong = mongoose.model('PlaylistSong', playlistSongSchema);

module.exports = PlaylistSong;
