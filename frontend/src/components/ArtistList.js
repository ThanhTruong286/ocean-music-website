import faker from "../assets/images/artists/faker.jpg";
import { fetchArtists } from '../api/api';
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await fetchArtists(); // Gọi hàm fetchArtists
                setArtists(data); // Cập nhật danh sách artist
            } catch (err) {
                setError('Không thể tải danh sách artist');
            } finally {
                setLoading(false);
            }
        };

        loadArtists();
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
            onSwiper={(swiper) => console.log(swiper)}
        >
            {artists.map((artist) => {
                return (
                    <SwiperSlide key={artist.artist_id}>
                        <li
                            className="swiper-slide mb-3 swiper-slide-active"
                            role="group"
                            aria-label="3 / 7"
                            style={{ width: '192.2px', marginRight: '20px' }}
                            data-swiper-slide-index="2"
                        >
                            <img src={faker} className="img-fluid rounded-3 mb-3" alt="Artist" />
                            <a href="#" className="text-capitalize text-center h5 d-block">{artist.username}</a> {/* Thay user_id bằng username */}
                            <small className="fw-normal text-capitalize text-center d-block">{artist.username}</small>
                        </li>
                    </SwiperSlide>
                )
            })}

        </Swiper>
    )
}
export default ArtistList