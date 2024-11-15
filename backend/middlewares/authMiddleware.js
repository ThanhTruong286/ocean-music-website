const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Tách token từ "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Token is required' });
  }

  jwt.verify(token, "MIKASA", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Lưu thông tin người dùng vào req.user
    req.user = decoded;
    next(); // Tiếp tục đến route tiếp theo
  });
};

module.exports = authenticateToken;
