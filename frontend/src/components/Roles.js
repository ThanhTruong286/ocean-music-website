import React from 'react';
import '../styles/roles.scss'; // SCSS file for styling
import Header from "../components/Header";
const Roles = () => {
  // Dummy data
  const artists = [
    { id: 1, name: 'Pete Saraiya', email: 'petesaraiya@demo.com', date: 'Jan 24, 2020', songs: 157 },
    { id: 2, name: 'Pete Saraiya', email: 'petesaraiya@demo.com', date: 'Jan 24, 2020', songs: 157 },
    { id: 3, name: 'Pete Saraiya', email: 'petesaraiya@demo.com', date: 'Jan 24, 2020', songs: 157 }
  ];
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
      <Header />
    <div className="roles-container">
      <div className="stats-section">
        <div className="stat-card">
          <h3>352</h3>
          <p>Total Music Artist</p>
        </div>
        <div className="stat-card">
          <h3>987</h3>
          <p>Total Music Albums</p>
        </div>
        <div className="stat-card">
          <h3>2.5K</h3>
          <p>Total Songs</p>
        </div>
        <div className="stat-card">
          <h3>850</h3>
          <p>Total Playlist</p>
        </div>
        <div className="stat-card">
          <h3>5.2M</h3>
          <p>Total Users</p>
        </div>
      </div>

      <div className="content-section">
        <div className="top-artist-section">
          <h2>Top Artist</h2>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Artist Name</th>
                <th>Joining Date</th>
                <th>Total Songs</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, index) => (
                <tr key={artist.id}>
                  <td>{index + 1}</td>
                  <td>{artist.name} <br /> {artist.email}</td>
                  <td>{artist.date}</td>
                  <td>{artist.songs}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      {/* Other content here */}

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

  );
};

export default Roles;
