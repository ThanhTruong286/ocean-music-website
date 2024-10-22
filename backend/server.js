// server.js
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const authRoutes = require('./routes/authRoutes'); // Thêm route cho auth
const errorHandler = require('./middlewares/errorHandler'); // Middleware xử lý lỗi
const authController = require('./controllers/authController');
const genreRoutes = require('./routes/genreRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/songRoutes');
const db = require('./config/db'); // Kết nối DB

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // Để xử lý JSON
app.use(bodyParser.urlencoded({ extended: true })); // Để xử lý dữ liệu từ form

// Sử dụng routes
app.use('/api/auth', authRoutes); // Route cho xác thực
app.use('/api/users', userRoutes); // Route cho người dùng
// Middleware xử lý lỗi
app.use(errorHandler);
app.use('/api/artist', artistRoutes); // Route cho artist
app.use('/api/genres', genreRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/song', songRoutes);



// Lắng nghe trên port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Lắng nghe sự kiện SIGINT để đóng kết nối khi tắt server
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing database connection...');
  db.closeConnection(); // Gọi hàm đóng kết nối
  process.exit(); // Thoát ứng dụng
});
