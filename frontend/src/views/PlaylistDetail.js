import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import "../styles/playlist.scss";
import { getPlaylistById } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import faker from "../assets/images/artists/faker.jpg";


const SECRET_KEY = 'MIKASA';

// Hàm mã hóa ID
const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
};
// Load all images from the songs folder
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const PlaylistDetail = () => {
    const { id: playlistId } = useParams();
    const [playList, setPlaylist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPlaylist = async () => {
            try {
                const data = await getPlaylistById(playlistId);
                setPlaylist(data);
            } catch (e) {
                console.error("Error fetching playlist:", e);
                throw new Error("Error fetching playlist");
            }
        };
        loadPlaylist();
    }, [playlistId]);

    if (!playList) {
        return <div>Loading...</div>;
    }

    // Hàm xử lý khi nhấn vào tên bài hát
    const handleOnclickSong = (songId) => {
        const encryptedId = encryptId(songId);
        navigate(`/song-detail/${encryptedId}`);
    };

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <div className="header">
                            <img
                                alt="Album cover image"
                                height="200"
                                src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg"
                                width="200"
                            />
                            <div className="details">
                                <p>Playlist</p>
                                <h1>{playList.title}</h1>
                                <p>{`${playList.songs.length} song(s)`}</p>
                            </div>
                        </div>
                        <div className="controls">
                            <button className="play-button">
                                <i className="fas fa-play"></i>
                            </button>
                        </div>
                        <table className="song-list">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Bài Hát</th>
                                    <th>Nghệ Sĩ(s)</th>
                                    <th>Ngày Thêm</th>
                                    <th><i className="far fa-clock"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {playList.songs.map((song, index) => (
                                    <tr key={song.songId}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                alt="Album cover image"
                                                height="40"
                                                src={getSongImage(song.coverImageUrl)} // Sử dụng hàm getSongImage
                                                width="40"
                                                style={{ marginRight: '10px' }}
                                            />
                                            <span
                                                className="song-title"
                                                style={{ cursor: 'pointer', color: 'blue' }}
                                                onClick={() => handleOnclickSong(song.songId)}
                                            >
                                                {song.title}
                                            </span>
                                        </td>
                                        <td>
                                            {song.artists.map((artist, artistIndex) => (
                                                <span key={artistIndex}>
                                                    {artist.name}
                                                    {artistIndex < song.artists.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </td>
                                        <td>{new Date().toLocaleDateString()}</td>
                                        <td>3:51</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className="recommended">
                            <h2>Recommended</h2>
                            <p>Based on what's in this playlist</p>
                            {playList.songs.slice(0, 2).map((song, index) => (
                                <div key={index} className="song">
                                    <div className="details">
                                        <img
                                            alt="Album cover image"
                                            height="40"
                                            src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg"
                                            width="40"
                                        />
                                        <div>
                                            <p className="title">{song.title}</p>
                                            <p className="artist">{song.artists[0]?.name}</p>
                                        </div>
                                    </div>
                                    <button className="add-button">Add</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PlaylistDetail;
