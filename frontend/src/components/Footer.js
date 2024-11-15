import { useEffect, useState, useRef, memo } from "react";
import { getSong } from "../api/api";
import CryptoJS from "crypto-js";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const audioRef = useRef(null);
    const currentTrack = localStorage.getItem('currentTrack');
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const navigate = useNavigate();  // Dùng useNavigate để điều hướng

    const decryptId = (encryptedId) => {
        const decoded = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decoded, "MIKASA");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    // Hàm tải bài hát
    useEffect(() => {
        const loadSong = async () => {
            try {
                const decryptedId = decryptId(currentTrack); // Giải mã id
                const response = await getSong(decryptedId); // Lấy thông tin bài hát
                setSong(response);

                // Tải lại trạng thái nếu có trong localStorage
                const savedCurrentTime = localStorage.getItem('audioCurrentTime');
                const savedIsPlaying = localStorage.getItem('audioIsPlaying');
                const savedVolume = localStorage.getItem('audioVolume');

                if (savedCurrentTime) setCurrentTime(parseFloat(savedCurrentTime));
                if (savedIsPlaying === 'true') setIsPlaying(true);
                if (savedVolume) setVolume(parseInt(savedVolume));

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

    const songImage = song?.coverImageUrl ? require(`../assets/images/songs/${song.coverImageUrl}`) : "";

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    // Xử lý khi người dùng nhấn play/pause
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        localStorage.setItem('audioIsPlaying', !isPlaying);
    };

    // Cập nhật thời gian khi audio đang phát
    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        localStorage.setItem('audioCurrentTime', current);
    };

    // Khi audio đã tải xong, cập nhật thời gian bài hát
    const handleLoadedMetadata = () => {
        const audioDuration = audioRef.current.duration;
        setDuration(audioDuration);
    };

    // Khi thay đổi thanh tiến trình
    const handleProgressChange = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value;
        setCurrentTime(value);
        localStorage.setItem('audioCurrentTime', value);
    };

    // Thay đổi âm lượng
    const handleVolumeChange = (e) => {
        const volumeValue = e.target.value / 100;
        audioRef.current.volume = volumeValue;
        setVolume(e.target.value);
        localStorage.setItem('audioVolume', e.target.value);
    };

    // Khi bài hát hoàn thành, đặt lại trạng thái
    const handleEnded = () => {
        setIsPlaying(false);
        localStorage.setItem('audioIsPlaying', 'false');
    };

    // Lưu trạng thái khi component unmount
    useEffect(() => {
        return () => {
            localStorage.setItem('audioCurrentTime', currentTime);
            localStorage.setItem('audioIsPlaying', isPlaying ? 'true' : 'false');
            localStorage.setItem('audioVolume', volume);
        };
    }, [currentTime, isPlaying, volume]);

    // Kiểm tra bài hát mới có phải là bài đang phát hay không
    const handleSongClick = async (newTrackId) => {
        if (currentTrack === newTrackId) {
            // Nếu bài hát đang phát, không làm gì
            return;
        }

        // Dừng bài hát hiện tại
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }

        // Cập nhật bài hát mới
        localStorage.setItem('currentTrack', newTrackId);
        setSong(null); // Set lại song để load bài mới

        // Đảm bảo bài mới sẽ được phát
        setIsPlaying(true);
        localStorage.setItem('audioIsPlaying', 'true');
    };

    const handleOnclickSong = (encryptedId) => {
        navigate(`/song-detail/${encryptedId}`);  // Chuyển hướng sang trang chi tiết
    }

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
                    onEnded={handleEnded}
                    currentTime={currentTime}
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
                    <i className="fas fa-expand" onClick={() => handleOnclickSong(currentTrack)}></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
