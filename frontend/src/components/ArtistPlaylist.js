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
            <Swiper spaceBetween={30} slidesPerView={4} onSlideChange={() => console.log('slide change')}>
                {artistPlaylists.map((artist) => {
                    const playlistImage = getArtistImage(artist.image);
                    return (
                        <SwiperSlide key={artist.playlist_id}>
                            <div className="artist-card">
                                <div className="bg-soft-danger position-relative rounded-3 card-box mb-3">
                                    <img
                                        src={playlistImage}
                                        id="artist-playlist"
                                        className="img-fluid mx-auto d-block"
                                        alt="play-img"
                                    />
                                </div>
                                <a href="../dashboard/music-player.html" className="text-capitalize h5">{artist.title}</a>
                                <small className="fw-normal line-count-1 text-capitalize">
                                    <span>By </span>
                                    <span style={{ color: 'red', fontSize:"14px" }}><b>{artist.first_name || 'Nickname'} {artist.last_name}</b></span>
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
