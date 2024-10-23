const express = require('express');
const SongController = require('../controllers/songController');
const router = express.Router();

router.get('/', SongController.getAllSongs);

module.exports = router