// db.js
const mysql = require('mysql');

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ocean'
  });

  connection.connect(function (err) {
    if (err) {
      console.error('Error connecting to the database: ' + err);
      setTimeout(handleDisconnect, 2000); // Thử lại kết nối sau 2 giây
    }
  });

  connection.on('error', function (err) {
    console.error('Database error: ' + err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Nếu kết nối bị mất, thử kết nối lại
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// Xuất đối tượng connection
module.exports = connection; // Thay đổi ở đây
