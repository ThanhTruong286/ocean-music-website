// SongModel.js
const db = require('../config/db');

class SongModel {
    static getAllSongs(callback) {
        db.query('SELECT * FROM songs', callback);
    }

    static getSongById(songId, callback) {
        db.query('SELECT * FROM songs WHERE song_id = ?', [songId], callback);
    }

    static createSong(songData, callback) {
        db.query('INSERT INTO songs (title, duration, genre_id, release_date, file_url, cover_image_url, lyric) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [songData.title, songData.duration, songData.genre_id, songData.release_date, songData.file_url, songData.cover_image_url, songData.lyric],
            callback);
    }

    static updateSong(songId, songData, callback) {
        db.query('UPDATE songs SET title = ?, duration = ?, genre_id = ?, release_date = ?, file_url = ?, cover_image_url = ?, lyric = ? WHERE song_id = ?',
            [songData.title, songData.duration, songData.genre_id, songData.release_date, songData.file_url, songData.cover_image_url, songData.lyric, songId],
            callback);
    }

    static deleteSong(songId, callback) {
        db.query('DELETE FROM songs WHERE song_id = ?', [songId], callback);
    }
}

module.exports = SongModel;
