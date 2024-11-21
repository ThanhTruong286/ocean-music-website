import { fetchGenres } from '../api/api';
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchGenres(); // Gọi hàm fetchArtists
                setGenres(data); // Cập nhật danh sách artist
            } catch (err) {
                setError('Không thể tải danh sách artist');
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }
    return (
        <Swiper
            spaceBetween={30}  // Giảm khoảng cách giữa các slides
            slidesPerView={5}  // Hiển thị 5 slides cùng lúc
            onSlideChange={() => console.log('slide change')}
        >
            {genres.map((genre) => (
                <SwiperSlide key={genre.genre_id}> {/* Đặt mỗi artist vào một SwiperSlide */}
                    <li className="swiper-slide mb-3 swiper-slide-duplicate">
                        <img src={faker} id="26" className="mb-3 img-fluid rounded-3" alt="song-img" />
                        <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">{genre.name}</a>
                        <small className="fw-normal text-capitalize line-count-1">top 12
                            songs from travels and</small>
                    </li>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default GenreList