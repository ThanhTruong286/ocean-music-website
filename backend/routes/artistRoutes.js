const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const authenticateToken = require('../middlewares/authMiddleware');

// Route lấy tất cả nghệ sĩ
router.get('/', artistController.getAllArtists);

// Route thêm một nghệ sĩ mới
router.post('/', artistController.createArtist);

// Route lấy nghệ sĩ theo ID
router.get('/:id', artistController.getArtistById);

//Lấy danh sách nhạc của nghệ sĩ
router.get('/:id/songs', artistController.getSongByArtist);

// Route cập nhật nghệ sĩ theo ID
router.put('/:id', artistController.updateArtist);

// Route xóa nghệ sĩ theo ID
router.delete('/:id', artistController.deleteArtist);

// Route lấy username của nghệ sĩ theo ID
router.get('/:id/username', artistController.getUsernameByArtistId);

router.get('/:id/albums', artistController.getArtistAlbums);

module.exports = router;
