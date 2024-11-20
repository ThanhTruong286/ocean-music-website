const db = require('../config/db');

class Album {
    constructor(id, title, coverImageUrl, artistId, releaseDate, first_name, last_name) {
        this.id = id;
        this.title = title;
        this.coverImageUrl = coverImageUrl;
        this.artistId = artistId;
        this.releaseDate = releaseDate;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    // Lấy tất cả album
    static getAll(callback) {
        const query = `
            SELECT a.*, u.first_name, u.last_name 
            FROM albums a 
            LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
            LEFT JOIN users u ON ar.user_id = u.user_id
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            const albums = results.map(row => new Album(
                row.album_id,
                row.title,
                row.cover_image_url,
                row.artist_id,
                row.release_date
            ));
            callback(null, albums);
        });
    }

    // Tạo album mới
    static create(newAlbumData, callback) {
        const query = `
            INSERT INTO albums (title, cover_image_url, artist_id, release_date) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [
            newAlbumData.title,
            newAlbumData.coverImageUrl,
            newAlbumData.artistId,
            newAlbumData.releaseDate
        ], (err, result) => {
            if (err) return callback(err, null);
            callback(null, { id: result.insertId, ...newAlbumData });
        });
    }

    // Cập nhật album
    static update(albumId, updatedData, callback) {
        const query = `
            UPDATE albums 
            SET title = ?, cover_image_url = ?, artist_id = ?, release_date = ? 
            WHERE album_id = ?
        `;
        db.query(query, [
            updatedData.title,
            updatedData.coverImageUrl,
            updatedData.artistId,
            updatedData.releaseDate,
            albumId
        ], (err, result) => {
            if (err) return callback(err, null);
            if (result.affectedRows === 0) {
                return callback(null, { success: false, message: 'Album not found' });
            }
            callback(null, { success: true, message: 'Album updated successfully' });
        });
    }

    // Xóa album
    static delete(albumId, callback) {
        const query = `
            DELETE FROM albums 
            WHERE album_id = ?
        `;
        db.query(query, [albumId], (err, result) => {
            if (err) return callback(err, null);
            if (result.affectedRows === 0) {
                return callback(null, { success: false, message: 'Album not found' });
            }
            callback(null, { success: true, message: 'Album deleted successfully' });
        });
    }

    // Lấy album theo ID
    static findById(albumId, callback) {
        const query = `
        SELECT a.*, u.first_name, u.last_name 
        FROM albums a 
        LEFT JOIN artists ar ON a.artist_id = ar.artist_id 
        LEFT JOIN users u ON ar.user_id = u.user_id
        WHERE a.album_id = ?
    `;
        db.query(query, [albumId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) {
                return callback(null, null);
            }

            // Assuming you have an Album class constructor that accepts these parameters
            const album = new Album(
                results[0].album_id,
                results[0].title,
                results[0].cover_image_url,
                results[0].artist_id,
                results[0].release_date,
                results[0].first_name,
                results[0].last_name
            );

            callback(null, album);
        });
    }

}

module.exports = Album;
