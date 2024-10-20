// backend/models/Statistics.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    statistics_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    song_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
    },
    play_count: {
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

// Thiết lập statistics_id là khóa chính
statisticsSchema.index({ statistics_id: 1 }, { unique: true });

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
