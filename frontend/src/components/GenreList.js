import faker from "../assets/images/artists/faker.jpg";
import { fetchTopGenres } from '../api/api'; // Đảm bảo bạn sử dụng hàm fetchGenres đúng
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('spotifyToken');

    // Hàm gọi API lấy danh sách thể loại
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchTopGenres(accessToken); // Gọi API để lấy danh sách thể loại nhạc
                setGenres(data); // Cập nhật danh sách genres
            } catch (err) {
                setError('Không thể tải danh sách thể loại');
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            loadGenres();
        }
    }, [accessToken]);

    // Nếu đang tải
    if (loading) {
        return <div>Đang tải...</div>;
    }

    // Nếu có lỗi
    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <Swiper
            spaceBetween={30}  // Giảm khoảng cách giữa các slides
            slidesPerView={5}  // Hiển thị 5 slides cùng lúc
            loop={true} // Để Swiper lặp lại các slides
        >
            {genres.map((genre, index) => (
                <SwiperSlide key={index}> {/* Đảm bảo mỗi slide có key duy nhất */}
                    <li className="swiper-slide mb-3">
                        <img
                            src={faker}  // Sử dụng hình ảnh mặc định cho thể loại (có thể thêm ảnh thể loại nếu có)
                            id="genre-image"
                            className="mb-3 img-fluid rounded-3"
                            alt={genre}
                        />
                        <a
                            href={`#${genre}`} // Tạo liên kết đến thể loại
                            className="text-capitalize line-count-1 h5 d-block overflow-hidden text-overflow-ellipsis"
                            style={{
                                display: 'block',
                                maxWidth: '100%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {genre}
                        </a>
                        <small className="fw-normal text-capitalize line-count-1">
                            Top 12 songs in {genre} {/* Giới thiệu thông tin thêm về thể loại */}
                        </small>
                    </li>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GenreList;
