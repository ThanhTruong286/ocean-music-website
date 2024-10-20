// backend/models/ListeningHistory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listeningHistorySchema = new Schema({
    listening_history_id: {
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
    listening_time: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi tạo
    },
    duration_time: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại
    },
}, {
    // Tắt sinh trường _id
    _id: false,
});

// Thiết lập listening_history_id là khóa chính
listeningHistorySchema.index({ listening_history_id: 1 }, { unique: true });

const ListeningHistory = mongoose.model('ListeningHistory', listeningHistorySchema);

module.exports = ListeningHistory;
