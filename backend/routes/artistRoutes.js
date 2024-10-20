const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// Route lấy tất cả nghệ sĩ
router.get('/', artistController.getAllArtists);

// Route thêm một nghệ sĩ mới
router.post('/', artistController.createArtist);

// Route lấy nghệ sĩ theo ID
router.get('/:id', artistController.getArtistById);

// Route cập nhật nghệ sĩ theo ID
router.put('/:id', artistController.updateArtist);

// Route xóa nghệ sĩ theo ID
router.delete('/:id', artistController.deleteArtist);

module.exports = router;
