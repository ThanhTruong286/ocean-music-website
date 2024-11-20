import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import faker from "../assets/images/artists/faker.jpg";
import { fetchingSongs } from "../api/api";
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import "../styles/trendingList.scss";

// Load all images from the songs folder
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

// Key for AES encryption (Keep this secret and do not hardcode in production)
const SECRET_KEY = 'MIKASA';

const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
};

const TrendingList = () => {
    const [songs, setSongs] = useState([]);
    const [errors, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Dùng useNavigate để điều hướng

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const data = await fetchingSongs();
                setSongs(data);
            } catch (err) {
                setError("Không tải được danh sách nhạc");
            } finally {
                setLoading(false);
            }
        };
        loadSongs();
    }, []);

    const handleOnclickSong = (encryptedId) => {
        navigate(`/song-detail/${encryptedId}`);  // Chuyển hướng sang trang chi tiết
    }

    if (loading) {
        return <div>Đang tải danh sách nhạc...</div>;
    } else if (errors) {
        return <div>Lỗi: {errors}</div>;
    }

    return (
        <div className="trending-list">
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
            >
                {songs.map((song) => {
                    const songImage = getSongImage(song.coverImageUrl);
                    const encryptedId = encryptId(song.id);

                    return (
                        <SwiperSlide key={song.id}>
                            <div className="swiper-slide card">
                                <div className="card-body text-center p-3">
                                    {/* Hình ảnh bài hát */}
                                    <div className="image-container mb-3">
                                        <img
                                            src={songImage}
                                            className="mb-3 img-fluid rounded-3"
                                            alt={song.title}
                                        />
                                    </div>

                                    {/* Tên bài hát */}
                                    <div
                                        className="title text-capitalize line-count-1 h6 d-block text-truncate"
                                        style={{ maxWidth: '150px', margin: '0 auto', cursor: "pointer" }}
                                        onClick={() => handleOnclickSong(encryptedId)}
                                    >
                                        {song.title}
                                    </div>

                                    {/* Tên nghệ sĩ */}
                                    <small id='artist__name' className="artist fw-light text-muted text-capitalize d-block line-count-1">
                                        {song.artist}
                                    </small>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default TrendingList;
