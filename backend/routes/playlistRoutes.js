const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Route lấy tất cả các playlist
router.get('/', playlistController.getAllPlaylists);

// Route thêm một playlist mới
router.post('/', playlistController.createPlaylist);

// Route lấy playlist theo ID
router.get('/:id', playlistController.getPlaylistById);

// Route cập nhật playlist theo ID
router.put('/:id', playlistController.updatePlaylist);

// Route xóa playlist theo ID
router.delete('/:id', playlistController.deletePlaylist);

module.exports = router;
