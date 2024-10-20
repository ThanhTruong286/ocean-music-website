// GenreModel.js
const db = require('../config/db');

class GenreModel {
    static getAllGenres(callback) {
        db.query('SELECT * FROM genres', callback);
    }

    static createGenre(genreData, callback) {
        db.query('INSERT INTO genres (name) VALUES (?)', [genreData.name], callback);
    }

    static updateGenre(genreId, genreData, callback) {
        db.query('UPDATE genres SET name = ? WHERE genre_id = ?', [genreData.name, genreId], callback);
    }

    static deleteGenre(genreId, callback) {
        db.query('DELETE FROM genres WHERE genre_id = ?', [genreId], callback);
    }
}

module.exports = GenreModel;
