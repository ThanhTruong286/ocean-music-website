const Playlist = require('../models/Playlist');

// Lấy tất cả các playlist
exports.getAllPlaylists = (req, res) => {
    Playlist.getAll((err, playlists) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching playlists', error: err.message });
        }
        res.json(playlists);
    });
};

// Tạo một playlist mới
exports.createPlaylist = (req, res) => {
    const { title, user_id: userId } = req.body;
    if (!title || !userId) {
        return res.status(400).json({ message: 'Title and user_id are required' });
    }

    const newPlaylist = new Playlist(null, title, userId);
    newPlaylist.save((err, playlist) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating playlist', error: err.message });
        }
        res.status(201).json({ message: 'Playlist created', playlist });
    });
};

// Lấy playlist theo ID
exports.getPlaylistById = (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    Playlist.findById(playlistId, (err, playlist) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching playlist', error: err.message });
        }
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.json(playlist);
    });
};

// Cập nhật playlist theo ID
exports.updatePlaylist = (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const { title } = req.body;

    Playlist.findById(playlistId, (err, playlist) => {
        if (err) return res.status(500).json({ message: 'Error fetching playlist', error: err.message });
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        playlist.title = title || playlist.title;

        playlist.save(err => {
            if (err) return res.status(500).json({ message: 'Error updating playlist', error: err.message });
            res.json({ message: 'Playlist updated', playlist });
        });
    });
};

// Xóa playlist theo ID
exports.deletePlaylist = (req, res) => {
    const playlistId = parseInt(req.params.id, 10);

    Playlist.findById(playlistId, (err, playlist) => {
        if (err) return res.status(500).json({ message: 'Error fetching playlist', error: err.message });
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        playlist.delete(err => {
            if (err) return res.status(500).json({ message: 'Error deleting playlist', error: err.message });
            res.json({ message: 'Playlist deleted' });
        });
    });
};
