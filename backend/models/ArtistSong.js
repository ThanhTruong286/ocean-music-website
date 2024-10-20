// backend/models/ArtistSong.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSongSchema = new Schema({
    artist_song_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    artist_id: {
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

// Thiết lập artist_song_id là khóa chính
artistSongSchema.index({ artist_song_id: 1 }, { unique: true });

const ArtistSong = mongoose.model('ArtistSong', artistSongSchema);

module.exports = ArtistSong;
