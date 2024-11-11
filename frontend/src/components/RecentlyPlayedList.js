import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import peanut from "../assets/images/artists/peanut.jpg";
import { fetchRecentlyPlayed } from '../api/api';

const RecentlyPlayedList = () => {
    const [recentSongs, setRecentSongs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('spotifyToken');

    // Hàm gọi API để lấy danh sách bài hát đã nghe gần đây
    useEffect(() => {
        const loadRecentlyPlayed = async () => {
            try {
                const data = await fetchRecentlyPlayed(accessToken);

                // Loại bỏ các bài hát trùng lặp dựa trên track.id
                const uniqueSongs = data.filter(
                    (item, index, self) => index === self.findIndex(t => t.track.id === item.track.id)
                );

                setRecentSongs(uniqueSongs); // Lưu danh sách bài hát không trùng lặp
            } catch (err) {
                setError('Không tải được danh sách bài hát gần đây');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            loadRecentlyPlayed();
        }
    }, [accessToken]);

    // Hàm lấy ảnh bài hát nếu có, nếu không sẽ dùng ảnh mặc định
    const getSongImage = (images) => {
        return images?.[0]?.url || peanut;
    };

    if (loading) {
        return <div>Đang tải danh sách bài hát gần đây...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <Swiper spaceBetween={10} slidesPerView={5} loop={true}>
            {recentSongs.map((item, index) => {
                const track = item.track;
                const songImage = getSongImage(track.album.images);
                const trackName = track.name;
                const artistName = track.artists.map(artist => artist.name).join(', ');
                const spotifyUrl = track.external_urls.spotify;

                return (
                    <SwiperSlide key={index}>
                        <li className="swiper-slide card card-slide" role="group">
                            <div className="card-body">
                                <img src={songImage} className="mb-3 img-fluid rounded-3" alt={trackName} />

                                {/* Tên bài hát */}
                                <a
                                    href={spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-capitalize h5 d-block"
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block'
                                    }}
                                >
                                    {trackName}
                                </a>

                                {/* Tên nghệ sĩ */}
                                <small
                                    className="fw-normal text-capitalize"
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block'
                                    }}
                                >
                                    {artistName}
                                </small>
                            </div>
                        </li>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default RecentlyPlayedList;
