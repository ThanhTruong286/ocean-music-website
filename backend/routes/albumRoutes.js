const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController'); // Đổi từ artistController sang albumController

// Route lấy tất cả albums
router.get('/', albumController.getAllAlbums);

// Route thêm một album mới
router.post('/', albumController.createAlbum);

// Route lấy album theo ID
router.get('/:id', albumController.getAlbumById);

// Route cập nhật album theo ID
router.put('/:id', albumController.updateAlbum);

// Route xóa album theo ID
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
