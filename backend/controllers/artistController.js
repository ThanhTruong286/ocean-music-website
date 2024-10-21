const ArtistModel = require('../models/Artist');

exports.getAllArtists = (req, res) => {
    ArtistModel.getAllArtists((err, artistResults) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching artists' });
        }

        const artistsWithUsernames = artistResults.map(artist => ({
            artist_id: artist.artist_id,
            user_id: artist.user_id,
            bio: artist.bio,
            username: artist.username
        }));

        res.json(artistsWithUsernames);
    });
};


exports.createArtist = (req, res) => {
    const newArtist = req.body;
    ArtistModel.createArtist(newArtist, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating artist' });
        }
        res.status(201).json({ message: 'Artist created', artistId: result.insertId });
    });
};

exports.getArtistById = (req, res) => {
    const artistId = req.params.id;
    ArtistModel.getArtistById(artistId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json(result[0]);
    });
};

exports.updateArtist = (req, res) => {
    const artistId = req.params.id;
    const updatedArtist = req.body;
    ArtistModel.updateArtist(artistId, updatedArtist, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating artist' });
        }
        res.json({ message: 'Artist updated' });
    });
};

exports.deleteArtist = (req, res) => {
    const artistId = req.params.id;
    ArtistModel.deleteArtist(artistId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting artist' });
        }
        res.json({ message: 'Artist deleted' });
    });
};
exports.getUsernameByArtistId = (req, res) => {
    const artistId = req.params.id;
    ArtistModel.getUsernameByArtistId(artistId, (err, username) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching username' });
        }
        if (!username) {
            return res.status(404).json({ message: 'Username not found for this artist' });
        }
        res.json({ username });
    });
}
