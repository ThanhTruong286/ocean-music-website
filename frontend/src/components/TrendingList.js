import faker from "../assets/images/artists/faker.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { fetchingSongs } from "../api/api";
import React, { useEffect, useState } from 'react';

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
            slidesPerView={6}
            onSlideChange={() => console.log('slide change')}
        >
            {songs.map((song) => {
                return (
                    <SwiperSlide key={song.song_id}>
                        <li className="col">
                            <div className="card">
                                <div className="card-body">
                                    <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                    <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">{song.title}</a>
                                    <small className="fw-normal text-capitalize line-count-1">genre: {song.genre} </small>
                                </div>
                            </div>
                        </li>
                    </SwiperSlide>)
            })}
        </Swiper>
    )
}
export default TrendingList