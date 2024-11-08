import faker from "../assets/images/artists/faker.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fetchingSongs } from "../api/api";
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

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
    const [songs, setSong] = useState([]);
    const [errors, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSong = async () => {
            try {
                const data = await fetchingSongs();
                setSong(data);
            } catch (err) {
                setError("Không tải được danh sách nhạc");
            } finally {
                setLoading(false);
            }
        };
        loadSong();
    }, []);

    if (loading) {
        return <div>Đang tải danh sách nhạc...</div>;
    } else if (errors) {
        return <div>Lỗi: {errors}</div>;
    }

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={5}
            loop={true}
        >
            {songs.map((song) => {
                const songImage = getSongImage(song.coverImageUrl);
                const encryptedId = encryptId(song.id); // Encrypt the song ID
                return (
                    <SwiperSlide key={song.id}>
                        <li className="col">
                            <div className="card-trending">
                                <div className="card-body">
                                    <img src={songImage} className="mb-3 img-fluid rounded-3" alt="song-img" />
                                    <a
                                        href={`/song-detail/${encryptedId}`}
                                        className="title text-capitalize line-count-1 h5 d-block"
                                    >
                                        {song.title}
                                    </a>
                                    <small className="artist fw-normal text-capitalize line-count-1">{song.artist}</small>
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
