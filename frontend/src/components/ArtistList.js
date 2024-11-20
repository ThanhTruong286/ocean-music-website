import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import faker from "../assets/images/artists/faker.jpg";
import { fetchArtists } from '../api/api';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

// Hàm lấy hình ảnh của nghệ sĩ hoặc trả về ảnh mặc định
const images = require.context('../assets/images/artists', false, /\.(jpg|jpeg|png|gif)$/);
const getArtistImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const SECRET_KEY = 'MIKASA';

const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
};

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Dùng useNavigate để điều hướng

    const handleOnclickArtist = (encryptedId) => {
        navigate(`/artist/${encryptedId}`);
    }

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await fetchArtists();
                setArtists(data);
                console.log(data);
            } catch (err) {
                setError('Không thể tải danh sách nghệ sĩ');
            } finally {
                setLoading(false);
            }
        };
        loadArtists();
    }, []);

    if (loading) {
        return <div>Đang tải danh sách nghệ sĩ...</div>;
    }
    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className="artist-list">
            <Swiper
                spaceBetween={20}
                slidesPerView={5}
                loop={true}
            >
                {artists.map((artist) => {
                    const artistImage = getArtistImage(artist.profile_url);
                    const decryptId = encryptId(artist.artist_id);
                    return (
                        <SwiperSlide key={artist.artist_id}>
                            <div className="swiper-slide card">
                                <div className="card-body text-center p-3">
                                    {/* Hình ảnh nghệ sĩ */}
                                    <div className="image-container mb-3">
                                        <img
                                            src={artistImage}
                                            className="mb-3 img-fluid rounded-3"
                                            alt={artist.username}
                                        />
                                    </div>

                                    {/* Tên nghệ sĩ */}
                                    <a
                                        className="title text-capitalize line-count-1 h6 d-block text-truncate"
                                        style={{ maxWidth: '150px', margin: '0 auto', cursor: "pointer" }}
                                        onClick={() => handleOnclickArtist(decryptId)}
                                    >
                                        {artist.username}
                                    </a>
                                    <small
                                        className="fw-light text-muted text-capitalize d-block"
                                        style={{
                                            maxWidth: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            margin: '0 auto'
                                        }}
                                    >
                                        {artist.bio || 'Nghệ sĩ không có tiểu sử'}
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

export default ArtistList;
