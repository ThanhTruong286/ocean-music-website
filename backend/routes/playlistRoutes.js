const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authenticateToken = require('../middlewares/authMiddleware');

// Route lấy tất cả các playlist
router.get('/', authenticateToken, playlistController.getAllPlaylists);

// Route thêm một playlist mới
router.post('/', authenticateToken, playlistController.createPlaylist);

// Route lấy playlist theo ID
router.get('/:id', authenticateToken, playlistController.getPlaylistById);

// Route cập nhật playlist theo ID
router.put('/:id', authenticateToken, playlistController.updatePlaylist);

// Route xóa playlist theo ID
router.delete('/:id', authenticateToken, playlistController.deletePlaylist);

//Thêm nhạc vào playlist
router.post('/songs', authenticateToken, playlistController.addSongToPlaylist);

//Xóa nhạc khỏi playlist
router.post('/songs/delete', authenticateToken, playlistController.deleteSongFromPlaylist);

module.exports = router;
