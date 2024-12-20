import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import "../styles/playlist.scss";
import { getPlaylistById, deleteSongFromPlaylist, getRecommendSongByArtistIds } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

const SECRET_KEY = 'MIKASA';

// Hàm mã hóa ID
const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
};

const API_URL = 'http://localhost:5000';

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getSongImage = (imageName) => {
    // Trả về URL hình ảnh từ backend nếu có, nếu không thì dùng ảnh fallback
    return imageName ? `${API_URL}/assets/images/songs/${imageName}` : null;
};

const PlaylistDetail = () => {
    const { id: playlistId } = useParams();
    const [playList, setPlaylist] = useState(null);
    const navigate = useNavigate();
    const [recommendedSongs, setRecommendedSongs] = useState([]);

    useEffect(() => {
        if (playList?.songs?.length > 0) {
            // Lưu danh sách nhạc vào localStorage
            localStorage.setItem('playlistSongs', JSON.stringify(playList.songs));
        }
    }, [playList]);

    useEffect(() => {
        const loadPlaylist = async () => {
            try {
                const data = await getPlaylistById(playlistId);
                setPlaylist(data);

                // Lấy danh sách artistId của các bài hát trong playlist
                const artistIds = data.songs.flatMap(song => song.artists.map(artist => artist.artistId));

                // Nếu không có artistIds, không gọi API gợi ý
                if (artistIds.length === 0) {
                    console.log("No artistIds in playlist, skipping recommendations.");
                    return; // Không gọi API gợi ý nếu không có artistId
                }

                // Gọi hàm gợi ý bài hát sau khi playlist đã được tải
                loadRecommendSong(artistIds, data.songs);
            } catch (e) {
                console.error("Error fetching playlist:", e);
            }
        };

        loadPlaylist();
    }, [playlistId]); // Đảm bảo useEffect chỉ chạy lại khi playlistId thay đổi

    // Chỉnh sửa hàm loadRecommendSong để thêm điều kiện kiểm tra playlist có dữ liệu hay không
    const loadRecommendSong = async (artistIds, playlistSongs) => {
        try {
            const response = await getRecommendSongByArtistIds(artistIds);

            if (response && response.recommendedSongs && response.recommendedSongs.length > 0) {
                // Giới hạn danh sách gợi ý tối đa 10 bài
                let recommendedSongs = response.recommendedSongs.slice(0, 10);

                // Lọc những bài hát đã có trong playlist (dựa trên songId)
                const songIdsInPlaylist = playlistSongs.map(song => song.songId);
                recommendedSongs = recommendedSongs.filter(song => !songIdsInPlaylist.includes(song.songId));

                setRecommendedSongs(recommendedSongs);
            } else {
                setRecommendedSongs([]); // Nếu không có bài hát gợi ý, set mảng rỗng
            }
        } catch (e) {
            console.error("Error fetching recommended songs:", e);
            alert("Error fetching recommended songs.");
        }
    };


    if (!playList) {
        return <div>Loading...</div>;
    }

    // Hàm xử lý khi nhấn vào tên bài hát
    const handleOnclickSong = (songId) => {
        const encryptedId = encryptId(songId);
        navigate(`/song-detail/${encryptedId}`);
    };

    // Chuyển giây thành phút:giây
    const convertSecondsToMinutes = (seconds) => {
        const minutes = Math.floor(seconds / 60); // Tính số phút
        const remainingSeconds = seconds % 60; // Tính số giây còn lại
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Hàm xóa bài hát khỏi playlist
    const handleDeleteSong = (songId) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bài hát sẽ bị xóa khỏi danh sách phát và không thể khôi phục!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                // Gọi hàm xóa bài hát
                deleteSongFromPlaylist(playlistId, songId)
                    .then(response => {
                        if (response.success) {
                            // Thông báo thành công
                            Swal.fire({
                                title: 'Đã xóa!',
                                text: 'Bài hát đã được xóa khỏi danh sách phát.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });

                            // Cập nhật lại danh sách phát
                            setPlaylist(prevState => ({
                                ...prevState,
                                songs: prevState.songs.filter(song => song.songId !== songId)
                            }));
                        } else {
                            // Thông báo lỗi từ API
                            Swal.fire({
                                title: 'Lỗi!',
                                text: `Không thể xóa bài hát: ${response.message}`,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    })
                    .catch(err => {
                        console.error("Error deleting song:", err);
                        // Thông báo lỗi ngoại lệ
                        Swal.fire({
                            title: 'Lỗi!',
                            text: 'Đã xảy ra lỗi khi xóa bài hát. Vui lòng thử lại.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        });
    };

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <div className="header">
                            <img
                                alt="Album cover image"
                                height="200"
                                src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg"
                                width="200"
                            />
                            <div className="details">
                                <p>Playlist</p>
                                <h1>{playList.title}</h1>
                                <p>{`${playList.songs.length} bài hát`}</p>
                            </div>
                        </div>
                        <div className="controls">
                            <button className="play-button">
                                <i className="fas fa-play"></i>
                            </button>
                        </div>
                        <table className="song-list">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Bài Hát</th>
                                    <th>Nghệ Sĩ</th>
                                    <th>Ngày Thêm</th>
                                    <th><i className="far fa-clock"></i></th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playList.songs.map((song, index) => (
                                    <tr key={song.songId}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                alt="Album cover image"
                                                height="40"
                                                src={getSongImage(song.coverImageUrl)}
                                                width="40"
                                                style={{ marginRight: '10px', borderRadius: "5px" }}
                                            />
                                            <span
                                                className="song-title"
                                                style={{ cursor: 'pointer', color: 'black' }}
                                                onClick={() => handleOnclickSong(song.songId)}
                                            >
                                                {song.title}
                                            </span>
                                        </td>

                                        <td>
                                            {song.artists?.length > 0 ? (
                                                song.artists.map((artist, artistIndex) => (
                                                    <span key={artistIndex}>
                                                        {artist.name}
                                                        {artistIndex < song.artists.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>No artist</span>
                                            )}
                                        </td>

                                        <td>{new Date().toLocaleDateString()}</td>
                                        <td>{convertSecondsToMinutes(song.duration)}</td>
                                        <td>
                                            <a href="#" className="delete" onClick={() => handleDeleteSong(song.songId)}>Xóa</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="recommended">
                            <h2>Gợi Ý</h2>
                            <p>Dựa trên các bài hát trong playlist này</p>
                            {recommendedSongs.length > 0 ? (
                                recommendedSongs.map((song, index) => (
                                    <div key={index} className="song">
                                        <div className="details">
                                            <img
                                                alt="Album cover image"
                                                height="40"
                                                src={getSongImage(song.coverImageUrl)} // Sử dụng hàm getSongImage
                                                width="40"
                                                style={{ marginRight: '10px', borderRadius: "5px" }}
                                            />
                                            <div>
                                                <p id='song-detail-title'>{song.title}</p>
                                                {/* Hiển thị tên nghệ sĩ */}
                                                <p id='song-detail-artist'>{song.artist}</p>
                                            </div>
                                        </div>
                                        <button className="add-button">Add</button>
                                    </div>
                                ))
                            ) : (
                                <p>No recommendations available.</p>
                            )}

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PlaylistDetail;
