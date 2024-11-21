import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/artist.scss';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { getArtistById, getSongByArtist } from '../api/api';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    // Trả về URL hình ảnh từ backend nếu có, nếu không thì dùng ảnh fallback
    return imageName ? `${API_URL}/assets/images/songs/${imageName}` : null;
};

const getArtistImage = (imageName) => {
    // Trả về URL hình ảnh từ backend nếu có, nếu không thì dùng ảnh fallback
    return imageName ? `${API_URL}/assets/images/profiles/${imageName}` : null;
};

const SECRET_KEY = 'MIKASA';

const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
};
const ArtistDetail = () => {
    const artist_id = useParams();
    const [artist, setArtist] = useState(null);
    const [artistSongs, setArtistSongs] = useState([]);
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const songsPerPage = 4; // Số lượng bài hát trên mỗi trang
    const navigate = useNavigate();

    const handleOnclickSong = (encryptedId) => {
        navigate(`/song-detail/${encryptedId}`);  // Chuyển hướng sang trang chi tiết
    }

    const decryptId = (encryptedId) => {
        const decoded = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decoded, 'MIKASA');
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const decrypt = decryptId(artist_id.id);

    useEffect(() => {
        const loadArtist = async () => {
            try {
                const response = await getArtistById(decrypt);
                setArtist(response);
            } catch (error) {
                setError("Error loading artist");
            } finally {
                setLoading(false);
            }
        };

        const loadArtistSongs = async () => {
            try {
                const response = await getSongByArtist(decrypt);
                setArtistSongs(response || []); // Đảm bảo dữ liệu luôn là mảng
            } catch (e) {
                setError("Không tải được danh sách nhạc của nghệ sĩ");
            } finally {
                setLoading(false);
            }
        };

        loadArtist();
        loadArtistSongs();
    }, [decrypt]);

    if (err) {
        return <div>{err}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // Tính toán dữ liệu cho từng trang
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = artistSongs.slice(indexOfFirstSong, indexOfLastSong);

    // Chuyển đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="artist-detail">
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="artist-detail__content container-fluid" id="page_layout">
                        <div className="artist-detail__header" style={{ backgroundImage: `url(${getArtistImage(artist?.profile_url)})` }}>
                            <div className="artist-detail__verified">
                                <i className="fas fa-check-circle"></i>
                                <span style={{ color: "white" }}>Verified Artist</span>
                            </div>
                            <h1 style={{ color: "white" }} className="artist-detail__name">{artist.first_name} {artist.last_name}</h1>
                            <div style={{ color: "white" }} className="artist-detail__listeners">
                                90,370,250 monthly listeners
                            </div>
                        </div>
                        <div className="artist-detail__content-section">
                            <div className="artist-detail__actions">
                                <button className="artist-detail__play-button">
                                    <i className="fas fa-play"></i>
                                </button>
                                <button className="artist-detail__follow-button">
                                    Follow
                                </button>
                                <i className="fas fa-ellipsis-h artist-detail__more-options"></i>
                            </div>
                            <div className="artist-detail__section-title">Popular Songs</div>
                            <div className="artist-detail__popular-songs">
                                {currentSongs.map((song) => {
                                    const songImage = getSongImage(song.cover_image_url);
                                    const songEncryptId = encryptId(song.song_id);
                                    return (
                                        <div className="artist-detail__song" key={song.song_id}>
                                            <img style={{ borderRadius: "10px" }} alt={song.title} height="50" src={songImage} width="50" />
                                            <div className="artist-detail__song-details">
                                                <span style={{ cursor: "pointer" }} onClick={() => handleOnclickSong(songEncryptId)} className="artist-detail__song-title">{song.title}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Phân trang */}
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(artistSongs.length / songsPerPage) }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ArtistDetail;
