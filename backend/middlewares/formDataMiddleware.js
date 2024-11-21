const multer = require('multer');

// Cấu hình lưu trữ tệp tin
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Đường dẫn lưu trữ tệp tin
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên tệp tin duy nhất
    }
});

// Middleware multer để xử lý tệp
const upload = multer({ storage });

// Middleware xử lý form data với các trường file
const formDataMiddleware = upload.fields([
    { name: 'file', maxCount: 1 }, // Chỉ nhận 1 file âm thanh
    { name: 'coverImage', maxCount: 1 } // Chỉ nhận 1 file ảnh bìa
]);

module.exports = formDataMiddleware;
