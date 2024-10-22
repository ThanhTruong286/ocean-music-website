// server.js
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const authRoutes = require('./routes/authRoutes'); // Thêm route cho auth
const errorHandler = require('./middlewares/errorHandler'); // Middleware xử lý lỗi
const authController = require('./controllers/authController');
app.post('/auth/login', authController.loginUser);

const genreRoutes = require('./routes/genreRoutes');

const db = require('./config/db'); // Kết nối DB

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // Để xử lý JSON
app.use(bodyParser.urlencoded({ extended: true })); // Để xử lý dữ liệu từ form

// Sử dụng routes
app.use('/api/auth', authRoutes); // Route cho xác thực
app.use('/api/users', userRoutes); // Route cho người dùng

app.use('/api/artist', artistRoutes); // Route cho artist

// Middleware xử lý lỗi
app.use(errorHandler);

app.use('/api/artist', artistRoutes);// Route cho 
app.use('/api/genres', genreRoutes);



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
