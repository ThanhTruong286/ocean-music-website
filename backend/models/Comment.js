// backend/models/Comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment_id: {
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
    comment: {
        type: String, // Tương ứng với kiểu Varchar
        required: true,
        maxlength: 255, // Giới hạn độ dài tối đa là 255 ký tự
    },
    created_at: {
        type: Date,
        default: Date.now, // Sử dụng timestamp hiện tại khi tạo
    },
}, {
    // Tắt sinh trường _id
    _id: false,
});

// Thiết lập comment_id là khóa chính
commentSchema.index({ comment_id: 1 }, { unique: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
