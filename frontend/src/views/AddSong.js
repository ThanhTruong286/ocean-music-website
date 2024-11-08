import React, { useState, useEffect } from 'react';
import '../styles/addsong.scss';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import faker from "../assets/images/artists/faker.jpg";
// Assume fetchingSongs is imported correctly
import { fetchingSongs } from '../api/api'; // Replace with your actual import path
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);
const getSongImage = (imageName) => {
  // Check if the image exists in the context keys, else use peanut as default
  return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};
const MusicList = () => {
  const [songs, setSongs] = useState([]);
  const [totalSongs, setTotalSongs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(5); // Number of songs per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const fetchedSongs = await fetchingSongs();
        setSongs(fetchedSongs);
        setTotalSongs(fetchedSongs.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Failed to fetch songs');
        setLoading(false);
      }
    };

    getSongs();
  }, []);

  // Calculate the current songs to display
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  // Pagination logic
  const totalPages = Math.ceil(totalSongs / songsPerPage);

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="music-list-container">
            <div className="header">
              <h1>Music List</h1>
              <h1>Total Songs: {totalSongs}</h1>
              <div className="search-form">
                <input type="text" placeholder="Search Artists" />
                <button>Search</button>
                <button className="btn btn-add">+ Add New Song</button>
              </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="song-header-row">
              <div className="header-cell">No.</div>
              <div className="header-cell">Image</div>
              <div className="header-cell">Song Name</div>
              <div className="header-cell">Genres</div>
              <div className="header-cell">Writer</div>
              <div className="header-cell">Singer</div>
              <div className="header-cell">Listener</div>
              <div className="header-cell">Reviews</div>
              <div className="header-cell">Action</div>
            </div>
            <div className="songs-container">
              {!loading && currentSongs.length === 0 && <p>No songs found.</p>}

              {currentSongs.map((song, index) => {
                // Ensure getSongImage is available and returns a valid URL
                const songImage = getSongImage(song.coverImageUrl);

                return (
                  <div key={song.id} className="song-row">
                    <div className="song-cell">{indexOfFirstSong + index + 1}</div>
                    <div className="song-cell song-image-container">
                      {/* Display song image */}
                      <img src={songImage} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                    </div>
                    <div className="song-cell">{song.title}</div>
                    <div className="song-cell">{song.genreId}</div>
                    <div className="song-cell">{song.lyric}</div>
                    <div className="song-cell">{song.artist}</div>
                    <div className="song-cell">{song.listeners}</div>
                    <div className="song-cell">{song.reviews}</div>
                    <div className="song-cell">
                      <button className="btn btn-edit">✎</button>
                      <button className="btn btn-delete">🗑</button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Pagination Controls */}
            <div className="pagination">
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ))}
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default MusicList;
