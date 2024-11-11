import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import peanut from "../assets/images/artists/peanut.jpg"; // Hình ảnh mặc định
import { fetchEpisodes } from '../api/api'; // Import hàm API mới

const TrendingEpisodes = () => {
    const [episodes, setEpisodes] = useState([]); // Lưu các episodes
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('spotifyToken'); // Lấy access token từ localStorage

    // Hàm gọi API để lấy danh sách episodes
    useEffect(() => {
        const loadEpisodes = async () => {
            try {
                const data = await fetchEpisodes(accessToken);

                // Loại bỏ các episodes trùng lặp (nếu có)
                const uniqueEpisodes = data.filter(
                    (item, index, self) => index === self.findIndex(t => t.id === item.id)
                );

                setEpisodes(uniqueEpisodes); // Lưu danh sách episodes
            } catch (err) {
                setError('Không tải được danh sách episodes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            loadEpisodes();
        }
    }, [accessToken]);

    // Hàm lấy ảnh episode nếu có, nếu không sẽ dùng ảnh mặc định
    const getEpisodeImage = (images) => {
        return images?.[0]?.url || peanut;
    };

    if (loading) {
        return <div>Đang tải danh sách episodes...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    if (episodes.length === 0) {
        return <div>Không có episodes nào để hiển thị.</div>;
    }

    return (
        <Swiper spaceBetween={10} slidesPerView={5} loop={true}>
            {episodes.map((item, index) => {
                const episode = item;
                const episodeImage = getEpisodeImage(episode?.images);
                const episodeName = episode?.name || 'Unknown Episode';
                const showName = episode?.show?.name || 'Unknown Show';
                const spotifyUrl = episode?.external_urls?.spotify; // Sử dụng optional chaining

                return (
                    <SwiperSlide key={index}>
                        <li className="swiper-slide card card-slide" role="group">
                            <div className="card-body">
                                <img
                                    src={episodeImage}
                                    className="mb-3 img-fluid rounded-3"
                                    alt={episodeName}
                                />

                                {/* Tên Episode */}
                                <a
                                    href={spotifyUrl || '#'} // Đảm bảo link tồn tại
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
                                    {episodeName}
                                </a>

                                {/* Tên Show */}
                                <small
                                    className="fw-normal text-capitalize"
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block'
                                    }}
                                >
                                    {showName}
                                </small>
                            </div>
                        </li>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default TrendingEpisodes;
