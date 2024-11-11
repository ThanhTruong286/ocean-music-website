import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import peanut from "../assets/images/artists/peanut.jpg"; // Hình ảnh mặc định
import { fetchFollowingArtists } from '../api/api'; // Hàm gọi API mới

const FollowingArtists = () => {
    const [followingArtists, setFollowingArtists] = useState([]); // Lưu danh sách nghệ sĩ đang theo dõi
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('spotifyToken');  // Lấy access token từ localStorage
    const [numOfArtists, setNumOfArtists] = useState(0);

    // Hàm gọi API để lấy danh sách nghệ sĩ đang theo dõi
    useEffect(() => {
        const loadFollowingArtists = async () => {
            try {
                const response = await fetchFollowingArtists(accessToken);

                // Kiểm tra và xử lý dữ liệu trả về
                if (response && response.artists.items && response.artists.items.length > 0) { // Kiểm tra nếu 'items' có dữ liệu
                    setFollowingArtists(response.artists.items); // Lưu danh sách nghệ sĩ đang theo dõi
                    setNumOfArtists(response.artists.items.length);
                } else {
                    setError('Không có nghệ sĩ đang theo dõi.');
                }
            } catch (err) {
                setError('Không tải được danh sách nghệ sĩ đang theo dõi');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            loadFollowingArtists();
        }
    }, [accessToken]);

    // Hàm lấy ảnh nghệ sĩ nếu có, nếu không sẽ dùng ảnh mặc định
    const getArtistImage = (images) => {
        return images?.[0]?.url || peanut; // Nếu không có ảnh, dùng ảnh mặc định
    };

    if (loading) {
        return <div>Đang tải danh sách nghệ sĩ đang theo dõi...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }
    if (numOfArtists > 5) {
        setNumOfArtists(5);
    }
    return (
        <Swiper spaceBetween={10} slidesPerView={numOfArtists} loop={true}>
            {followingArtists.map((artist, index) => {
                const artistImage = getArtistImage(artist.images); // Lấy ảnh nghệ sĩ
                const artistName = artist.name;
                const spotifyUrl = artist.external_urls.spotify;

                return (
                    <SwiperSlide key={index}>
                        <li className="swiper-slide card card-slide" role="group">
                            <div className="card-body">
                                <img src={artistImage} className="mb-3 img-fluid rounded-3" alt={artistName} />

                                {/* Tên nghệ sĩ */}
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
                                    {artistName}
                                </a>
                            </div>
                        </li>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default FollowingArtists;
