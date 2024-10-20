// PlaylistModel.js
const db = require('../config/db');

class PlaylistModel {
    static getAllPlaylists(callback) {
        db.query('SELECT * FROM playlists', callback);
    }

    static createPlaylist(playlistData, callback) {
        db.query('INSERT INTO playlists (title, user_id) VALUES (?, ?)', [playlistData.title, playlistData.user_id], callback);
    }

    static updatePlaylist(playlistId, playlistData, callback) {
        db.query('UPDATE playlists SET title = ? WHERE playlist_id = ?', [playlistData.title, playlistId], callback);
    }

    static deletePlaylist(playlistId, callback) {
        db.query('DELETE FROM playlists WHERE playlist_id = ?', [playlistId], callback);
    }
}

module.exports = PlaylistModel;
