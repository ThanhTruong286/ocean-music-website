const ArtistModel = require('../models/Artist');

exports.getSongByArtist = async (req, res) => {
    try {
        const artistId = req.params.id; // Lấy artistId từ params
        const songs = await ArtistModel.getSongByArtist(artistId); // Gọi hàm model để lấy bài hát
        
        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: "No songs found for this artist" });
        }

        res.status(200).json(songs); // Trả về danh sách bài hát
    } catch (e) {
        console.error("Error in getSongByArtist:", e); // Log lỗi để dễ debug
        res.status(500).json({ message: "Error getting artist's songs" });
    }
};

exports.getAllArtists = async (req, res) => {
    try {
        const artists = await ArtistModel.getAllArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artists', error });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const newArtist = req.body;
        const artistId = await ArtistModel.createArtist(newArtist);
        res.status(201).json({ message: 'Artist created', artistId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating artist', error });
    }
};

exports.getArtistById = async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await ArtistModel.getArtistById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artist', error });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const artistId = req.params.id;
        const updatedArtist = req.body;
        const result = await ArtistModel.updateArtist(artistId, updatedArtist);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json({ message: 'Artist updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating artist', error });
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        const artistId = req.params.id;
        const result = await ArtistModel.deleteArtist(artistId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json({ message: 'Artist deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting artist', error });
    }
};

exports.getUsernameByArtistId = async (req, res) => {
    try {
        const artistId = req.params.id;
        const username = await ArtistModel.getUsernameByArtistId(artistId);
        if (!username) {
            return res.status(404).json({ message: 'Username not found for this artist' });
        }
        res.json({ username });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching username', error });
    }
};
