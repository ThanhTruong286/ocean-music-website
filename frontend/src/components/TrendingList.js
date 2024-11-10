import faker from "../assets/images/artists/faker.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { fetchingSongs } from "../api/api";
import React, { useEffect, useState } from 'react';

const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

const getSongImage = (imageName) => {
    // Check if the image exists in the context keys, else use peanut as default
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
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
        }
        loadSong();
    }, []);
    if (loading) {
        return <div>Đang tải danh sách nhạc</div>
    }
    else if (errors) {
        return <div>Lỗi: {errors}</div>
    }
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={5}
            loop={true}
        >
            {songs.map((song) => {
                const songImage = getSongImage(song.coverImageUrl);
                return (
                    <SwiperSlide key={song.id}>
                        <li className="col">
                            <div className="card-trending">
                                <div className="card-body">
                                    <img src={songImage} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                    <a href="../dashboard/music-player.html" className="title text-capitalize line-count-1 h5 d-block">{song.title}</a>
                                    <small className="artist fw-normal text-capitalize line-count-1">{song.artist} </small>
                                </div>
                            </div>
                        </li>
                    </SwiperSlide>)
            })}
        </Swiper>
    )
}
export default TrendingList