import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/songDetail.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import AddToPlaylistPopup from "../components/PlaylistPopup";
import { getAllUserPlaylist, getSong, addSongToPlaylist } from "../api/api";
import Swal from "sweetalert2";

const API_URL = 'http://localhost:5000';

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    // Trả về URL hình ảnh từ backend nếu có, nếu không thì dùng ảnh fallback
    return imageName ? `${API_URL}/assets/images/songs/${imageName}` : null;
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

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">Error loading song data</div>;

    const songImage = getSongImage(song.coverImageUrl);
    const formattedLyrics = formatLyrics(song.lyric);

    // Tạo link chia sẻ
    const createShareLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            Swal.fire({
                title: "Copy link chia sẻ thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
        }).catch((err) => {
            console.error("Failed to copy link: ", err);
        });
    };

    return (
        <div className="song-detail-page">
            <aside className="sidebar sidebar-base">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div className="song-detail-content">
                    <Header />
                    <div className="content-inner">
                        <div className="song-detail-card">
                            <div className="song-detail-body">
                                <div className="song-info">
                                    <div className="song-image">
                                        <img src={songImage} className="img-fluid rounded" alt="Song Cover" />
                                    </div>
                                    <div className="song-description">
                                        <h3 className="song-title">{song.title}</h3>
                                        <p className="song-lyrics">{formattedLyrics}</p>
                                        <div className="song-meta">
                                            <span className="artist">{song.artist}</span>
                                        </div>
                                        <div className="song-actions">
                                            <button onClick={() => handleOnclickSong(id)} className="play-btn">Phát Nhạc</button>
                                            <button onClick={handleAddPlaylistClick} className="add-to-playlist-btn">Thêm vào Playlist</button>
                                            <button onClick={createShareLink} className="share-btn">Chia sẻ</button>
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
