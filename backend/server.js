const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');
const roleRoutes = require('./routes/roleRoutes');
const db = require('./config/db'); // Kết nối DB

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Để xử lý JSON
app.use(bodyParser.urlencoded({ extended: true })); // Để xử lý dữ liệu từ form

// Sử dụng routes
app.use('/api/users', userRoutes); // Route cho người dùng
app.use('/api/artist', artistRoutes);// Route cho artist
app.use('/api/album', albumRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/role', roleRoutes);
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
