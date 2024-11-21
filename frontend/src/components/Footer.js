import { useEffect, useState, useRef } from "react";
import { getSong } from "../api/api";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import "../styles/footer.scss";

const Footer = () => {
    const audioRef = useRef(null);
    const currentTrack = localStorage.getItem("currentTrack");
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const navigate = useNavigate();

    // Giải mã ID bài hát
    const decryptId = (encryptedId) => {
        if (!encryptedId) return null;
        try {
            const decoded = decodeURIComponent(encryptedId);
            const bytes = CryptoJS.AES.decrypt(decoded, 'MIKASA');
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Decrypt error:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadSong = async () => {
            const updatedTrack = localStorage.getItem("currentTrack");
            if (!updatedTrack) {
                setLoading(false);
                return;
            }

            try {
                const decryptedId = decryptId(updatedTrack);
                if (!decryptedId) throw new Error("Invalid ID");

                const response = await getSong(decryptedId);
                setSong(response);

                if (audioRef.current) {
                    audioRef.current.pause(); // Dừng bài hát cũ
                    audioRef.current.currentTime = 0; // Reset thời gian
                    audioRef.current.load(); // Tải lại audio
                }

                setIsPlaying(false); // Để người dùng tự phát nhạc
            } catch (error) {
                setError(true);
                console.error("Failed to load song:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSong();
    }, [currentTrack]); // Lắng nghe sự thay đổi của currentTrack

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
            localStorage.setItem("audioIsPlaying", !isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            setCurrentTime(current);
            localStorage.setItem("audioCurrentTime", current);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (e) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
            localStorage.setItem("audioCurrentTime", value);
        }
    };

    const handleVolumeChange = (e) => {
        const volumeValue = parseInt(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = volumeValue / 100;
            setVolume(volumeValue);
            localStorage.setItem("audioVolume", volumeValue);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        localStorage.setItem("audioIsPlaying", "false");
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Thay đổi này sẽ lấy hình ảnh từ server thay vì từ thư mục local
    const songImage = song?.coverImageUrl ? `http://localhost:5000/assets/images/songs/${song.coverImageUrl}` : "";

    // Thay đổi này sẽ lấy file âm thanh từ server thay vì từ thư mục local
    const songAudio = song?.fileUrl ? `http://localhost:5000/assets/audios/${song.fileUrl}` : "";

    const handleOnclickSong = () => {
        if (currentTrack) {
            navigate(`/song-detail/${currentTrack}`);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi khi tải bài hát</div>;

    return (
        <footer className="footer">
            <div className="player-container">
                <div className="track-art">
                    <img src={songImage} alt={song?.title || "Bài hát"} />
                </div>
                <div className="song-info">
                    <div className="title">{song?.title}</div>
                    <div className="artist">{song?.artist}</div>
                </div>

                <audio
                    id="footer-audio"
                    ref={audioRef}
                    src={songAudio} // Lấy file từ server
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    autoPlay={false}
                />

                {/* Controls */}
                <div className="controls">
                    <i className="fas fa-step-backward"></i>
                    <div className="play-button" onClick={togglePlayPause}>
                        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </div>
                    <i className="fas fa-step-forward"></i>
                </div>

                <div className="progress-container">
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="progress-bar"
                    />
                </div>

                <div className="time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                <div className="volume-container">
                    <i className="fas fa-volume-up"></i>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>

                <div className="extra-controls">
                    <i className="fas fa-expand" onClick={handleOnclickSong}></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
