const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route để lấy tất cả albums
router.get('/album', adminController.getAllAlbums);

module.exports = router;
