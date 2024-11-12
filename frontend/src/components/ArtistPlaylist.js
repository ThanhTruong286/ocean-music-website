import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../api/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import peanut from "../assets/images/artists/peanut.jpg";

// Load all images from the playlists folder
const images = require.context('../assets/images/playlists', false, /\.(jpg|jpeg|png|gif)$/);

const getArtistImage = (imageName) => {
    // Check if the image exists in the context keys, else use peanut as default
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : peanut;
};

const ArtistPlaylist = () => {
    const [artistPlaylists, setArtistPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await fetchPlaylists();
                setArtistPlaylists(data);
            } catch (err) {
                setError('Không thể tải danh sách playlists');
            } finally {
                setLoading(false);
            }
        };
        loadArtists();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className="artist-list">
            <Swiper spaceBetween={20} slidesPerView={5} loop={true}>
                {artistPlaylists.map((artist) => {
                    const playlistImage = getArtistImage(artist.image);

                    return (
                        <SwiperSlide key={artist.playlist_id}>
                            <li className="swiper-slide card card-slide" role="group">
                                <div className="card-body">
                                    {/* Hình ảnh playlist */}
                                    <img
                                        src={playlistImage}
                                        className="mb-3 img-fluid rounded-3"
                                        alt={artist.title || 'Playlist Image'}
                                    />

                                    {/* Tên Playlist */}
                                    <a
                                        href="../dashboard/music-player.html"
                                        className="text-capitalize line-count-1 h5 d-block"
                                        style={{
                                            marginTop: "10px",
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {artist.title}
                                    </a>

                                    {/* Tên nghệ sĩ */}
                                    <small className="fw-normal line-count-1 text-capitalize">
                                        <span>By </span>
                                        <span style={{ color: 'red', fontSize: '14px' }}>
                                            <b>{artist.first_name || 'Unknown'} {artist.last_name || ''}</b>
                                        </span>
                                    </small>
                                </div>
                            </li>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default ArtistPlaylist;
