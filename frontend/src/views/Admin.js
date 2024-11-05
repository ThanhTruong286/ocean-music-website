import React, { useEffect, useState } from 'react';
import '../styles/admin.scss'; // SCSS file for styling
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
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
  
  const users = [
    { id: 1, name: 'Jane Cooper', email: 'Janecooper@gmail.com', time: '12 hours ago', img: 'path-to-image' },
    { id: 2, name: 'Wade Warren', email: 'Wadewarren@gmail.com', time: '18 hours ago', img: 'path-to-image' },
    { id: 3, name: 'Jacob Jones', email: 'Jacobjones@gmail.com', time: '24 hours ago', img: 'path-to-image' },
    { id: 4, name: 'Cody Fisher', email: 'Codyfisher@gmail.com', time: '28 hours ago', img: 'path-to-image' },
    { id: 5, name: 'Dianne Russell', email: 'Diannerussell@gmail.com', time: '36 hours ago', img: 'path-to-image' },
    { id: 6, name: 'Loreal Kinas', email: 'Lorealkinas@gmail.com', time: '48 hours ago', img: 'path-to-image' }
  ];

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
                <h3>{totalAlbums}</h3>
                <p>Total Music Albums</p>
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
                <h2>Top Artist</h2>
                <div className="artist-list">
                  <div className="artist-header">
                    <div className="artist-column">No.</div>
                    <div className="artist-column">Artist Name</div>
                    <div className="artist-column">Joining Date</div>
                    <div className="artist-column">Total Songs</div>
                  </div>
                  {artists.map((artist, index) => {
                  // Tạo đối tượng Date từ chuỗi date_registered
                  const date = new Date(artist.date_registered);

                  // Định dạng ngày theo kiểu YYYY-MM-DD
                  const formattedDate = date.toLocaleDateString('en-CA'); // Định dạng 'en-CA' cho ra "YYYY-MM-DD"

                  return (
                    <div className="artist-row" key={artist.artist_id}>
                      <div className="artist-column">{index + 1}</div>
                      <div className="artist-column nameartist">
                        {artist.username}
                        <div className="emailartist">{artist.email}</div> {/* Thêm email vào dưới tên */}
                      </div>
                      <div className="artist-column">{formattedDate}</div>
                      <div className="artist-column">{artist.totalSongs}</div>
                    </div>
                  );
                })}

                </div>
                <div className="pagination">
                  <button>Previous</button>
                  <span>1</span>
                  <button>Next</button>
                </div>
              </div>

              <div className="reviews-section">
                <h2>Total Reviews</h2>
                <div className="reviews-chart">
                  <div className="donut-chart">69</div>
                  <p>Positive Reviews</p>
                  <ul>
                    <li>Songs <span>5,674</span></li>
                    <li>Albums <span>1,624</span></li>
                    <li>Playlist <span>5,515</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="roles-container">
            <div className="recent-reviews-section">
              <div className="recent-users">
                <h2>Recent Users</h2>
                <ul>
                  {users.map(user => (
                    <li key={user.id}>
                      <img src={user.img} alt={user.name} />
                      <div>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                      </div>
                      <span>{user.time}</span>
                    </li>
                  ))}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roles;
