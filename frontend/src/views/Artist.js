import React from 'react';
import '../styles/artist.scss'; // Import the SCSS file
import Header from "../components/Header";
import faker from "../assets/images/artists/faker.jpg";
import Sidebar from '../components/Sidebar';
const artistsData = {
  favoriteArtists: [
    { name: 'HIEUTHUHAI', role: 'Artist', imgSrc: faker },
    { name: 'Sơn Tùng M-TP', role: 'Artist', imgSrc: faker },
    { name: 'RPT MCK', role: 'Artist', imgSrc: 'path-to-image3' },
    { name: 'Low G', role: 'Artist', imgSrc: 'path-to-image4' }
  ],
  recommendedArtists: [
    { name: 'Táo', role: 'Artist', imgSrc: 'path-to-image5' },
    { name: 'Erik', role: 'Artist', imgSrc: 'path-to-image6' },
    { name: 'Grey D', role: 'Artist', imgSrc: 'path-to-image7' },
    { name: 'Pháo', role: 'Artist', imgSrc: 'path-to-image8' }
  ]
};

const Artist = () => {
  return (

    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />

          <div className="artist-page">
            <section className="artist-section">
              <h2>Nghệ sĩ yêu thích của bạn</h2>
              <div className="artist-grid">
                {artistsData.favoriteArtists.map((artist, index) => (
                  <div className="artist-card" key={index}>
                    <img src={artist.imgSrc} alt={artist.name} className="artist-image" />
                    <p>{artist.name}</p>
                    <span>{artist.role}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="artist-section">
              <h2>Bạn cũng có thể thích</h2>
              <div className="artist-grid">
                {artistsData.recommendedArtists.map((artist, index) => (
                  <div className="artist-card" key={index}>
                    <img src={artist.imgSrc} alt={artist.name} className="artist-image" />
                    <p>{artist.name}</p>
                    <span>{artist.role}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Artist;
