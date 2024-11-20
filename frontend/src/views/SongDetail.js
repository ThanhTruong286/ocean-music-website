import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/global.scss";
import faker from "../assets/images/artists/faker.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import AddToPlaylistPopup from "../components/PlaylistPopup";
import { getAllUserPlaylist, getSong, addSongToPlaylist } from "../api/api";
import Swal from "sweetalert2";

const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const formatLyrics = (lyrics) => {
    const sentences = lyrics.split(/([.!?]+)/).filter(Boolean);
    return sentences.map((sentence, index) => (
        <span key={index}>
            {sentence.trim()}
            <br />
        </span>
    ));
};

const SongDetail = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [audio] = useState(new Audio()); // Create a new Audio instance for playback

    // Giải mã ID bài hát
    const decryptId = (encryptedId) => {
        const decoded = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decoded, 'MIKASA');
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const handleOnclickSong = (encryptedId) => {
        const currentId = localStorage.getItem('currentTrack');
        if (!currentId || currentId !== encryptedId) {
            localStorage.setItem('currentTrack', encryptedId);  // Lưu bài hát vào localStorage
        }
        const event = new Event("trackUpdated");
        window.dispatchEvent(event);
    }

    useEffect(() => {
        const loadSong = async () => {
            try {
                const decryptedId = decryptId(id);
                const response = await getSong(decryptedId);
                setSong(response);
                audio.src = response.url;  // Set the audio source to the song URL
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        const loadUserPlaylists = async () => {
            try {
                const userPlaylists = await getAllUserPlaylist();
                setPlaylists(userPlaylists);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        if (id) {
            loadSong();
            loadUserPlaylists();
        }

        // Clean up the audio when the component unmounts
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [id, audio]);

    const handleAddPlaylistClick = () => {
        setShowPopup(true);
    };

    const handleAddToPlaylist = async (playlistId) => {
        try {
            const decryptedSongId = decryptId(id); // Giải mã song ID
            await addSongToPlaylist(playlistId, decryptedSongId);
            Swal.fire({
                title: "Thêm bài hát vào playlist thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            Swal.fire({
                title: "Error",
                text: "Có lỗi xảy ra khi thêm bài hát vào playlist",
                icon: "error",
                confirmButtonText: "Retry",
            });
        } finally {
            setShowPopup(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading song data</div>;

    const songImage = getSongImage(song.coverImageUrl);
    const formattedLyrics = formatLyrics(song.lyric);

    // Tạo link chia sẻ
    const createShareLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            Swal.fire({
                title: "Copy link chia sẻ thành công",
                text: `Link: ${currentUrl}`,
                icon: "success",
                confirmButtonText: "OK",
            });
        }).catch((err) => {
            console.error("Failed to copy link: ", err);
        });
    };

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="song-detail">
                    <Header />
                    <div className="content-inner pb-0 container-fluid" id="page_layout">
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="card mb-0 bg-soft-secondary">
                                                    <img src={songImage} className="img-fluid w-100" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="d-flex align-items-top justify-content-between">
                                                    <div className="music-detail">
                                                        <h3 className="mb-3">Bài hát: {song.title}</h3>
                                                        <p className="mb-3">{formattedLyrics}</p>
                                                        <div className="d-flex align-items-center mb-4">
                                                            <h6 className="mb-1 fw-bold me-3">Tác giả: {song.artist}</h6>
                                                            <h6 className="ps-3 fw-bold me-3 border-start">15 Tracks</h6>
                                                            <h6 className="ps-3 fw-bold border-start">{song.duration}s</h6>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <button onClick={() => handleOnclickSong(id)} className="play-btn btn btn-danger">
                                                                Phát Nhạc
                                                            </button>
                                                            <button onClick={handleAddPlaylistClick} className="share-btn btn btn-outline-secondary ms-3">Thêm Vào Playlist</button>
                                                            <button
                                                                onClick={createShareLink}
                                                                className="share-btn btn btn-outline-secondary ms-3"
                                                            >
                                                                Chia Sẻ
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            {showPopup && (
                <AddToPlaylistPopup
                    playlists={playlists || []}
                    onClose={() => setShowPopup(false)}
                    onAddToPlaylist={handleAddToPlaylist}
                />
            )}
            <Footer />
        </div>
    );
};

export default SongDetail;
