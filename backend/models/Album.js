// AlbumModel.js
const db = require('../config/db');

class AlbumModel {
    static getAllAlbums(callback) {
        db.query('SELECT * FROM albums', callback);
    }

    static createAlbum(albumData, callback) {
        db.query('INSERT INTO albums (title, cover_image_url, artist_id, release_date) VALUES (?, ?, ?, ?)',
            [albumData.title, albumData.cover_image_url, albumData.artist_id, albumData.release_date], callback);
    }

    static updateAlbum(albumId, albumData, callback) {
        db.query('UPDATE albums SET title = ?, cover_image_url = ?, artist_id = ?, release_date = ? WHERE album_id = ?',
            [albumData.title, albumData.cover_image_url, albumData.artist_id, albumData.release_date, albumId], callback);
    }

    static deleteAlbum(albumId, callback) {
        db.query('DELETE FROM albums WHERE album_id = ?', [albumId], callback);
    }
}

module.exports = AlbumModel;
