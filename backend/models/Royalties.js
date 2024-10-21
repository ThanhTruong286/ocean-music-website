// RoyaltiesModel.js
const db = require('../config/db');

class RoyaltiesModel {
    static getAllRoyalties(callback) {
        db.query('SELECT * FROM royalties', callback);
    }

    static createRoyalties(royaltiesData, callback) {
        db.query('INSERT INTO royalties (artist_id, song_id, amount, payment_date) VALUES (?, ?, ?, ?)',
            [royaltiesData.artist_id, royaltiesData.song_id, royaltiesData.amount, royaltiesData.payment_date], callback);
    }

    static updateRoyalties(royaltiesId, royaltiesData, callback) {
        db.query('UPDATE royalties SET amount = ?, payment_date = ? WHERE royalties_id = ?',
            [royaltiesData.amount, royaltiesData.payment_date, royaltiesId], callback);
    }
}

module.exports = RoyaltiesModel;
