const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Middleware xử lý lỗi;
const genreRoutes = require('./routes/genreRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');
const roleRoutes = require('./routes/roleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const db = require('./config/db'); // Kết nối DB

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const session = require('express-session');

app.use(session({
  secret: 'MIKASA',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Để xử lý JSON
app.use(bodyParser.urlencoded({ extended: true })); // Để xử lý dữ liệu từ form
// Middleware xử lý lỗi
app.use(errorHandler);

// Sử dụng routes
app.use('/api/auth', authRoutes); // Route cho xác thực
app.use('/api/users', userRoutes); // Route cho người dùng
app.use('/api/artist', artistRoutes); // Route cho artist
app.use('/api/genres', genreRoutes); // thể loại
app.use('/api/playlist', playlistRoutes); // playlist
app.use('/api/song', songRoutes); //bài hát
app.use('/api/album', albumRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/favorite', favoriteRoutes);

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
