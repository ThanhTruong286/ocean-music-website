// src/Album.js
import Header from "../components/Header";
import '../styles/album.scss'; // Import tệp SCSS của Album

const Album = () => {
  const albums = [
    { id: 1, title: "Way Of Right", artist: "By King Sing", image: "https://via.placeholder.com/300" },
    { id: 2, title: "Years Of Hundred", artist: "By Helena Illation", image: "https://via.placeholder.com/300" },
    { id: 3, title: "You Are Mine", artist: "You Are Mine", image: "https://via.placeholder.com/300" },
    { id: 4, title: "Heart Is Beating", artist: "By Snoods Smith Jonas", image: "https://via.placeholder.com/300" },
    { id: 5, title: "My Crying Eyes", artist: "By Snoods Smith Jonas", image: "https://via.placeholder.com/300" },
    { id: 6, title: "Travel Mix", artist: "By Alex Williams", image: "https://via.placeholder.com/300" },
    { id: 7, title: "Romantic Songs", artist: "By Eliana D’Cruz", image: "https://via.placeholder.com/300" },
    { id: 8, title: "Rocking Party", artist: "By Omen Smith", image: "https://via.placeholder.com/300" },
    { id: 9, title: "Peace Of Mind", artist: "By Mainours Kian", image: "https://via.placeholder.com/300" },
    { id: 10, title: "Rap Songs", artist: "By Koruna Truss", image: "https://via.placeholder.com/300" },
  ];

  return (
    <div>
      <Header />

      <div className="album-container">
        <h1 className="album-title">Albums</h1>
        <div className="album-list">
          {albums.map(album => (
            <div key={album.id} className="album-item">
              <img src={album.image} alt={album.title} className="album-image" />
              <h2 className="album-name">{album.title}</h2>
              <p className="album-artist">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;
