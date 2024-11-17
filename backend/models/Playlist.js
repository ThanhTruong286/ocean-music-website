const db = require('../config/db');

class Playlist {
    constructor(id, title, userId, username, first_name, last_name, image) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.image = image
    }

    static deleteSongFromPlaylist(userId, playlistId, songId, callback) {
        console.log(`${userId},${playlistId},${songId}`);
        // 1. Kiểm tra xem playlist có thuộc về userId hay không
        const checkPlaylistQuery = `
        SELECT * FROM playlists 
        WHERE playlist_id = ? AND user_id = ?
    `;
        db.query(checkPlaylistQuery, [playlistId, userId], (err, playlistResult) => {
            if (err) return callback(err, null);  // Nếu có lỗi xảy ra trong truy vấn

            if (playlistResult.length === 0) {
                return callback(null, { success: false, message: 'Playlist not found or access denied' });
            }

            // 2. Kiểm tra xem bài hát có tồn tại trong playlist không
            const checkSongQuery = `
            SELECT * FROM playlist_songs 
            WHERE playlist_id = ? AND song_id = ?
        `;
            db.query(checkSongQuery, [playlistId, songId], (err, songResult) => {
                if (err) return callback(err, null);  // Nếu có lỗi xảy ra trong truy vấn

                if (songResult.length === 0) {
                    return callback(null, { success: false, message: 'Song not found in the playlist' });
                }

                // 3. Xóa bài hát khỏi playlist
                const deleteSongQuery = `
                DELETE FROM playlist_songs 
                WHERE playlist_id = ? AND song_id = ?
            `;
                db.query(deleteSongQuery, [playlistId, songId], (err, deleteResult) => {
                    if (err) return callback(err, null);  // Nếu có lỗi xảy ra trong truy vấn

                    if (deleteResult.affectedRows > 0) {
                        return callback(null, { success: true, message: 'Song removed from playlist successfully' });
                    } else {
                        return callback(null, { success: false, message: 'Failed to remove song from playlist' });
                    }
                });
            });
        });
    }

    // Hàm thêm bài hát vào playlist
    static addSongToPlaylist(userId, playlistId, songId, callback) {
        // 1. Kiểm tra xem playlist có thuộc về userId hay không
        const checkPlaylistQuery = `
        SELECT * FROM playlists 
        WHERE playlist_id = ? AND user_id = ?
    `;
        db.query(checkPlaylistQuery, [playlistId, userId], (err, playlistResult) => {
            if (err) return callback(err, null);  // Nếu có lỗi xảy ra trong truy vấn

            if (playlistResult.length === 0) {
                return callback(null, { success: false, message: 'Playlist not found or access denied' });
            }

            // 2. Kiểm tra xem bài hát đã tồn tại trong playlist chưa
            const checkSongQuery = `
            SELECT * FROM playlist_songs 
            WHERE playlist_id = ? AND song_id = ?
        `;
            db.query(checkSongQuery, [playlistId, songId], (err, songResult) => {
                if (err) return callback(err, null);  // Nếu có lỗi xảy ra trong truy vấn

                if (songResult.length > 0) {
                    return callback(null, { success: false, message: 'Song already exists in the playlist' });
                }

                // 3. Nếu bài hát chưa tồn tại, thêm mới vào bảng playlist_songs
                const insertQuery = `
                INSERT INTO playlist_songs (playlist_id, song_id) 
                VALUES (?, ?)
            `;
                db.query(insertQuery, [playlistId, songId], (err, insertResult) => {
                    if (err) return callback(err, null);  // Nếu có lỗi xảy ra trong truy vấn

                    if (insertResult.affectedRows > 0) {
                        return callback(null, { success: true, message: 'Song added successfully', songId });
                    } else {
                        return callback(null, { success: false, message: 'Failed to add song to playlist' });
                    }
                });
            });
        });
    }

    static getUserPlaylist(userId, callback) {
        db.query('SELECT * FROM playlists WHERE user_id = ?', [userId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, []); // Return an empty array if no playlists are found

            // Map through results to create an array of Playlist instances
            const playlists = results.map(row => new Playlist(row.playlist_id, row.title, row.user_id));

            callback(null, playlists);  // Return an array of playlists
        });
    }


    static getAll(callback) {
        db.query('SELECT playlists.*, users.* FROM playlists LEFT JOIN users ON playlists.user_id = users.user_id', (err, results) => {
            if (err) return callback(err, null);
            const playlists = results.map(row => new Playlist(row.playlist_id, row.title, row.user_id, row.username, row.first_name, row.last_name, row.image));
            callback(null, playlists);
        });
    }

    static findById(playlistId, userId, callback) {
        const query = `
    SELECT 
        p.playlist_id,
        p.title AS playlist_title,
        p.user_id,
        s.song_id,
        s.duration,
        s.title AS song_title,
        s.cover_image_url,
        a.artist_id,
        u.user_id,
        CONCAT(
            COALESCE(u.first_name, ''), 
            CASE 
                WHEN u.first_name IS NOT NULL AND u.last_name IS NOT NULL THEN ' ' 
                ELSE '' 
            END,
            COALESCE(u.last_name, '')
        ) AS artist_name
    FROM playlists p
    LEFT JOIN playlist_songs ps ON p.playlist_id = ps.playlist_id
    LEFT JOIN songs s ON ps.song_id = s.song_id
    LEFT JOIN artist_songs ats ON s.song_id = ats.song_id
    LEFT JOIN artists a ON ats.artist_id = a.artist_id
    LEFT JOIN users u ON a.user_id = u.user_id
    WHERE p.playlist_id = ? AND p.user_id = ?
    `;

        // Thực hiện truy vấn với playlistId và userId
        db.query(query, [playlistId, userId], (err, results) => {
            if (err) return callback(err, null);

            if (results.length === 0) return callback(null, null);

            const playlistInfo = {
                playlistId: results[0].playlist_id,
                title: results[0].playlist_title,
                userId: results[0].user_id,
                songs: []
            };

            // Duyệt qua kết quả truy vấn và xây dựng danh sách bài hát
            results.forEach(row => {
                if (row.song_id) {
                    const existingSongIndex = playlistInfo.songs.findIndex(song => song.songId === row.song_id);

                    if (existingSongIndex !== -1) {
                        // Nếu bài hát đã tồn tại, thêm nghệ sĩ vào danh sách nghệ sĩ của bài hát đó
                        playlistInfo.songs[existingSongIndex].artists.push({
                            artistId: row.artist_id,
                            name: row.artist_name
                        });
                    } else {
                        // Nếu bài hát chưa tồn tại, thêm bài hát mới vào danh sách
                        playlistInfo.songs.push({
                            songId: row.song_id,
                            title: row.song_title,
                            duration: row.duration,
                            coverImageUrl: row.cover_image_url,
                            artists: row.artist_id ? [{
                                artistId: row.artist_id,
                                name: row.artist_name
                            }] : []
                        });
                    }
                }
            });

            // Trích xuất tất cả artistId từ các bài hát trong playlist
            const artistIds = playlistInfo.songs
                .map(song => song.artists.map(artist => artist.artistId))
                .flat();  // Làm phẳng mảng các artistId

            // Trả về thông tin playlist kèm danh sách bài hát và nghệ sĩ
            callback(null, playlistInfo);
        });
    }


    static update(playlistId, newPlaylistData, userId, callback) {
        // Kiểm tra xem playlistId và dữ liệu cập nhật có hợp lệ không
        if (!playlistId || !newPlaylistData) {
            return callback({ message: 'Invalid input data' }, null);
        }

        // Truy vấn cập nhật playlist trong cơ sở dữ liệu
        const updateQuery = `
            UPDATE playlists
            SET title = ?
            WHERE playlist_id = ? AND user_id = ?;
        `;

        db.query(updateQuery, [newPlaylistData, playlistId, userId], (err, result) => {
            if (err) return callback(err, null);

            if (result.affectedRows === 0) {
                return callback({ message: 'Playlist not found or no changes made' }, null);
            }

            // Trả về kết quả nếu cập nhật thành công
            return callback(null, { message: 'Playlist updated successfully', playlistId });
        });
    }

    save(callback) {
        if (this.id) {
            db.query('UPDATE playlists SET title = ? WHERE playlist_id = ?', [this.title, this.id], callback);
        } else {
            db.query(
                'INSERT INTO playlists (title, user_id) VALUES (?, ?)',
                [this.title, this.userId],
                (err, result) => {
                    if (err) return callback(err);
                    this.id = result.insertId;
                    callback(null, this);
                }
            );
        }
    }

    delete(callback) {
        db.query('DELETE FROM playlists WHERE playlist_id = ?', [this.id], callback);
    }
}

module.exports = Playlist;
