const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const authRoutes = require('./routes/authRoutes');
const genreRoutes = require('./routes/genreRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');
const roleRoutes = require('./routes/roleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const db = require('./config/db');
const session = require('express-session');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép frontend truy cập
  credentials: true,
}));
const PORT = process.env.BACKEND_PORT || 8989;

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/song', songRoutes);
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
