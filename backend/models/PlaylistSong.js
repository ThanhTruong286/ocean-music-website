// PlaylistSongModel.js
const db = require('../config/db');

class PlaylistSongModel {
    static getAllPlaylistSongs(callback) {
        db.query('SELECT * FROM playlist_songs', callback);
    }

    static createPlaylistSong(playlistSongData, callback) {
        db.query('INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)',
            [playlistSongData.playlist_id, playlistSongData.song_id], callback);
    }

    static deletePlaylistSong(playlistSongId, callback) {
        db.query('DELETE FROM playlist_songs WHERE playlist_song_id = ?', [playlistSongId], callback);
    }
}

module.exports = PlaylistSongModel;
