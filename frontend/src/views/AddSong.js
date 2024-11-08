import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAddNewSong } from '../api/api'; // Import API để thêm bài hát
import '../styles/addsong.scss';

const AddSong = () => {
  const [newSong, setNewSong] = useState({
    image: '',
    title: '',
    genre: '',
    writer: '',
    singer: '',
  });
  const [loading, setLoading] = useState(false);  // Thêm trạng thái loading để theo dõi quá trình gửi dữ liệu
  const [error, setError] = useState(null); // Thêm trạng thái lỗi nếu có
  const navigate = useNavigate();

  // Hàm xử lý sự kiện thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm xử lý thêm bài hát
  const handleAddSong = async () => {
    try {
        const result = await fetchAddNewSong(newSong);
        if (result && result.songId) {
            navigate('/music-list');
        } else {
            setError('Lỗi khi thêm bài hát');
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setError('Lỗi khi thêm bài hát');
    }
};

  return (
    <div className="add-song-container">
      <h1>Add New Song</h1>
      {error && <div className="error-message">{error}</div>} {/* Hiển thị lỗi nếu có */}
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Song Name"
          value={newSong.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newSong.image}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="genre"
          placeholder="Genres"
          value={newSong.genre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="writer"
          placeholder="Writer"
          value={newSong.writer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="singer"
          placeholder="Singer"
          value={newSong.singer}
          onChange={handleChange}
        />
      </div>
      <button
        className="btn btn-add-song"
        onClick={handleAddSong}
        disabled={loading}  // Disable nút khi đang gửi dữ liệu
      >
        {loading ? 'Adding...' : 'Add New Song'}
      </button>
    </div>
  );
};

export default AddSong;
