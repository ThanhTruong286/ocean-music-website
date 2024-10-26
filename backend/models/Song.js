const db = require('../config/db');

class Song {
    constructor(id, title, duration, genreId, releaseDate, fileUrl, coverImageUrl, lyric, playCount = 0) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.genreId = genreId;
        this.releaseDate = releaseDate;
        this.fileUrl = fileUrl;
        this.coverImageUrl = coverImageUrl;
        this.lyric = lyric;
        this.playCount = playCount;
    }

    static getAll(callback) {
        const query = `
            SELECT songs.*, genres.name AS genre_name 
            FROM songs 
            JOIN genres ON songs.genre_id = genres.genre_id
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            const songs = results.map(row => new Song(
                row.song_id,
                row.title,
                row.duration,
                row.genre_id,
                row.release_date,
                row.file_url,
                row.cover_image_url,
                row.lyric,
                row.play_count
            ));
            callback(null, songs);
        });
    }

    static findById(songId, callback) {
        const query = `SELECT * FROM songs WHERE song_id = ?`;
        db.query(query, [songId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);
            const row = results[0];
            const song = new Song(
                row.song_id,
                row.title,
                row.duration,
                row.genre_id,
                row.release_date,
                row.file_url,
                row.cover_image_url,
                row.lyric,
                row.play_count
            );
            callback(null, song);
        });
    }

    save(callback) {
        if (this.id) {
            const query = `
                UPDATE songs SET 
                title = ?, duration = ?, genre_id = ?, release_date = ?, file_url = ?, cover_image_url = ?, lyric = ? 
                WHERE song_id = ?
            `;
            db.query(query, [this.title, this.duration, this.genreId, this.releaseDate, this.fileUrl, this.coverImageUrl, this.lyric, this.id], callback);
        } else {
            const query = `
                INSERT INTO songs (title, duration, genre_id, release_date, file_url, cover_image_url, lyric) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(query, [this.title, this.duration, this.genreId, this.releaseDate, this.fileUrl, this.coverImageUrl, this.lyric], (err, result) => {
                if (err) return callback(err);
                this.id = result.insertId;
                callback(null, this);
            });
        }
    }

    delete(callback) {
        const query = `DELETE FROM songs WHERE song_id = ?`;
        db.query(query, [this.id], callback);
    }
}

module.exports = Song;
