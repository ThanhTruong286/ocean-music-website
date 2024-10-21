const GenreModel = require('../models/Genre');

// Lấy tất cả các genre
exports.getAllGenres = (req, res) => {
    GenreModel.getAllGenres((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching genres' });
        }
        res.json(results);
    });
};

// Tạo một genre mới
exports.createGenre = (req, res) => {
    const newGenre = req.body;
    GenreModel.createGenre(newGenre, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating genre' });
        }
        res.status(201).json({ message: 'Genre created', genreId: result.insertId });
    });
};

// Lấy genre theo ID
exports.getGenreById = (req, res) => {
    const genreId = req.params.id;
    GenreModel.getGenreById(genreId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(result[0]);
    });
};

// Cập nhật genre theo ID
exports.updateGenre = (req, res) => {
    const genreId = req.params.id;
    const updatedGenre = req.body;
    GenreModel.updateGenre(genreId, updatedGenre, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating genre' });
        }
        res.json({ message: 'Genre updated' });
    });
};

// Xóa genre theo ID
exports.deleteGenre = (req, res) => {
    const genreId = req.params.id;
    GenreModel.deleteGenre(genreId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting genre' });
        }
        res.json({ message: 'Genre deleted' });
    });
};
