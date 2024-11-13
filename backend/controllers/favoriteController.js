const FavoriteModel = require('../models/Favorite');

// Lấy tất cả các bài hát yêu thích
exports.getAllFavorites = (req, res) => {
    FavoriteModel.getAllFavorites((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Có lỗi xảy ra khi lấy danh sách bài hát yêu thích' });
        }
        res.status(200).json(results);
    });
};

// Tạo một bài hát yêu thích mới
exports.createFavorite = (req, res) => {
    const favoriteData = {
        user_id: req.body.user_id,
        song_id: req.body.song_id,
    };

    FavoriteModel.createFavorite(favoriteData, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Có lỗi xảy ra khi thêm bài hát yêu thích' });
        }
        res.status(201).json({ message: 'Thêm bài hát yêu thích thành công', favoriteId: result.insertId });
    });
};

// Xóa một bài hát yêu thích
exports.deleteFavorite = (req, res) => {
    const favoriteId = req.params.favoriteId;

    FavoriteModel.deleteFavorite(favoriteId, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Có lỗi xảy ra khi xóa bài hát yêu thích' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy bài hát yêu thích' });
        }
        res.status(200).json({ message: 'Xóa bài hát yêu thích thành công' });
    });
};  