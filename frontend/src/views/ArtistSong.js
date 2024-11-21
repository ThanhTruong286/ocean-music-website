import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import "../styles/albumDetail.scss";
import { getOwnSong } from "../api/api";
import CryptoJS from 'crypto-js';
import faker from "../assets/images/artists/faker.jpg";

// Load all images from the songs folder
const images = require.context('../assets/images/albums', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getAlbumsImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const ArtistSong = () => {
    const [songs, setSongs] = useState([]);  // Khởi tạo với mảng rỗng
    const [loading, setLoading] = useState(true);  // Thêm trạng thái loading
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const loadArtistSong = async () => {
            try {
                const response = await getOwnSong();
                setSongs(response);
                setLoading(false);  // Đánh dấu kết thúc tải dữ liệu
            } catch (e) {
                console.error("Error fetching songs", e);
                setLoading(false);
            }
        };
        loadArtistSong();
    }, []);

    // Phân trang
    const totalPages = Math.ceil(songs.length / itemsPerPage);
    const paginatedSongs = songs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Xử lý các nút thêm, sửa, xóa
    const handleAddSong = () => {
        alert("Thêm bài hát mới!");
    };

    const handleEditSong = (song) => {
        alert(`Sửa bài hát: ${song.title}`);
    };

    const handleDeleteSong = (song) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa bài hát: ${song.title}?`)) {
            alert(`Xóa bài hát: ${song.title}`);
        }
    };

    // Hàm trả về hình ảnh album
    const albumImage = getAlbumsImage;

    return (
        <div>
            <aside className="sidebar" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <div className="album-detail__table-container">
                            {/* Nút thêm bài hát */}
                            <div className="add-song-container">
                                <button className="btn btn-primary" onClick={handleAddSong}>
                                    <i className="fas fa-plus"></i> Thêm bài hát
                                </button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Album</th>
                                        <th>Date added</th>
                                        <th>
                                            <i className="far fa-clock icon"></i>
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6">Đang tải...</td>
                                        </tr>
                                    ) : (
                                        paginatedSongs.map((song, index) => (
                                            <tr key={song.id}>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td className="album-detail__song-title">
                                                    <img
                                                        alt="Song cover"
                                                        height="40"
                                                        src={albumImage(song.coverImageUrl)}
                                                        width="40"
                                                    />
                                                    <div className="album-detail__title">
                                                        {song.title}
                                                        <span>{song.artist}</span>
                                                    </div>
                                                </td>
                                                <td>{song.album}</td>
                                                <td>{song.dateAdded}</td>
                                                <td>{song.duration}</td>
                                                <td className="actions">
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => handleEditSong(song)}
                                                    >
                                                        <i className="fas fa-edit"></i> Sửa
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteSong(song)}
                                                    >
                                                        <i className="fas fa-trash"></i> Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ArtistSong;
