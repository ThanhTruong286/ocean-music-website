const GenreModel = require('../models/Genre');

// Lấy tất cả các genre
exports.getAllGenres = (req, res) => {
    GenreModel.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching genres' });
        }
        res.json(results);
    });
};

// Tạo một genre mới
exports.createGenre = (req, res) => {
    const newGenre = new GenreModel(null, req.body.name); // Tạo đối tượng GenreModel mới
    newGenre.save((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating genre' });
        }
        res.status(201).json({ message: 'Genre created', genreId: newGenre.genreId });
    });
};

// Lấy genre theo ID
exports.getGenreById = (req, res) => {
    const genreId = req.params.id;
    GenreModel.findById(genreId, (err, result) => {
        if (err || result === null) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(result);
    });
};

// Cập nhật genre theo ID
exports.updateGenre = (req, res) => {
    const genreId = req.params.id;
    const updatedGenre = new GenreModel(genreId, req.body.name); // Tạo đối tượng GenreModel mới
    updatedGenre.save((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating genre' });
        }
        res.json({ message: 'Genre updated' });
    });
};

// Xóa genre theo ID
exports.deleteGenre = (req, res) => {
    const genreId = req.params.id;
    const genre = new GenreModel(genreId); // Tạo đối tượng GenreModel mới
    genre.delete((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting genre' });
        }
        res.json({ message: 'Genre deleted' });
    });
};
