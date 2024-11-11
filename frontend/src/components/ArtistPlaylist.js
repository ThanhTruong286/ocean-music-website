import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import peanut from "../assets/images/artists/peanut.jpg"; // Hình ảnh mặc định
import { fetchPlaylists } from '../api/api'; // Import hàm API mới

const ArtistPlaylist = () => {
    const [playlists, setPlaylists] = useState([]); // Lưu danh sách playlist
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('spotifyToken');  // Lấy access token từ localStorage

    // Hàm gọi API để lấy danh sách playlist
    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const data = await fetchPlaylists(accessToken);

                setPlaylists(data); // Lưu danh sách playlist
            } catch (err) {
                setError('Không tải được danh sách playlist');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            loadPlaylists();
        }
    }, [accessToken]);

    // Hàm lấy ảnh playlist nếu có, nếu không sẽ dùng ảnh mặc định
    const getPlaylistImage = (images) => {
        return images?.[0]?.url || peanut;
    };

    if (loading) {
        return <div>Đang tải danh sách playlist...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <Swiper spaceBetween={10} slidesPerView={5} loop={true}>
            {playlists.map((playlist, index) => {
                const playlistImage = getPlaylistImage(playlist.images);
                const playlistName = playlist.name;
                const playlistOwner = playlist.owner.display_name;
                const spotifyUrl = playlist.external_urls.spotify;

                return (
                    <SwiperSlide key={index}>
                        <li className="swiper-slide card card-slide" role="group">
                            <div className="card-body">
                                <img src={playlistImage} className="mb-3 img-fluid rounded-3" alt={playlistName} />

                                {/* Tên playlist */}
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
                                    {playlistName}
                                </a>

                                {/* Tên chủ sở hữu playlist */}
                                <small
                                    className="fw-normal text-capitalize"
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block'
                                    }}
                                >
                                    {playlistOwner}
                                </small>
                            </div>
                        </li>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default ArtistPlaylist;
