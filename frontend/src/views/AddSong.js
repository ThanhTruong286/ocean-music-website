import Header from "../components/Header";

import Sidebar from "../components/Sidebar";

import Footer from "../components/Footer";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAddNewSong } from '../api/api';
import '../styles/addsong.scss';
// Import Swiper React components

const Home = () => {
  const [newSong, setNewSong] = useState({
    image: '',
    title: '',
    genre: '',
    writer: '',
    singer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="add-song-container">
            <h1>Add New Song</h1>
            {error && <div className="error-message">{error}</div>}

            <div className="form-card">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Song Name"
                value={newSong.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-card">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newSong.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-card">
              <label>Genre</label>
              <input
                type="text"
                name="genre"
                placeholder="Genres"
                value={newSong.genre}
                onChange={handleChange}
              />
            </div>

            <div className="form-card">
              <label>Writer</label>
              <input
                type="text"
                name="writer"
                placeholder="Writer"
                value={newSong.writer}
                onChange={handleChange}
              />
            </div>

            <div className="form-card">
              <label>Singer</label>
              <input
                type="text"
                name="singer"
                placeholder="Singer"
                value={newSong.singer}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn"
              onClick={handleAddSong}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add New Song'}
            </button>
          </div>
        </div >
      </main>
      <Footer />
    </div>
  )
}
export default Home