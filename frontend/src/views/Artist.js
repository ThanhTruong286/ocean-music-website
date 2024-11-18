import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/artist.scss';
import { fetchArtists } from "../api/api"
import faker from "../assets/images/artists/faker.jpg";
import CryptoJS from 'crypto-js';

// Load all images from the songs folder
const images = require.context('../assets/images/profiles', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
  return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const SECRET_KEY = 'MIKASA';

const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
};

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [artistsPerPage] = useState(8);

  useEffect(() => {
    const loadArtist = async () => {
      try {
        const response = await fetchArtists();
        setArtist(response);
        console.log(response);
      } catch (error) {
        setError("Error loading artist");
      } finally {
        setLoading(false);
      }
    }
    loadArtist();
  }, []);

  if (err) {
    return <div>{err}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Xử lý phân trang
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artist.slice(indexOfFirstArtist, indexOfLastArtist);

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="content-inner pb-0 container-fluid" id="page_layout">
            <div className="row mb-5">
            </div>
          </div>
          <div className="ocean-container">
            <div className="ocean-header">
              <h1>Release</h1>
            </div>
            <div className="ocean-tabs">
              <div className="ocean-tab ocean-active">Featured</div>
              <div className="ocean-tab">Popular</div>
              <div className="ocean-tab">Newest</div>
            </div>
            <div className="ocean-grid">
              {currentArtists.map((data, index) => {
                const artistImage = getSongImage(data.profile_url);
                return (
                  <div className="ocean-card" key={index}>
                    <img alt="Artist" height="200" src={artistImage} width="200" />
                    <div className="ocean-info">
                      <h3>{data.first_name} {data.last_name}</h3>
                      <p>{data.bio}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Phân trang */}
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Trước
            </button>
            <span>Trang {currentPage}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(artist.length / artistsPerPage)}>
              Kế
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Artist;
