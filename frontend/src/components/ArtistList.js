import bin from "../assets/images/artists/bin.jpg";
import guma from "../assets/images/artists/gumayusi.jpg";
import peanut from "../assets/images/artists/peanut.jpg";
import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../api/api';
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
        <div className="artist-list">
            <Swiper
                spaceBetween={30}  // Giảm khoảng cách giữa các slides
                slidesPerView={5}  // Hiển thị 5 slides cùng lúc
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {artists.map((artist) => (
                    <SwiperSlide key={artist.artist_id}> {/* Đặt mỗi artist vào một SwiperSlide */}
                        <div className="artist-card"> {/* Thêm class name cho từng khối */}
                            <div className="bg-soft-danger position-relative rounded-3 card-box mb-3">
                                <img
                                    src={artist.image || peanut}
                                    id="artist-playlist"
                                    className="img-fluid mx-auto d-block"
                                    alt="play-img"
                                />
                            </div>
                            <a href="../dashboard/music-player.html" className="text-capitalize h5">{artist.name}</a>
                            <small className="fw-normal line-count-1 text-capitalize">
                                <b style={{ color: artist.color || '#F05A22' }}>{artist.tag || 'Tag'}</b> {artist.bio || 'Nickname'}
                            </small>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ArtistList;
