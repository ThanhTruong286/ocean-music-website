const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    artist_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true,
        unique: true,
    },
    bio: {
        type: String, // Sử dụng String cho trường Text
        required: false, // Có thể không có
    },
    user_id: {
        type: Number, // Tương ứng với kiểu Integer trong SQL
        required: true, // Trường này là bắt buộc
    },
    debut_date: {
        type: Date, // Sử dụng kiểu Date cho Datetime
        default: Date.now, // Sử dụng timestamp hiện tại nếu không được chỉ định
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

// Thiết lập artist_id là khóa chính
artistSchema.index({ artist_id: 1 }, { unique: true });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
