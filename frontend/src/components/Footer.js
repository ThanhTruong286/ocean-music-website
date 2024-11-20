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
        const handleTrackUpdate = () => {
            const updatedTrack = localStorage.getItem("currentTrack");
            if (updatedTrack && updatedTrack !== currentTrack) {
                setLoading(true);
                setSong(null); // Reset song state
                setError(false);
                setIsPlaying(false); // Dừng phát nhạc

                // Reload song data
                setTimeout(() => {
                    // Fake delay to ensure UI updates smoothly
                    window.location.reload(); // Hoặc dùng cách bạn load lại dữ liệu
                }, 100);
            }
        };

        // Lắng nghe sự kiện khi track thay đổi
        window.addEventListener("trackUpdated", handleTrackUpdate);

        return () => {
            window.removeEventListener("trackUpdated", handleTrackUpdate);
        };
    }, [currentTrack]);

    // Tải thông tin bài hát từ API
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


    // Cập nhật trạng thái khi phát/dừng nhạc
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

    // Xử lý khi audio đang phát
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            setCurrentTime(current);
            localStorage.setItem("audioCurrentTime", current);
        }
    };

    // Xử lý khi audio đã tải xong metadata
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Xử lý thay đổi tiến trình bài hát
    const handleProgressChange = (e) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
            localStorage.setItem("audioCurrentTime", value);
        }
    };

    // Xử lý thay đổi âm lượng
    const handleVolumeChange = (e) => {
        const volumeValue = parseInt(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = volumeValue / 100;
            setVolume(volumeValue);
            localStorage.setItem("audioVolume", volumeValue);
        }
    };

    // Khi bài hát kết thúc
    const handleEnded = () => {
        setIsPlaying(false);
        localStorage.setItem("audioIsPlaying", "false");
    };

    // Định dạng thời gian hiển thị
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const songImage = song?.coverImageUrl ? require(`../assets/images/songs/${song.coverImageUrl}`) : "";

    // Chuyển hướng đến trang chi tiết bài hát
    const handleOnclickSong = () => {
        if (currentTrack) {
            navigate(`/song-detail/${currentTrack}`);
        }
    };

    useEffect(() => {
        // Lắng nghe sự kiện chuyển trang để đảm bảo audio vẫn tiếp tục phát
        const handleBeforeUnload = (event) => {
            if (isPlaying) {
                // Nếu audio đang phát, lưu lại trạng thái
                localStorage.setItem("audioCurrentTime", audioRef.current.currentTime);
                localStorage.setItem("audioIsPlaying", "true");
            }
        };

        // Thêm sự kiện khi rời khỏi trang
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isPlaying]);

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
                    ref={audioRef}  // Tham chiếu tới phần tử audio
                    src={song?.fileUrl ? require(`../assets/audios/${song.fileUrl}`) : ""}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    autoPlay={false}  // Không tự động phát nhạc
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
