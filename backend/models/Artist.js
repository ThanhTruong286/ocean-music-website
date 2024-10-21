const db = require('../config/db');

class ArtistModel {
    static getAllArtists(callback) {
        db.query('SELECT * FROM artists', callback);
    }

    static createArtist(artistData, callback) {
        db.query('INSERT INTO artists (bio, user_id, debut_date) VALUES (?, ?, ?)',
            [artistData.bio, artistData.user_id, artistData.debut_date], callback);
    }

    static updateArtist(artistId, artistData, callback) {
        db.query('UPDATE artists SET bio = ?, user_id = ?, debut_date = ? WHERE artist_id = ?',
            [artistData.bio, artistData.user_id, artistData.debut_date, artistId], callback);
    }

    static deleteArtist(artistId, callback) {
        db.query('DELETE FROM artists WHERE artist_id = ?', [artistId], callback);
    }
}

module.exports = ArtistModel;
