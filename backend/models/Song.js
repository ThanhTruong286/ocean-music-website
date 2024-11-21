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

    static updateSong(songId, songData, callback) {
        const {
            title,
            duration,
            genreId,
            releaseDate,
            fileUrl,
            coverImageUrl,
            lyric
        } = songData;

        // Log input data
        console.log("Input data for song update:", {
            songId,
            title,
            duration,
            genreId,
            releaseDate,
            fileUrl,
            coverImageUrl,
            lyric
        });

        // Ensure the fileUrl and coverImageUrl are either valid URLs or null
        const safeFileUrl = fileUrl && typeof fileUrl === 'string' ? fileUrl : null;
        const safeCoverImageUrl = coverImageUrl && typeof coverImageUrl === 'string' ? coverImageUrl : null;

        // Log the sanitized fileUrl and coverImageUrl
        console.log("Sanitized fileUrl:", safeFileUrl);
        console.log("Sanitized coverImageUrl:", safeCoverImageUrl);

        // SQL query to update song
        const query = `
    UPDATE songs
    SET title = ?, duration = ?, genre_id = ?, release_date = ?, file_url = ?, cover_image_url = ?, lyric = ?
    WHERE song_id = ?
    `;

        // Log the SQL query and parameters
        console.log("Executing SQL query with parameters:", [title, duration, genreId, releaseDate, safeFileUrl, safeCoverImageUrl, lyric, songId]);

        // Execute the query
        db.query(query, [title, duration, genreId, releaseDate, safeFileUrl, safeCoverImageUrl, lyric, songId], (err, result) => {
            if (err) {
                console.error("Error updating song:", err);
                return callback(err);  // Return the error to the callback
            }

            // Log the result of the query execution
            console.log("Result of SQL query:", result);

            // Check if any rows were affected (this confirms the song was updated)
            if (result.affectedRows === 0) {
                const notFoundError = new Error("Song not found");
                console.error("Error: Song not found with songId:", songId);
                return callback(notFoundError);  // Song not found, return an error
            }

            // Successfully updated the song, log and return updated data
            console.log("Song successfully updated:", { songId, title, duration, genreId, releaseDate, fileUrl: safeFileUrl, coverImageUrl: safeCoverImageUrl, lyric });
            callback(null, { songId, title, duration, genreId, releaseDate, fileUrl: safeFileUrl, coverImageUrl: safeCoverImageUrl, lyric });
        });
    }

    static deleteFromArtistSongs(songId, callback) {
        const query = `DELETE FROM artist_songs WHERE song_id = ?`;
        db.query(query, [songId], callback);
    }

    static addSongWithArtist(songData, userId, callback) {
        const {
            title = "New Song", // Default title if not provided
            duration,
            genreId,
            releaseDate,
            fileUrl,
            coverImageUrl,
            lyric
        } = songData;

        // Step 1: Create the new song
        const insertSongQuery = `
            INSERT INTO songs (title, duration, genre_id, release_date, file_url, cover_image_url, lyric)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(insertSongQuery, [title, duration, genreId, releaseDate, fileUrl, coverImageUrl, lyric], (err, result) => {
            if (err) {
                console.error("Error saving song:", err);
                return callback(err);
            }

            const newSongId = result.insertId;

            // Step 2: Retrieve the artist ID associated with the user ID
            const artistQuery = `SELECT artist_id FROM artists WHERE user_id = ? LIMIT 1`;

            db.query(artistQuery, [userId], (artistErr, artistResults) => {
                if (artistErr) {
                    console.error("Error finding artist ID:", artistErr);
                    return callback(artistErr);
                }

                if (artistResults.length === 0) {
                    const notFoundError = new Error("Artist not found for the given userId");
                    return callback(notFoundError);
                }

                const artistId = artistResults[0].artist_id;

                // Step 3: Link the new song to the artist in the artist_songs table
                const artistSongQuery = `INSERT INTO artist_songs (artist_id, song_id) VALUES (?, ?)`;

                db.query(artistSongQuery, [artistId, newSongId], (artistSongErr) => {
                    if (artistSongErr) {
                        console.error("Error linking song with artist:", artistSongErr);
                        return callback(artistSongErr);
                    }

                    // Step 4: Return the new song data
                    callback(null, {
                        songId: newSongId,
                        title,
                        duration,
                        genreId,
                        releaseDate,
                        fileUrl,
                        coverImageUrl,
                        lyric,
                        playCount: 0,
                        artistId
                    });
                });
            });
        });
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
