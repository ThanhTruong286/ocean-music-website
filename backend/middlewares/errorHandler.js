// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Ghi log lỗi
  
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;
  