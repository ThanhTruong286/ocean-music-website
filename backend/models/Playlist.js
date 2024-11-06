const db = require('../config/db');

class Playlist {
    constructor(id, title, userId, username, first_name, last_name, image) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.image = image
    }

    static getAll(callback) {
        db.query('SELECT playlists.*, users.* FROM playlists LEFT JOIN users ON playlists.user_id = users.user_id', (err, results) => {
            if (err) return callback(err, null);
            const playlists = results.map(row => new Playlist(row.playlist_id, row.title, row.user_id,row.username,row.first_name, row.last_name, row.image));
            callback(null, playlists);
        });
    }

    static findById(playlistId, callback) {
        db.query('SELECT * FROM playlists WHERE playlist_id = ?', [playlistId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const playlist = new Playlist(row.playlist_id, row.title, row.user_id);
            callback(null, playlist);
        });
    }

    save(callback) {
        if (this.id) {
            db.query('UPDATE playlists SET title = ? WHERE playlist_id = ?', [this.title, this.id], callback);
        } else {
            db.query(
                'INSERT INTO playlists (title, user_id) VALUES (?, ?)',
                [this.title, this.userId],
                (err, result) => {
                    if (err) return callback(err);
                    this.id = result.insertId;
                    callback(null, this);
                }
            );
        }
    }

    delete(callback) {
        db.query('DELETE FROM playlists WHERE playlist_id = ?', [this.id], callback);
    }
}

module.exports = Playlist;
