const PlaylistModel = require('../models/Playlist');

// Lấy tất cả các playlist
exports.getAllPlaylists = (req, res) => {
    PlaylistModel.getAllPlaylists((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching playlists' });
        }
        res.json(results);
    });
};

// Tạo một playlist mới
exports.createPlaylist = (req, res) => {
    const newPlaylist = req.body;
    PlaylistModel.createPlaylist(newPlaylist, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating playlist' });
        }
        res.status(201).json({ message: 'Playlist created', playlistId: result.insertId });
    });
};

// Lấy playlist theo ID
exports.getPlaylistById = (req, res) => {
    const playlistId = req.params.id;
    PlaylistModel.getPlaylistById(playlistId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.json(result[0]);
    });
};

// Cập nhật playlist theo ID
exports.updatePlaylist = (req, res) => {
    const playlistId = req.params.id;
    const updatedPlaylist = req.body;
    PlaylistModel.updatePlaylist(playlistId, updatedPlaylist, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating playlist' });
        }
        res.json({ message: 'Playlist updated' });
    });
};

// Xóa playlist theo ID
exports.deletePlaylist = (req, res) => {
    const playlistId = req.params.id;
    PlaylistModel.deletePlaylist(playlistId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting playlist' });
        }
        res.json({ message: 'Playlist deleted' });
    });
};
