// backend/models/Royalties.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const royaltiesSchema = new Schema({
    royalties_id: {
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
    amount: {
        type: Number, // Tương ứng với kiểu Double trong SQL
        required: true,
    },
    payment_date: {
        type: Date, // Tương ứng với kiểu Datetime trong SQL
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi tạo
    },
    updated_at: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi tạo
    },
}, {
    // Tắt sinh trường _id
    _id: false,
});

// Thiết lập royalties_id là khóa chính
royaltiesSchema.index({ royalties_id: 1 }, { unique: true });

const Royalties = mongoose.model('Royalties', royaltiesSchema);

module.exports = Royalties;
