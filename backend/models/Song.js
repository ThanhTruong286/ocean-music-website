const db = require('../config/db');

class Song {
    constructor(id, title, duration, genreId, releaseDate, fileUrl, coverImageUrl, lyric, playCount = 0, artist) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.genreId = genreId;
        this.releaseDate = releaseDate;
        this.fileUrl = fileUrl;
        this.coverImageUrl = coverImageUrl;
        this.lyric = lyric;
        this.playCount = playCount;
        this.artist = artist;
    }

    // Hàm lấy bài hát theo userId
    static getSongsByUserId(userId, callback) {
        const query = `
            SELECT songs.* 
            FROM artists
            JOIN artist_songs ON artists.artist_id = artist_songs.artist_id
            JOIN songs ON artist_songs.song_id = songs.song_id
            WHERE artists.user_id = ?
        `;
        
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback(err, null); // Trả về lỗi nếu có lỗi
            }
            callback(null, results); // Trả về kết quả
        });
    }

    static getRecommendedSongsByArtistIds(artistIds, callback) {
        const placeholders = artistIds.map(() => '?').join(',');
        const query = `
        SELECT songs.*, 
               CONCAT(COALESCE(users.first_name, ''), ' ', COALESCE(users.last_name, '')) AS artist
        FROM songs
        JOIN artist_songs ON songs.song_id = artist_songs.song_id
        JOIN artists ON artist_songs.artist_id = artists.artist_id
        JOIN users ON artists.user_id = users.user_id
        WHERE artist_songs.artist_id IN (${placeholders})
        GROUP BY songs.song_id
        ORDER BY songs.play_count DESC
    `;

        db.query(query, artistIds, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            if (results.length === 0) {
                return callback(null, []); // Trả về mảng rỗng nếu không tìm thấy bài hát
            }

            // Tạo đối tượng bài hát với thông tin nghệ sĩ
            const songs = results.map(row => ({
                songId: row.song_id,
                title: row.title,
                duration: row.duration,
                genreId: row.genre_id,
                releaseDate: row.release_date,
                fileUrl: row.file_url,
                coverImageUrl: row.cover_image_url,
                lyric: row.lyric,
                playCount: row.play_count,
                artist: row.artist  // Tên nghệ sĩ được lấy từ `users.first_name` và `users.last_name`
            }));

            callback(null, songs);
        });
    }

    static getAll(callback) {
        const query = `
SELECT songs.*, 
       CONCAT(
           COALESCE(users.first_name, ''), 
           ' ', 
           COALESCE(users.last_name, '')
       ) AS artist
FROM songs 
JOIN artist_songs ON songs.song_id = artist_songs.song_id 
JOIN artists ON artist_songs.artist_id = artists.artist_id
JOIN users ON artists.user_id = users.user_id
ORDER BY songs.play_count DESC;
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
                row.play_count,
                row.artist
            ));
            callback(null, songs);
        });
    }

    static findById(songId, callback) {
        const query = `SELECT songs.*, 
                   CONCAT(
                       COALESCE(users.first_name, ''), 
                       ' ', 
                       COALESCE(users.last_name, ''))
                   AS artist
                   FROM songs 
                   JOIN artist_songs ON songs.song_id = artist_songs.song_id 
                   JOIN artists ON artist_songs.artist_id = artists.artist_id
                   JOIN users ON artists.user_id = users.user_id
                   WHERE songs.song_id = ?  -- Use the songId to filter the results
                   ORDER BY songs.play_count DESC;`;

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
                row.play_count,
                row.artist
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
