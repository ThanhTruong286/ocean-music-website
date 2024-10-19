// server.js
const express = require('express');
const connectDB = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const loggingMiddleware = require('./middlewares/loggingMiddleware');

const app = express();

// Kết nối đến MongoDB
connectDB();

// Middleware
app.use(express.json()); // Xử lý JSON
app.use(loggingMiddleware); // Ghi log các yêu cầu

// Ví dụ sử dụng middleware xác thực cho một route
app.use('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});

// Route mẫu
app.get('/api/public', (req, res) => {
  res.send('This is a public route.');
});

// Middleware xử lý lỗi
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
