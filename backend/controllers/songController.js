const Song = require('../models/Song');

exports.getAllSongs = (req, res) => {
    Song.getAll((err, songs) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching songs', error: err.message });
        }
        res.json(songs);
    });
};

exports.createSong = (req, res) => {
    const { title, duration, genre_id: genreId, release_date: releaseDate, file_url: fileUrl, cover_image_url: coverImageUrl, lyric } = req.body;

    if (!title || !duration || !genreId || !fileUrl || !coverImageUrl || !lyric) {
        return res.status(400).json({ message: 'Title, duration, genre_id, file_url, cover_image_url, and lyric are required' });
    }

    const newSong = new Song(null, title, duration, genreId, releaseDate, fileUrl, coverImageUrl, lyric);
    newSong.save((err, song) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating song', error: err.message });
        }
        res.status(201).json({ message: 'Song created', song });
    });
};

exports.getSongById = (req, res) => {
    const songId = req.params.id;
    Song.findById(songId, (err, song) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching song', error: err.message });
        }
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    });
};

exports.updateSong = (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const { title, duration, genre_id: genreId, release_date: releaseDate, file_url: fileUrl, cover_image_url: coverImageUrl, lyric } = req.body;

    Song.findById(songId, (err, song) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching song', error: err.message });
        }
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        song.title = title || song.title;
        song.duration = duration || song.duration;
        song.genreId = genreId || song.genreId;
        song.releaseDate = releaseDate || song.releaseDate;
        song.fileUrl = fileUrl || song.fileUrl;
        song.coverImageUrl = coverImageUrl || song.coverImageUrl;
        song.lyric = lyric || song.lyric;

        song.save(err => {
            if (err) {
                return res.status(500).json({ message: 'Error updating song', error: err.message });
            }
            res.json({ message: 'Song updated', song });
        });
    });
};

exports.deleteSong = (req, res) => {
    const songId = parseInt(req.params.id, 10);
    Song.findById(songId, (err, song) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching song', error: err.message });
        }
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        song.delete(err => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting song', error: err.message });
            }
            res.json({ message: 'Song deleted' });
        });
    });
};
