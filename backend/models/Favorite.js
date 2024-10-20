// backend/models/Favorite.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    favorite_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    user_id: {
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
}, {
    // Tắt sinh trường _id
    _id: false,
});

// Thiết lập favorite_id là khóa chính
favoriteSchema.index({ favorite_id: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
