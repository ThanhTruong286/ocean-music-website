const SongModel = require('../models/Song'); // Ensure this points to your actual Song model

exports.getAllSongs = (req, res) => {
    SongModel.getAllSongs((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching songs' });
        }
        res.json(results);
    });
};

exports.createSong = (req, res) => {
    const newSong = req.body;
    SongModel.createSong(newSong, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating song' });
        }
        res.status(201).json({ message: 'Song created', songId: result.insertId });
    });
};

exports.getSongById = (req, res) => {
    const songId = req.params.id;
    SongModel.getSongById(songId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(result[0]);
    });
};

exports.updateSong = (req, res) => {
    const songId = req.params.id;
    const updatedSong = req.body;
    SongModel.updateSong(songId, updatedSong, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating song' });
        }
        res.json({ message: 'Song updated' });
    });
};

exports.deleteSong = (req, res) => {
    const songId = req.params.id;
    SongModel.deleteSong(songId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting song' });
        }
        res.json({ message: 'Song deleted' });
    });
};
