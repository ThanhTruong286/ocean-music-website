const AlbumModel = require('../models/Album');

exports.countAllAlbums = () => {
    return new Promise((resolve, reject) => {
        // Kiểm tra kết nối `db` (giả định rằng `db` đã được định nghĩa ở đâu đó)
        db.query('SELECT COUNT(*) AS total FROM albums', (error, results) => {
            if (error) {
                return reject(error); // Trả về lỗi nếu truy vấn không thành công
            }
            resolve(results[0].total); // Trả về tổng số album
        });
    });
};