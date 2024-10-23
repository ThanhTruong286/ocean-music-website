import React from 'react';
import '../styles/library.scss';
import Header from "../components/Header";
import Sidebar from '../components/Sidebar';

const Library = () => {
  const videos = [
    {
      id: 1,
      title: "FLVR FULL EP",
      artist: "tlinh x Low G",
      time: "1 ngày",
      length: "3:23",
      thumbnail: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Không Phải Gu",
      artist: "HIEUTHUHAI ft. B Ray & Tage",
      time: "3 ngày",
      length: "3:21",
      thumbnail: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "Chim Sâu",
      artist: "RPT MCK",
      time: "7 ngày",
      length: "2:38",
      thumbnail: "https://via.placeholder.com/150"
    },
  ];

  const songs = [
    {
      id: 1,
      title: "Mộng Yu",
      artist: "AMEE, RTP MCK",
      album: "Mộng Yu",
      time: "1 ngày",
      length: "3:23",
      thumbnail: "https://via.placeholder.com/50"
    },
    {
      id: 2,
      title: "Không Phải Gu",
      artist: "HIEUTHUHAI",
      album: "Không Phải Gu",
      time: "3 ngày",
      length: "3:21",
      thumbnail: "https://via.placeholder.com/50"
    },
    {
      id: 3,
      title: "Không Phải Gu",
      artist: "HIEUTHUHAI",
      album: "Không Phải Gu",
      time: "3 ngày",
      length: "3:21",
      thumbnail: "https://via.placeholder.com/50"
    }
  ];

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


                <div className="video-info">
                  <img src="https://via.placeholder.com/600x400" alt="Main Video" />
                  <h3 className="video-section-title">Thư viện</h3>
                  <h2>FLVR FULL EP</h2>
                  <p>by tlinh x Low G</p>
                  <div className="video-controls">
                    <button className="play-all">Phát tất cả</button>
                    <button className="shuffle">Trộn bài</button>
                  </div>
                </div>
              </div>


              <div className="video-list">
                {videos.map(video => (
                  <div key={video.id} className="video-item">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-details">
                      <h3>{video.title}</h3>
                      <p>{video.artist} - {video.time} - {video.length}</p>
                    </div>
                    <button className="add-button">+</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="favorite-songs">
              <h2>Bài nhạc ưa thích</h2>
              <table className="song-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Ngày thêm</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map(song => (
                    <tr key={song.id}>
                      <td>
                        <img src={song.thumbnail} alt={song.title} />
                        <span>{song.title}</span>
                      </td>
                      <td>{song.album}</td>
                      <td>{song.time}</td>
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
