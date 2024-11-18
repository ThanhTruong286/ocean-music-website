import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/artist.scss';
import { fetchArtists } from "../api/api";
import faker from "../assets/images/artists/faker.jpg";

// Load all images from the songs folder
const images = require.context('../assets/images/profiles', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const ArtistDetail = () => {
    const [artist, setArtist] = useState(null);
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArtist = async () => {
            try {
                const response = await fetchArtists();
                setArtist(response); // Giả sử API trả về dữ liệu nghệ sĩ
                console.log(response); // Bạn có thể kiểm tra cấu trúc dữ liệu ở đây
            } catch (error) {
                setError("Error loading artist");
            } finally {
                setLoading(false);
            }
        };
        loadArtist();
    }, []);

    if (err) {
        return <div>{err}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // Cấu trúc dữ liệu giả định cho bài hát của nghệ sĩ này
    const songs = [
        {
            title: "Cruel Summer",
            plays: "2,600,974,388",
            duration: "2:58",
            image: "https://storage.googleapis.com/a1aa/image/LbUSIalx4apuNFZL89csedE5ZbbrDePp8VwXby3B4ViDAPyTA.jpg"
        },
        {
            title: "Fortnight (feat. Post)",
            plays: "732,885,479",
            duration: "3:48",
            image: "https://storage.googleapis.com/a1aa/image/fxYl30Wgm5RqXqV4Gu3xhoSEawxw0wFe7fXBw4N89wKKAeIPB.jpg"
        },
        {
            title: "I Can Do It With a B",
            plays: "512,099,995",
            duration: "3:38",
            image: "https://storage.googleapis.com/a1aa/image/yJiInaWZcJopCJ7CkxnnTatpYYfhNhtRBTuzbZROFscBgH5JA.jpg"
        },
        {
            title: "august",
            plays: "1,304,566,094",
            duration: "4:21",
            image: "https://storage.googleapis.com/a1aa/image/K2280JEGtSqVPx4hbwfSOEnnLfOfsgvWl6zulG40p9RAAeIPB.jpg"
        }
    ];

    return (
        <div className="artist-detail">
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="artist-detail__content container-fluid" id="page_layout">
                        <div className="artist-detail__header">
                            <div className="artist-detail__verified">
                                <i className="fas fa-check-circle"></i>
                                <span>Verified Artist</span>
                            </div>
                            <h1 className="artist-detail__name">Taylor Swift</h1>
                            <div className="artist-detail__listeners">
                                90,370,250 monthly listeners
                            </div>
                        </div>
                        <div className="artist-detail__content-section">
                            <div className="artist-detail__actions">
                                <button className="artist-detail__play-button">
                                    <i className="fas fa-play"></i>
                                </button>
                                <button className="artist-detail__follow-button">
                                    Follow
                                </button>
                                <i className="fas fa-ellipsis-h artist-detail__more-options"></i>
                            </div>
                            <div className="artist-detail__section-title">Popular Songs</div>
                            <div className="artist-detail__popular-songs">
                                {songs.map((song, index) => (
                                    <div className="artist-detail__song" key={index}>
                                        <img alt={song.title} height="50" src={song.image} width="50" />
                                        <div className="artist-detail__song-details">
                                            <span className="artist-detail__song-title">{song.title}</span>
                                            <span className="artist-detail__song-plays">{song.plays}</span>
                                        </div>
                                        <span className="artist-detail__song-duration">{song.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ArtistDetail;
