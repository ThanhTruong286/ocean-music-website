import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import faker from "../assets/images/artists/faker.jpg";
import Footer from "../components/Footer";
import '../styles/discover-music.scss'; // SCSS for styling 
import playIcon from '../assets/play-button.png'; // Icon for play button
import { Swiper, SwiperSlide } from 'swiper/react';
import ArtistPlaylist from "../components/ArtistPlaylist";
import { useNavigate } from 'react-router-dom';
import TrendingList from "../components/TrendingList";
import { fetchingSongs } from "../api/api";
// Load all images from the songs folder
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};
const Home = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [filter, setFilter] = useState('All');
    const filteredNewReleases = newReleases.filter((song) =>
        filter === 'All' ? true : song.region === filter
    );
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchingSongs();
                setSongs(data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchData();
    }, []);



    useEffect(() => {
        // Using mock data instead of fetch functions for testing
        setRecentlyPlayed(songs);
        setNewReleases(songs);
    }, []);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    useEffect(() => {
        // Lấy accessToken từ localStorage
        const token = localStorage.getItem('userToken');
        if (token) {
            setAccessToken(token);
        } else {
            // Điều hướng đến trang login nếu không có accessToken
            navigate('/login');
        }
    }, [navigate]); // Thêm navigate vào mảng phụ thuộc để tránh vấn đề gọi navigate trong render

    if (!accessToken) {
        return <div>Loading...</div>; // Hoặc có thể trả về gì đó để hiển thị trong khi waiting
    }
    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="discover-music">
                        <section className="recently-played">
                            <h2>Đã nghe gần đây</h2>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={3}
                                loop={true}
                                className="recently-played-list"
                            >
                                {songs.slice(0, 10).map((song, index) => {
                                    const songImage = getSongImage(song.coverImageUrl) // Nếu không có ảnh, sử dụng ảnh mặc định


                                    return (
                                        <SwiperSlide key={index} className="recently-played-item">
                                            <div className="album-cover">
                                                <img
                                                    src={songImage}
                                                    className="mb-3 img-fluid rounded-3"
                                                    alt={song.title}
                                                />
                                            </div>

                                            <p className="song-title">{song.title}</p>
                                            <p className="artist-name">{song.artist}</p>

                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>

                        </section>


                        <section className="new-releases">
                            <h2>Mới phát hành</h2>
                            <div className="filter-buttons">
                                <button
                                    onClick={() => handleFilterChange('All')}
                                    className={filter === 'All' ? 'active' : ''}
                                >
                                    Tất cả
                                </button>
                                <button
                                    onClick={() => handleFilterChange('Vietnam')}
                                    className={filter === 'Vietnam' ? 'active' : ''}
                                >
                                    Việt Nam
                                </button>
                                <button
                                    onClick={() => handleFilterChange('International')}
                                    className={filter === 'International' ? 'active' : ''}
                                >
                                    Quốc Tế
                                </button>
                            </div>
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={3}
                                navigation
                                loop
                                className="new-releases-list"
                            >
                                {Array.from({ length: Math.ceil(filteredNewReleases.length / 3) }, (_, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div className="new-release-group">
                                                {filteredNewReleases.slice(i * 3, i * 3 + 3).map((song, index) => {
                                                    const songImage = getSongImage(song.coverImageUrl || '');
                                                    return (
                                                        <div key={index} className="new-release-item">
                                                            {/* Hình ảnh bài hát */}
                                                            <div className="album-cover">
                                                                <img
                                                                    src={songImage}
                                                                    className="mb-3 img-fluid rounded-3"
                                                                    alt={song.title}
                                                                />
                                                            </div>

                                                            {/* Thông tin bài hát */}
                                                            <div className="song-info">
                                                                <p className="song-title">{song.title}</p>
                                                                <p className="artist-name">{song.artist}</p>
                                                            </div>

                                                            {/* Thời lượng bài hát */}
                                                            <p className="duration">{song.duration || 'N/A'}</p>

                                                            {/* Biểu tượng phát */}
                                                            <img src={playIcon} alt="Play" className="play-icon" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </section>
                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <div className="card-header">
                                    <div className="header-title">
                                        <h4 className="card-title text-capitalize mb-3">Playlist Nổi Bật</h4>
                                    </div>
                                </div>
                            </div>
                            {/** ARTIST PLAYLIST LIST */}
                            <ArtistPlaylist accessToken={accessToken} />
                            {/** END ARTIST PLAYLIST LIST */}
                        </div>
                        <div className="row mb-4">
                            <div className="col-lg-12">
                                <div className="card-header mb-3">
                                    <div className="header-title d-flex align-items-center justify-content-between">
                                        <h4 className="card-title text-capitalize">Bài Hát Thịnh Hành</h4>
                                        <a href="#" className="small text-body">View All
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                                <path d="M10.9375 4V9.6875C10.9375 9.80353 10.8914 9.91481 10.8094 9.99686C10.7273 10.0789 10.616 10.125 10.5 10.125C10.384 10.125 10.2727 10.0789 10.1906 9.99686C10.1086 9.91481 10.0625 9.80353 10.0625 9.6875V5.05602L3.80953 11.3095C3.72744 11.3916 3.6161 11.4377 3.5 11.4377C3.3839 11.4377 3.27256 11.3916 3.19047 11.3095C3.10838 11.2274 3.06226 11.1161 3.06226 11C3.06226 10.8839 3.10838 10.7726 3.19047 10.6905L9.44398 4.4375H4.8125C4.69647 4.4375 4.58519 4.39141 4.50314 4.30936C4.42109 4.22731 4.375 4.11603 4.375 4C4.375 3.88397 4.42109 3.77269 4.50314 3.69064C4.58519 3.60859 4.69647 3.5625 4.8125 3.5625H10.5C10.616 3.5625 10.7273 3.60859 10.8094 3.69064C10.8914 3.77269 10.9375 3.88397 10.9375 4Z" fill="#4A525F"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/** TRENDING SONGS */}
                            <ul className="trending-song list-unstyled mb-0">
                                <TrendingList />
                            </ul>
                        </div>
                    </div>


                </div >
            </main >
            <Footer />
        </div >
    )
}
export default Home