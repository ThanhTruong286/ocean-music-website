const Song = require('../models/Song');

exports.getOwnSong = (req, res) => {
    const userId = req.user.userId;

    Song.getSongsByUserId(userId, (err, song) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching song', error: err });
        }

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json(song); // Trả về bài hát dưới dạng JSON
    });
}

exports.getRecommendedSongs = (req, res) => {
    const { artistIds } = req.body;  // Lấy danh sách artistIds từ request body

    // Gọi phương thức trong model để lấy bài hát gợi ý
    Song.getRecommendedSongsByArtistIds(artistIds, (err, recommendedSongs) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy bài hát gợi ý', error: err.message });
        }

        if (recommendedSongs.length === 0) {
            return res.status(200).json({ message: 'No recommendations available.' });
        }

        res.json({ recommendedSongs });
    });
};

exports.getAllSongs = (req, res) => {
    Song.getAll((err, songs) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching songs', error: err.message });
        }
        res.json(songs);
    });
};

exports.createSong = (req, res) => {
    const userId = req.user.userId;
    const title = "New Song"; // Default title for the new song

    // Destructure optional fields from the request body
    const {
        duration = null,
        genre_id: genreId = null,
        release_date: releaseDate = null,
        file_url: fileUrl = null,
        cover_image_url: coverImageUrl = null,
        lyric = null
    } = req.body;

    // Prepare song data
    const songData = {
        title,
        duration,
        genreId,
        releaseDate,
        fileUrl,
        coverImageUrl,
        lyric
    };

    // Call the model method to create the song and link it to an artist
    Song.addSongWithArtist(songData, userId, (err, result) => {
        if (err) {
            if (err.message === "Artist not found for the given userId") {
                return res.status(404).json({ message: err.message });
            }

            console.error("Error creating song and linking to artist:", err);
            return res.status(500).json({
                message: "Error creating song and linking to artist",
                error: err.message
            });
        }

        res.status(201).json({
            message: 'Song created with default title "New Song" and linked to artist successfully',
            song: result
        });
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
    const { title, duration, lyric, fileUrl, coverImageUrl, genre_id, release_date } = req.body;

    console.log(coverImageUrl, fileUrl);

    console.log('Cập nhật bài hát với ID:', songId);
    console.log('Dữ liệu nhận được từ frontend:', req.body);

    Song.findById(songId, (err, song) => {
        if (err) {
            console.error('Lỗi khi tìm bài hát:', err);
            return res.status(500).json({ message: 'Error fetching song', error: err.message });
        }
        if (!song) {
            console.log('Không tìm thấy bài hát với ID:', songId);
            return res.status(404).json({ message: 'Song not found' });
        }

        // Cập nhật thông tin bài hát
        song.title = title || song.title;
        song.duration = duration || song.duration;
        song.lyric = lyric || song.lyric;
        song.fileUrl = fileUrl || song.fileUrl;
        song.coverImageUrl = coverImageUrl || song.coverImageUrl;
        song.genreId = genre_id || song.genreId;
        song.releaseDate = release_date ? new Date(release_date) : song.releaseDate;  // Ensure valid Date format

        song.save(err => {
            if (err) {
                console.error('Lỗi khi lưu bài hát:', err);
                return res.status(500).json({ message: 'Error updating song', error: err.message });
            }
            console.log('Dữ liệu bài hát sau khi lưu:', song);
            res.json({ message: 'Song updated', song });
        });
    });
};

exports.deleteSong = (req, res) => {
    const songId = req.params.id;

    // Step 1: Find the song by its ID
    Song.findById(songId, (err, song) => {
        if (err) {
            console.error('Error fetching song:', err);
            return res.status(500).json({ message: 'Error fetching song', error: err.message });
        }

        // Step 2: If song does not exist, return a 404 response
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        // Step 3: Delete related entries in artist_songs
        Song.deleteFromArtistSongs(songId, (err) => {
            if (err) {
                console.error('Error deleting from artist_songs:', err);
                return res.status(500).json({ message: 'Error deleting related data', error: err.message });
            }

            // Step 4: Delete the song itself
            song.delete((err) => {
                if (err) {
                    console.error('Error deleting song:', err);
                    return res.status(500).json({ message: 'Error deleting song', error: err.message });
                }

                // Step 5: Success response
                res.status(200).json({ message: 'Song and related data successfully deleted' });
            });
        });
    });
};


