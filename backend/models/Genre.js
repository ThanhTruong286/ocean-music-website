const db = require('../config/db'); // Kết nối với cơ sở dữ liệu

class GenreModel {
    constructor(genreId = null, name = '', createdAt = null, updatedAt = null) {
        this.genreId = genreId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Phương thức lấy tất cả các thể loại
    static getAll(callback) {
        db.query('SELECT * FROM genres', (err, results) => {
            if (err) return callback(err);
            const genres = results.map(row => new GenreModel(row.genre_id, row.name, row.created_at, row.updated_at));
            callback(null, genres);
        });
    }

    // Phương thức tìm thể loại theo ID
    static findById(genreId, callback) {
        db.query('SELECT * FROM genres WHERE genre_id = ?', [genreId], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null); // Không tìm thấy thể loại

            const genreData = results[0];
            const genre = new GenreModel(genreData.genre_id, genreData.name, genreData.created_at, genreData.updated_at);
            callback(null, genre);
        });
    }

    // Phương thức lưu thể loại (tạo mới hoặc cập nhật nếu đã có genreId)
    save(callback) {
        if (this.genreId) {
            // Cập nhật thể loại đã tồn tại
            db.query('UPDATE genres SET name = ? WHERE genre_id = ?', [this.name, this.genreId], (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            });
        } else {
            // Tạo thể loại mới
            db.query('INSERT INTO genres (name) VALUES (?)', [this.name], (err, result) => {
                if (err) return callback(err);
                this.genreId = result.insertId;
                callback(null, result);
            });
        }
    }

    // Phương thức xóa thể loại
    delete(callback) {
        if (!this.genreId) return callback(new Error('Genre ID is required to delete a genre.'));
        db.query('DELETE FROM genres WHERE genre_id = ?', [this.genreId], callback);
    }
}

module.exports = GenreModel;
