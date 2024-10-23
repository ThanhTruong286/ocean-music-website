const SongModel = require('../models/Song');

exports.getAllSongs = (req, res) => {
    SongModel.getAllSongs((err, result) => {
        if (err) {
            return res.status(500).json({ message: "error fetching songs" });
        }
        const getSongWithGenre = result.map((song) => ({
            song_id: song.song_id,
            title: song.title,
            duration: song.duration,
            genre_id: song.genre_id,
            release_date: song.release_date,
            file_url: song.file_url,
            cover_image_url: song.cover_image_url,
            lyric: song.lyric,
            created_at: song.created_at,
            updated_at: song.updated_at,
            play_count: song.play_count,
            genre: song.name
        }))
        res.json(getSongWithGenre);
    })
}