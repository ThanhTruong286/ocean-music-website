import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/global.scss";
import faker from "../assets/images/artists/faker.jpg";
import { useEffect, useState } from "react";
import { getSong } from "../api/api";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const formatLyrics = (lyrics) => {
    // Regular expression to split text by common punctuation marks, keeping punctuation as separate elements.
    const sentences = lyrics.split(/([.!?]+)/).filter(Boolean); // Split by punctuation (., ?, !)

    // Map through the sentences and add <br /> after each sentence.
    return sentences.map((sentence, index) => (
        <span key={index}>
            {sentence.trim()} {/* Trim extra spaces */}
            <br />
        </span>
    ));
};

const SongDetail = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Function to decrypt the encrypted id
    const decryptId = (encryptedId) => {
        const decoded = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decoded, "MIKASA");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    useEffect(() => {
        const loadSong = async () => {
            try {
                const decryptedId = decryptId(id); // Decrypt the captured id
                const response = await getSong(decryptedId); // Fetch song details using the decrypted id
                setSong(response);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            loadSong();
        }
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading ...</div>;
    }
    const songImage = getSongImage(song.coverImageUrl);
    const formattedLyrics = formatLyrics(song.lyric);
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
                                                        <h3 className="mb-3">{song.title}</h3>
                                                        <p className="mb-3">{formattedLyrics}</p>
                                                        <div className="d-flex align-items-center mb-4">
                                                            <h6 className="mb-1 fw-bold me-3">{song.artist}</h6>
                                                            <h6 className="ps-3 fw-bold me-3 border-start">15 Tracks</h6>
                                                            <h6 className="ps-3 fw-bold border-start">{song.duration}s</h6>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <a href="javascript:void(0);" className="play-btn btn btn-primary">Play music</a>
                                                            <a href="javascript:void(0);" className="add-playlist-btn btn btn-outline-secondary ms-3">Add Playlist</a>
                                                            <a href="javascript:void(0);" className="add-playlist-btn btn btn-outline-secondary ms-3">Share</a>
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
                </div >
            </main>
            <Footer />
        </div>
    )
}
export default SongDetail