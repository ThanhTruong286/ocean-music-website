import React, { useEffect, useState } from 'react';
import '../styles/admin.scss'; // SCSS file for styling
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import faker from "../assets/images/artists/faker.jpg";
import { fetchArtists, fetchAlbums, fetchingSongs, fetchPlaylists, fetchUsers } from '../api/api';

const Roles = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalSongs, setTotalSongs] = useState(0);
  const [totalPlaylists, setTotalPlaylists] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trạng thái cho trang hiện tại
  const [artistsPerPage] = useState(6); // Số lượng nghệ sĩ mỗi trang
  const [searchTerm, setSearchTerm] = useState('');
  const [allArtists, setAllArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);  // Kết quả tìm kiếm
  const handleSearch = () => {
    // Lọc artist từ `allArtists` theo `searchTerm`
    const filtered = allArtists.filter(artist =>
      artist.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtists(filtered);  // Cập nhật danh sách tìm kiếm
    setCurrentPage(0);  // Reset về trang 1 khi tìm kiếm
  };

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
        setAllArtists(data);  // Lưu tất cả artist vào allArtists
        setFilteredArtists(data); // Lưu tất cả artist vào filteredArtists để hiển thị ngay
      } catch (err) {
        setError('Không thể tải danh sách artist');
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  useEffect(() => {
    const getRecentUsers = async () => {
      try {
        const users = await fetchUsers();
        // Lọc chỉ những người dùng có role_id = 1
        const adminUsers = users.filter(user => user.role_id === 1);
        // Sắp xếp danh sách người dùng theo ngày tạo
        const sortedAdminUsers = adminUsers.sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );
        setRecentUsers(sortedAdminUsers.slice(0, 5)); // Lấy 5 người dùng mới nhất
      } catch (error) {
        setError('Không thể tải danh sách người dùng mới');
      } finally {
        setLoading(false);
      }
    };
  
    getRecentUsers();
  }, []);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (err) {
        setError('Không thể tải danh sách artist');
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const artists = await fetchArtists();
        setTotalArtists(artists.length);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    getArtists();
  }, []);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const albums = await fetchAlbums();
        setTotalAlbums(albums.length);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    getAlbums();
  }, []);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const songs = await fetchingSongs();
        setTotalSongs(songs.length);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    getSongs();
  }, []);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const playlists = await fetchPlaylists();
        setTotalPlaylists(playlists.length);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    getPlaylists();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setTotalUsers(users.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  // Tính toán nghệ sĩ hiển thị dựa trên trang hiện tại
  const indexOfLastArtist = (currentPage + 1) * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(indexOfFirstArtist, indexOfLastArtist); // Lọc artist từ filteredArtists thay vì artists

  // Hàm xử lý nút Next
  const handleNext = () => {
    if (currentPage < Math.ceil(filteredArtists.length / artistsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm xử lý nút Previous
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage); // Tổng số trang dựa trên filteredArtists
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index); // Các số trang

 
  const reviews = [
    { id: 1, name: 'Alexa Jonas', review: "This Song Captures My Emotions And Paints My World With Its Beautiful Melody And Heartfelt Lyrics. It's Truly Special.", time: '02 Hours Ago', img: 'path-to-image' },
    { id: 2, name: 'Alex Williams', review: "This Song Captures My Emotions And Paints My World With Its Beautiful Melody And Heartfelt Lyrics. It's Truly Special.", time: '06 Hours Ago', img: 'path-to-image' },
    { id: 3, name: 'Vibrat Sharia', review: "This Song Captures My Emotions And Paints My World With Its Beautiful Melody And Heartfelt Lyrics. It's Truly Special.", time: '08 Hours Ago', img: 'path-to-image' },
    { id: 4, name: 'Angle Pate', review: "This Song Captures My Emotions And Paints My World With Its Beautiful Melody And Heartfelt Lyrics. It's Truly Special.", time: '09 Hours Ago', img: 'path-to-image' },
    { id: 5, name: 'Vibrat Sharia', review: "This Song Captures My Emotions And Paints My World With Its Beautiful Melody And Heartfelt Lyrics. It's Truly Special.", time: '12 Hours Ago', img: 'path-to-image' }
  ];

  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="roles-container">
            <div className="stats-section">
              <div className="stat-card">
                <h3>{totalArtists}</h3>
                <p>Total Music Artist</p>
              </div>
              <div className="stat-card">
                <a className="nav-link" href="/addalbum">
                <h3>{totalAlbums}</h3>
                Total Music Albums</a>
              </div>
              <div className="stat-card">
                <h3>{totalSongs}</h3>
                <p>Total Songs</p>
              </div>
              <div className="stat-card">
                <h3>{totalPlaylists}</h3>
                <p>Total Playlist</p>
              </div>
              <div className="stat-card">
                <h3>{totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>

            <div className="content-section">
            <div className="top-artist-section">
                <div className="top-artist-header">
                  <h2>Top Artist</h2>
                  <div className="search-form">
                    <input
                      type="text"
                      placeholder="Search Artists"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                  </div>
                </div>

    
    <div className="artist-list">
      <div className="artist-header">
        <div className="artist-column">No.</div>
        <div className="artist-column">Artist Name</div>
        <div className="artist-column">Joining Date</div>
        <div className="artist-column">Total Songs</div>
      </div>
      {currentArtists
        .filter(artist => 
          artist.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((artist, index) => {
          const date = new Date(artist.date_registered);
          const formattedDate = date.toLocaleDateString('en-CA');
          
          return (
            <div className="artist-row" key={artist.artist_id}>
              <div className="artist-column">{indexOfFirstArtist + index + 1}</div>
              <img src={faker} className="img-fluid rounded avatar-55" alt="Artist" />
              <div className="artist-column nameartist">
                {artist.username}
                <div className="emailartist">{artist.email}</div>
              </div>
              <div className="artist-column">{formattedDate}</div>
              <div className="artist-column">{artist.totalSongs}</div>
            </div>
          );
        })}
    </div>

    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 0}>
        Previous
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page + 1}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  </div>


              <div className="reviews-section">
              <h2>Total Reviews</h2>
                <div className="reviews-chart">
                  <div className="donut-chart">69</div>
                  <p>Positive Reviews</p>
                  <ul>
                    <li>Songs <h5>{totalSongs}</h5></li>
                    <li>Albums <h5>{totalAlbums}</h5></li>
                    <li>Playlist <h5>{totalPlaylists}</h5></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="roles-container">
            <div className="recent-reviews-section">
              <div className="recent-users">
              <div className="users-header">
                    <div className="users-column">Recent Users</div>
                    <div className="users-column">Last Login</div>
                    
                  </div>
                <ul>
                {recentUsers.map(user => {
                // Chuyển đổi chuỗi last_login thành một đối tượng Date
                const formattedDate = new Date(user.last_login).toLocaleDateString('en-CA'); // 'en-CA' cho định dạng "YYYY-MM-DD"

                return (
                  <li key={user.id}>
                    <img src={user.img || 'path-to-placeholder-image'} alt={user.name} />
                    <div>
                      <p>{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                    <span>{user.time || formattedDate}</span> {/* Hiển thị ngày đã định dạng */}
                  </li>
                );
              })}
              </ul>
              
              </div>
              
              

              <div className="total-reviews">
                <h2>Total Reviews</h2>
                <ul>
                  {reviews.map(review => (
                    <li key={review.id}>
                      <img src={review.img} alt={review.name} />
                      <div>
                        <p>{review.review}</p>
                        <p>By {review.name}</p>
                      </div>
                      <span>{review.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
            
      
        
              

          <Footer />
        </div>
        
      </main>
    </div>
  );
};

export default Roles;
