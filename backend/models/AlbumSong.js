// AlbumSongModel.js
const db = require('../config/db');

class AlbumSongModel {
    static getAllAlbumSongs(callback) {
        db.query('SELECT * FROM album_songs', callback);
    }

    static createAlbumSong(albumSongData, callback) {
        db.query('INSERT INTO album_songs (album_id, song_id) VALUES (?, ?)',
            [albumSongData.album_id, albumSongData.song_id], callback);
    }

    static deleteAlbumSong(albumSongId, callback) {
        db.query('DELETE FROM album_songs WHERE album_song_id = ?', [albumSongId], callback);
    }
}

module.exports = AlbumSongModel;
