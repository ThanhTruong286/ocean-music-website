const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController'); // Ensure this points to the correct song controller

// Route to get all songs
router.get('/', songController.getAllSongs);

// Route to add a new song
router.post('/', songController.createSong);

// Route to get a song by ID
router.get('/:id', songController.getSongById);

// Route to update a song by ID
router.put('/:id', songController.updateSong);

// Route to delete a song by ID
router.delete('/:id', songController.deleteSong);

module.exports = router;
