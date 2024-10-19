// src/Album.js
import Header from "../components/Header";
import '../styles/album.scss'; // Import SCSS file

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

  const songs = [
    { id: 1, title: "My Lovely Doll", artist: "King Of Rape", image: "https://via.placeholder.com/150", plays: "6.2k" },
    { id: 2, title: "My Yellow Car", artist: "Alina Kuru", image: "https://via.placeholder.com/150", plays: "5.9k" },
    { id: 3, title: "Retro Lo-Fi", artist: "Mitral Luff", image: "https://via.placeholder.com/150", plays: "5.4k" },
    { id: 4, title: "Party Nights", artist: "John Deo", image: "https://via.placeholder.com/150", plays: "5.1k" },
    { id: 5, title: "My Little World", artist: "John And Smith Jonas", image: "https://via.placeholder.com/150", plays: "4.6k" },
    { id: 6, title: "My Way Of Music", artist: "Winy Sling", image: "https://via.placeholder.com/150", plays: "7.4k" },
    { id: 7, title: "Party Nights", artist: "Alina Jonas", image: "https://via.placeholder.com/150", plays: "4.2k" },
    { id: 8, title: "Hits Of Beats", artist: "Alina Smith", image: "https://via.placeholder.com/150", plays: "7.2k" },
    { id: 9, title: "First Concert", artist: "Kimono Dictum", image: "https://via.placeholder.com/150", plays: "3.9k" },
    { id: 10, title: "Mountain Road", artist: "John Deo", image: "https://via.placeholder.com/150", plays: "3.4k" },
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

      {/* New Section for Top Releasing Songs */}
      <div className="songs-container">
        <h2 className="songs-title">Our Top Releasing Listening Songs</h2>
        <div className="song-list">
          {songs.map(song => (
            <div key={song.id} className="song-item">
              <img src={song.image} alt={song.title} className="song-image" />
              <div className="song-details">
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artist">{song.artist}</p>
              </div>
              <div className="song-plays">
                <span role="img" aria-label="headphone">🎧</span> {song.plays}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;
