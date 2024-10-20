// ArtistSongModel.js
const db = require('../config/db');

class ArtistSongModel {
    static getAllArtistSongs(callback) {
        db.query('SELECT * FROM artist_songs', callback);
    }

    static createArtistSong(artistSongData, callback) {
        db.query('INSERT INTO artist_songs (artist_id, song_id) VALUES (?, ?)',
            [artistSongData.artist_id, artistSongData.song_id], callback);
    }

    static deleteArtistSong(artistSongId, callback) {
        db.query('DELETE FROM artist_songs WHERE artist_song_id = ?', [artistSongId], callback);
    }
}

module.exports = ArtistSongModel;
