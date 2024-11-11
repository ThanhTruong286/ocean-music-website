import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../api/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import peanut from "../assets/images/artists/peanut.jpg";

// Hàm để lấy hình ảnh của playlist
const getArtistImage = (imageUrl) => {
    return imageUrl ? imageUrl : peanut;
};

const ArtistPlaylist = ({ accessToken }) => {
    const [artistPlaylists, setArtistPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const data = await fetchPlaylists(accessToken);
                setArtistPlaylists(data);
            } catch (err) {
                setError('Không thể tải danh sách playlists');
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            loadPlaylists();
        }
    }, [accessToken]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className="artist-list">
            <Swiper spaceBetween={30} slidesPerView={4}>
                {artistPlaylists.map((playlist) => {
                    const playlistImage = getArtistImage(playlist.images[0]?.url);  // Sử dụng hình ảnh playlist
                    const artistName = playlist.artists ? playlist.artists[0]?.name : "Unknown Artist";  // Lấy tên nghệ sĩ

                    return (
                        <SwiperSlide key={playlist.id}>
                            <div className="artist-card">
                                <div className="bg-soft-danger position-relative rounded-3 card-box mb-3">
                                    <img
                                        src={playlistImage}
                                        className="img-fluid mx-auto d-block"
                                        alt="playlist-img"
                                    />
                                </div>
                                <a 
                                    href={playlist.external_urls.spotify} 
                                    className="text-capitalize h5 d-block overflow-hidden text-overflow-ellipsis" 
                                    style={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {playlist.name}
                                </a>
                                <small 
                                    className="fw-normal line-count-1 text-capitalize overflow-hidden text-overflow-ellipsis" 
                                    style={{
                                        display: 'block',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    <span>By {artistName}</span>
                                </small>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default ArtistPlaylist;
