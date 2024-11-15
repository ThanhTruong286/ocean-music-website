import React, { useEffect, useState } from 'react';
import '../styles/library.scss';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { fetchFavorites, fetchingSongs } from '../api/api';
import faker from "../assets/images/artists/faker.jpg";

const Library = () => {
  const [favorites, setFavorites] = useState([]);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [songsPerPage] = useState(5); // Số bài hát mỗi trang

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteSongs = await fetchFavorites();
        setFavorites(favoriteSongs);
      } catch (error) {
        console.error('Error loading favorite songs:', error);
      }
    };

    const loadSongs = async () => {
      try {
        const allSongs = await fetchingSongs();
        setSongs(allSongs);
        setFilteredSongs(allSongs);
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    };

    loadFavorites();
    loadSongs();
  }, []);

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setCurrentPage(1); // Reset trang về 1 khi chuyển đổi giữa "All Songs" và "Favorites"
    setFilteredSongs(showFavorites ? songs : favorites);
  };

  // Tính toán các bài hát hiển thị trong trang hiện tại
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Chuyển sang trang tiếp theo
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredSongs.length / songsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Quay lại trang trước
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Tính toán tổng số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSongs.length / songsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="library-page">
      <aside className="sidebar sidebar-base">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="library-container">
            <h2 className="section-title">Music Library</h2>

            <div className="filter-buttons">
              <button className={!showFavorites ? "active" : ""} onClick={toggleShowFavorites}>
                All Songs
              </button>
              <button className={showFavorites ? "active" : ""} onClick={toggleShowFavorites}>
                Favorites
              </button>
            </div>

            <div className="search-bar">
              <input type="text" placeholder="Search for a song..." />
            </div>

            <ul className="song-list">
              {currentSongs.map(song => (
                <li key={song.id} className="song-item">
                  <img src={faker} alt="Song Thumbnail" className="song-thumbnail" />
                  <div className="song-info">
                    <h3 className="song-title">{song.title}</h3>
                    <p className="song-details">{song.artist_name} • {song.album_name} • {song.length}</p>
                  </div>
                  <button className="play-button">Play</button>
                </li>
              ))}
            </ul>

            {/* Pagination with Next and Previous */}
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>

              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={number === currentPage ? "active" : ""}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}

              <button onClick={nextPage} disabled={currentPage === pageNumbers.length}>
                Next
              </button>
            </div>
          </div>

          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Library;
