import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fetchTrendingSongs } from "../api/api";
import faker from "../assets/images/artists/faker.jpg";

// Import tất cả các ảnh từ thư mục 'songs'
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm để lấy ảnh bài hát từ thư mục cục bộ (nếu có)
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const TrendingList = () => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('spotifyToken');

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const data = await fetchTrendingSongs(accessToken);
                setSongs(data); // Lưu danh sách bài hát từ API
            } catch (err) {
                setError("Không tải được danh sách nhạc");
            } finally {
                setLoading(false);
            }
        };
        if (accessToken) {
            loadSongs();
        }
    }, [accessToken]);

    if (loading) {
        return <div>Đang tải danh sách nhạc...</div>;
    }
    
    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <Swiper spaceBetween={30} slidesPerView={5} loop={true}>
            {songs.map((album) => {
                const coverImageUrl = album.images?.[0]?.url || faker; // Lấy ảnh đầu tiên của album hoặc ảnh mặc định
                const albumName = album.name;
                const artistName = album.artists.map(artist => artist.name).join(', ');
                const spotifyUrl = album.external_urls.spotify; // Link tới Spotify

                return (
                    <SwiperSlide key={album.id}>
                        <li className="col">
                            <div className="card-trending">
                                <div className="card-body">
                                    <img
                                        src={coverImageUrl}
                                        className="mb-3 img-fluid rounded-3"
                                        alt={albumName}
                                    />
                                    <a
                                        href={spotifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="title text-capitalize line-count-1 h5 d-block"
                                    >
                                        {albumName}
                                    </a>
                                    <small className="artist fw-normal text-capitalize line-count-1">
                                        {artistName}
                                    </small>
                                </div>
                            </div>
                        </li>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default TrendingList;
