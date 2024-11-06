// FavoriteModel.js
const db = require('../config/db');

class FavoriteModel {
    static getAllFavorites(callback) {
        db.query('SELECT * FROM favorites', callback);
    }

    static createFavorite(favoriteData, callback) {
        db.query('INSERT INTO favorites (user_id, song_id) VALUES (?, ?)',
            [favoriteData.user_id, favoriteData.song_id], callback);
    }

    static deleteFavorite(favoriteId, callback) {
        db.query('DELETE FROM favorites WHERE favorite_id = ?', [favoriteId], callback);
    }
}

module.exports = FavoriteModel;

