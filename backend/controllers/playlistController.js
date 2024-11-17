const Playlist = require('../models/Playlist');

const decodeBase64 = (id) => {
    return Buffer.from(id, 'base64').toString('utf-8');
}

exports.addSongToPlaylist = (req, res) => {
    try {
        const userId = req.user.userId;
        const { playlistId, songId } = req.body;

        // Kiểm tra xem các trường cần thiết có đầy đủ không
        if (!userId || !playlistId || !songId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Gọi hàm addSongToPlaylist
        Playlist.addSongToPlaylist(userId, playlistId, songId, (err, result) => {
            if (err) {
                console.error('Error adding song to playlist:', err);
                return res.status(500).json({ message: 'Error adding song to playlist' });
            }

            // Nếu thành công, trả về phản hồi cho client
            return res.status(200).json(result);
        });
    } catch (err) {
        console.error('Error adding song to playlist:', err);
        return res.status(500).json({ message: 'Error adding song to playlist' });
    }
};

// Lấy tất cả các playlist
exports.getAllPlaylists = (req, res) => {
    const userId = req.user.userId;
    Playlist.getUserPlaylist(userId, (err, playlists) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching playlists', error: err.message });
        }
        res.json(playlists);
    });
};

// Thêm Playlist mới
exports.createPlaylist = (req, res) => {
    const userId = req.user.userId;

    // Tạo đối tượng Playlist mới
    const newPlaylist = new Playlist(null, "My Playlist", userId);

    // Gọi phương thức save để lưu playlist
    newPlaylist.save((err, playlist) => {
        if (err) {
            console.error('Failed to create playlist:', err);
            return res.status(500).json({ message: 'Error creating playlist', error: err.message });
        }
        res.status(201).json({ message: 'Playlist created successfully', playlist });
    });
};

// Lấy playlist theo ID
exports.getPlaylistById = (req, res) => {
    const playlistId = req.params.id;
    const decodePlaylistId = decodeBase64(playlistId);
    const userId = req.user.userId;

    Playlist.findById(decodePlaylistId, userId, (err, playlist) => {
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
