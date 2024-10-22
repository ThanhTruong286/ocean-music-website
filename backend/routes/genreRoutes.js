const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Route lấy tất cả các genre
router.get('/', genreController.getAllGenres);

// Route thêm một genre mới
router.post('/', genreController.createGenre);

// Route lấy genre theo ID
router.get('/:id', genreController.getGenreById);

// Route cập nhật genre theo ID
router.put('/:id', genreController.updateGenre);

// Route xóa genre theo ID
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
