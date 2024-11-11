import React, { useEffect, useState } from 'react';
import '../styles/library.scss';
import Header from "../components/Header";
import Sidebar from '../components/Sidebar';
import { fetchFavorites } from '../api/api'; // Giữ nguyên fetchFavorites
import { fetchTrendingSongs } from '../api/api'; // Đảm bảo đã nhập fetchingSongs đúng
import faker from "../assets/images/artists/faker.jpg";

const Library = () => {
  const [favorites, setFavorites] = useState([]);
  const [songs, setSongs] = useState([]);
  const [showAll, setShowAll] = useState(false); // Trạng thái để hiển thị tất cả bài hát

  useEffect(() => {
    // Tải danh sách bài hát yêu thích
    const loadFavorites = async () => {
      try {
        const favoriteSongs = await fetchFavorites();
        setFavorites(favoriteSongs);
      } catch (error) {
        console.error('Error loading favorite songs:', error);
      }
    };

    // Tải tất cả các bài hát
    const loadSongs = async () => {
      try {
        const allSongs = await fetchTrendingSongs(); // Gọi API fetchingSongs
        setSongs(allSongs); // Lưu danh sách bài hát vào state songs
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    };

    loadFavorites();
    loadSongs(); // Gọi hàm loadSongs khi component được render

  }, []); // Chạy 1 lần khi component render

  // Hàm để toggle trạng thái "showAll" khi bấm nút "See All"
  const toggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll); // Đổi trạng thái của showAll
  };

  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="library-container">
            <div className="video-library">
              <div className="main-video">
                {/* Kiểm tra xem có bài hát nào không, nếu có thì hiển thị bài hát đầu tiên */}
                {songs.length > 0 && (
                  <>
                    <img
                      src={faker}  // Bạn có thể thay đổi để lấy ảnh từ bài hát, ví dụ songs[0].thumbnail nếu có
                      className="img-fluid rounded me-3 avatar-55"
                      alt="Video Thumbnail"
                    />
                    <div className="video-info">
                      <h3 className="video-section-title">Thư viện</h3>
                      <h2>{songs[0].title}</h2> {/* Tên bài hát */}
                      <p>{songs[0].lyric}</p> {/* Tên nghệ sĩ */}
                      <div className="video-controls">
                        <button className="play-all">Phát tất cả</button>
                        <button className="shuffle">Trộn bài</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="video-list">
                {songs.slice(0, showAll ? songs.length : 4).map(song => ( // Nếu showAll là true, hiển thị tất cả bài hát, nếu không hiển thị 4 bài hát đầu
                  <div key={song.id} className="video-item">
                    <img src={faker} className="img-fluid rounded me-3 avatar-55" />
                    <div className="video-details">
                      <h3>{song.title}</h3>
                      <p>{song.lyric} - {song.duration} - {song.length} </p>
                    </div>
                  </div>

                ))}
                <button className="see-all" onClick={toggleShowAll}>
                  {showAll ? "Hide" : "See All"} {/* Hiển thị "See All" khi chưa nhấn, "Hide" khi đã nhấn */}
                </button>

              </div>
            </div>




            <div className="favorite-songs">
              <h2>Bài nhạc ưa thích</h2>
              <table className="song-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map(song => (
                    <tr key={song.favorite_id}>
                      <td>{song.song_id}</td>
                      <td>{song.artist_name}</td>
                      <td>{song.album_name}</td>
                      <td>{song.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="see-all">See All</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
