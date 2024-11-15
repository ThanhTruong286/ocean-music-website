import React, { useState, useEffect } from 'react';
import '../styles/musichistory.scss';

const MusicHistory = () => {
  // Tạo dữ liệu mẫu lịch sử nghe nhạc
  const [history, setHistory] = useState([
    { title: "Shape of You", artist: "Ed Sheeran", album: "Divide", listen_date: "2024-11-10T14:30:00Z" },
    { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", listen_date: "2024-11-09T18:20:00Z" },
    { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", listen_date: "2024-11-08T22:10:00Z" },
    { title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", listen_date: "2024-11-07T16:00:00Z" },
    { title: "Montero", artist: "Lil Nas X", album: "Montero", listen_date: "2024-11-06T20:15:00Z" },
    { title: "Peaches", artist: "Justin Bieber", album: "Justice", listen_date: "2024-11-05T13:40:00Z" }
  ]);

  return (
    <div className="music-history">
      <h1>Lịch Sử Nghe Nhạc</h1>
      <table className="history-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.artist}</td>
                <td>{item.album}</td>
                <td>{new Date(item.listen_date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có dữ liệu lịch sử nghe nhạc.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MusicHistory;
