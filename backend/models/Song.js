// backend/models/Song.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    song_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
        // Không tự động sinh trường _id
    },
    title: {
        type: String, // Varchar 50
        maxlength: 50,
        required: true,
    },
    duration: {
        type: Number, // Integer
        required: true,
    },
    genre_id: {
        type: Number, // Integer
        required: true,
    },
    release_date: {
        type: Date, // Tương ứng với Datetime
        default: Date.now,
    },
    file_url: {
        type: String, // Varchar 255
        maxlength: 255,
        required: true,
    },
    cover_image_url: {
        type: String, // Varchar 255
        maxlength: 255,
        required: true,
    },
    lyric: {
        type: String, // Text
        default: '', // Nếu không có lời bài hát, để trống
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

// Thiết lập song_id là khóa chính
songSchema.index({ song_id: 1 }, { unique: true });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
