import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { getSong } from "../api/api";
import faker from "../assets/images/artists/faker.jpg";

// Load all images from the songs folder
const images = require.context('../assets/images/songs', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

// Key for AES encryption (Keep this secret and do not hardcode in production)
const SECRET_KEY = 'MIKASA';

const decryptId = (encryptedId) => {
    const decoded = decodeURIComponent(encryptedId);
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const Footer = () => {
    const audioRef = useRef(null);
    const { id } = useParams();  // Lấy id từ URL
    const [songs, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState('');

    // Lấy dữ liệu bài hát từ API
    useEffect(() => {
        const loadSong = async () => {
            try {
                const savedSongId = localStorage.getItem('currentTrack'); // Lấy ID bài hát từ localStorage
                if (!savedSongId) return;

                // Giải mã ID và lấy bài hát
                const decryptedId = decryptId(savedSongId);
                const response = await getSong(decryptedId);  // Lấy thông tin bài hát
                setSong(response);
                setCurrentTrack(decryptedId);  // Lưu ID bài hát vào currentTrack khi tải bài hát
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        // Kiểm tra nếu id trong URL không trùng với currentTrack thì tải lại bài hát
        const savedSongId = localStorage.getItem('currentTrack');
        if (id !== savedSongId) {
            setCurrentTrack(id);  // Cập nhật currentTrack nếu URL có ID khác
            localStorage.setItem('currentTrack', id);  // Lưu ID vào localStorage
        }

        loadSong();  // Gọi hàm load song
    }, [id]);

    useEffect(() => {
        // Lưu currentTrack, currentTime, và isPlaying vào localStorage mỗi khi có thay đổi
        localStorage.setItem('currentTrack', currentTrack);
        localStorage.setItem('currentTime', currentTime);
        localStorage.setItem('isPlaying', isPlaying);
    }, [currentTrack, currentTime, isPlaying]);

    useEffect(() => {
        // Lấy dữ liệu đã lưu từ localStorage khi component mount
        const savedTrack = localStorage.getItem('currentTrack');
        const savedTime = localStorage.getItem('currentTime');
        const isSavedPlaying = localStorage.getItem('isPlaying') === 'true';

        if (savedTrack && savedTrack !== 'undefined') {
            setCurrentTrack(savedTrack);  // Khôi phục currentTrack từ localStorage
        }

        if (savedTime) {
            setCurrentTime(parseFloat(savedTime));  // Khôi phục currentTime từ localStorage
        }

        if (savedTrack && savedTrack !== 'undefined') {
            setIsPlaying(isSavedPlaying);  // Khôi phục trạng thái phát nhạc
        }

        if (isSavedPlaying && audioRef.current) {
            audioRef.current.play();  // Nếu đang phát, tiếp tục phát
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;  // Cập nhật thời gian hiện tại của audio
            if (isPlaying) {
                audioRef.current.play();  // Tiến hành phát nhạc
            } else {
                audioRef.current.pause();  // Dừng phát nhạc
            }
        }
    }, [currentTrack, currentTime, isPlaying]);

    // Định dạng thời gian
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    // Chuyển đổi trạng thái play/pause
    const togglePlayPause = () => {
        if (!isPlaying) {
            setCurrentTrack(id);  // Lưu bài hát vào currentTrack khi phát
        }

        setIsPlaying(!isPlaying);  // Chuyển đổi trạng thái phát/dừng nhạc
    };

    const handleProgressChange = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value;
        setCurrentTime(value);  // Cập nhật currentTime khi người dùng thay đổi tiến trình
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);  // Cập nhật thời gian khi tiến trình thay đổi
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);  // Cập nhật tổng thời gian bài hát khi metadata được tải
    };

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value / 100;  // Cập nhật âm lượng
    };

    const songImage = getSongImage(songs?.coverImageUrl);
    const songAudioUrl = songs?.fileUrl;

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading ...</div>;
    }

    return (
        <footer className="footer">
            <div className="player-container">
                <div className="track-art">
                    <img src={songImage} alt={songs?.title || "Default song"} />
                </div>
                <div className="song-info">
                    <div className="title">{songs ? songs.title : "TITLE"}</div>
                    <div className="artist">{songs ? songs.artist : "ARTIST"}</div>
                </div>

                <audio
                    ref={audioRef}
                    src={songAudioUrl ? require(`../assets/audios/${songAudioUrl}`) : ""}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={() => console.error("Audio source not supported:", songAudioUrl)}
                    autoPlay={isPlaying}
                />

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
                        defaultValue="50"
                        onChange={handleVolumeChange}
                    />
                </div>

                <div className="extra-controls">
                    <i className="fas fa-list"></i>
                    <i className="fas fa-expand"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
