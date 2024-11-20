const db = require('../config/db');
const UserModel = require('./User'); // Để truy xuất tên người dùng từ User model

class ArtistModel {

    static async getArtistAlbums(artistId) {
        const query = `
            SELECT *
            FROM albums
            JOIN artists ON albums.artist_id = artists.artist_id
            WHERE artists.user_id = ?
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [artistId], (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err); // Trả về lỗi nếu xảy ra
                }
                resolve(result); // Trả về kết quả nếu thành công
            });
        });
    }

    static async getSongByArtist(artistId) {
        const query = `
            SELECT songs.* 
            FROM artist_songs 
            JOIN songs ON artist_songs.song_id = songs.song_id
            WHERE artist_songs.artist_id = ?
        `;

        return new Promise((resolve, reject) => {
            db.query(query, [artistId], (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err); // Trả về lỗi nếu xảy ra
                }
                resolve(result); // Trả về kết quả nếu thành công
            });
        });
    }

    static async getAllArtists() {
        const query = `
            SELECT artists.artist_id, artists.bio, artists.user_id, users.*
            FROM artists
            JOIN users ON artists.user_id = users.user_id
        `;
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async createArtist(artistData) {
        const query = 'INSERT INTO artists (bio, user_id, debut_date) VALUES (?, ?, ?)';
        const params = [artistData.bio, artistData.user_id, artistData.debut_date];
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }

    static async getArtistById(artistId) {
        const query = `
            SELECT artists.*, users.*
            FROM artists
            LEFT JOIN users ON artists.user_id = users.user_id
            WHERE artists.artist_id = ?;
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [artistId], (err, results) => {
                if (err) return reject(err);
                resolve(results.length > 0 ? results[0] : null);
            });
        });
    }


    static async updateArtist(artistId, artistData) {
        const query = `
            UPDATE artists SET bio = ?, user_id = ?, debut_date = ?
            WHERE artist_id = ?
        `;
        const params = [
            artistData.bio,
            artistData.user_id,
            artistData.debut_date,
            artistId
        ];
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async deleteArtist(artistId) {
        const query = 'DELETE FROM artists WHERE artist_id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [artistId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async getUsernameByArtistId(artistId) {
        try {
            const artist = await this.getArtistById(artistId);
            if (!artist) return null;
            return await UserModel.getUsernameById(artist.user_id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ArtistModel;
