// albumController.js
const AlbumModel = require('../models/Album');

exports.getAllAlbums = (req, res) => {
    AlbumModel.getAllAlbums((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching albums' });
        }
        res.json(results);
    });
};

exports.createAlbum = (req, res) => {
    const newAlbum = req.body;
    AlbumModel.createAlbum(newAlbum, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating album' });
        }
        res.status(201).json({ message: 'Album created', albumId: result.insertId });
    });
};

exports.getAlbumById = (req, res) => {
    const albumId = req.params.id;
    AlbumModel.getAlbumById(albumId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.json(result[0]);
    });
};

exports.updateAlbum = (req, res) => {
    const albumId = req.params.id;
    const updatedAlbum = req.body;
    AlbumModel.updateAlbum(albumId, updatedAlbum, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating album' });
        }
        res.json({ message: 'Album updated' });
    });
};

exports.deleteAlbum = (req, res) => {
    const albumId = req.params.id;
    AlbumModel.deleteAlbum(albumId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting album' });
        }
        res.json({ message: 'Album deleted' });
    });
};
exports.countAllAlbums = (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM albums', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error fetching albums count' });
        }
        res.json({ total: results[0].total });
    });
};