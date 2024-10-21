const UserModel = require('./User');

const db = require('../config/db');

class ArtistModel {
    static getAllArtists(callback) {
        db.query(`
        SELECT *
        FROM artists 
        JOIN users ON artists.user_id = users.user_id
    `, callback);
    }


    static createArtist(artistData, callback) {
        db.query('INSERT INTO artists (bio, user_id, debut_date) VALUES (?, ?, ?)',
            [artistData.bio, artistData.user_id, artistData.debut_date], callback);
    }

    static updateArtist(artistId, artistData, callback) {
        db.query('UPDATE artists SET bio = ?, user_id = ?, debut_date = ? WHERE artist_id = ?',
            [artistData.bio, artistData.user_id, artistData.debut_date, artistId], callback);
    }

    static getUsernameByArtistId(artistId, callback) {
        db.query('SELECT user_id FROM artists WHERE artist_id = ?', [artistId], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null); // No artist found

            const userId = results[0].user_id;
            UserModel.getUsernameById(userId, callback);
        });
    }
}

module.exports = ArtistModel;
