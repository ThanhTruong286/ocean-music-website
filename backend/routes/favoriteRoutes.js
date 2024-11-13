const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// Lấy tất cả các bài hát yêu thích
router.get('/', favoriteController.getAllFavorites);

// Thêm một bài hát yêu thích
router.post('/', favoriteController.createFavorite);

// Xóa một bài hát yêu thích dựa trên favoriteId
router.delete('/:favoriteId', favoriteController.deleteFavorite);

module.exports = router;
