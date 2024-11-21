const express = require('express');
const songController = require('../controllers/songController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to get all songs
router.get('/', songController.getAllSongs);

router.get('/own-song',authenticateToken, songController.getOwnSong);

// Route to add a new song
router.post('/', songController.createSong);

// Route to get a song by ID
router.get('/song-detail/:id', songController.getSongById);

router.post('/recommend', songController.getRecommendedSongs);

// Route to update a song by ID
router.put('/:id', songController.updateSong);

// Route to delete a song by ID
router.delete('/:id', songController.deleteSong);

module.exports = router;

