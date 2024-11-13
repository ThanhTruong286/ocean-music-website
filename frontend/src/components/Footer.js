import "../styles/global.scss";
import faker from "../assets/images/artists/faker.jpg";
import { useEffect, useState, useRef } from "react";
import { getSong } from "../api/api";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

// Load all images from the songs folder
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const Footer = () => {
    const audioRef = useRef(null);
    const currentTrack = localStorage.getItem('currentTrack');
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);  // Mặc định âm lượng là 50%

    // Giải mã ID bài hát từ URL
    const decryptId = (encryptedId) => {
        const decoded = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decoded, "MIKASA");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    useEffect(() => {
        const loadSong = async () => {
            try {
                const decryptedId = decryptId(currentTrack); // Giải mã id
                const response = await getSong(decryptedId); // Lấy thông tin bài hát
                setSong(response);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (currentTrack) {
            loadSong();
        }
    }, [currentTrack]);

    const songImage = getSongImage(song?.coverImageUrl);

    // Định dạng thời gian
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    // Xử lý khi bài hát được phát hoặc tạm dừng
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying); // Đổi trạng thái play/pause
    };

    // Cập nhật thời gian bài hát đang phát
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    // Lấy thông tin về thời gian khi bài hát được tải
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    // Thay đổi tiến trình bài hát khi người dùng kéo thanh điều khiển
    const handleProgressChange = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value;
        setCurrentTime(value); // Cập nhật thời gian
    };

    // Thay đổi âm lượng
    const handleVolumeChange = (e) => {
        const volumeValue = e.target.value / 100; // Chuyển âm lượng thành giá trị từ 0 đến 1
        audioRef.current.volume = volumeValue;
        setVolume(e.target.value); // Cập nhật âm lượng
    };


    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi khi tải bài hát</div>;
    }

    return (
        <footer className="footer">
            <div className="player-container">
                <div className="track-art">
                    <img src={songImage} alt={song?.title || "Bài hát mặc định"} />
                </div>
                <div className="song-info">
                    <div className="title">{song?.title}</div>
                    <div className="artist">{song?.artist}</div>
                </div>

                {/* Audio player */}
                <audio
                    ref={audioRef}
                    src={song?.fileUrl ? require(`../assets/audios/${song?.fileUrl}`) : ""}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={() => console.error("Audio source not supported")}
                    autoPlay={isPlaying}
                />

                {/* Controls */}
                <div className="controls">
                    <i className="fas fa-step-backward"></i>
                    <div className="play-button" onClick={togglePlayPause}>
                        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </div>
                    <i className="fas fa-step-forward"></i>
                </div>

                {/* Progress bar */}
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

                {/* Time display */}
                <div className="time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Volume control */}
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

                {/* Extra controls (optional) */}
                <div className="extra-controls">
                    <i className="fas fa-list"></i>
                    <i className="fas fa-expand"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
