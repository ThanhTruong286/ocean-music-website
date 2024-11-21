import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import { getOwnSong, createNewSong, deleteArtistSong } from "../api/api";
import CryptoJS from 'crypto-js';
import faker from "../assets/images/artists/faker.jpg";
import Swal from 'sweetalert2';
import EditSongForm from '../components/EditSongForm';

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
    const [isEditing, setIsEditing] = useState(false);
    const [songToEdit, setSongToEdit] = useState(null);
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

    const handleAddSong = async () => {
        try {
            // Confirm action using SweetAlert2
            const result = await Swal.fire({
                title: 'Thêm bài hát mới?',
                text: 'Bài hát sẽ được tạo với tiêu đề mặc định là "New Song". Bạn có muốn tiếp tục?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Có, thêm bài hát!',
                cancelButtonText: 'Hủy',
            });

            // If user confirmed
            if (result.isConfirmed) {
                // Call the API to create a new song
                const newSong = await createNewSong();
                Swal.fire({
                    title: 'Thành công!',
                    text: `Đã thêm bài hát mới: "${newSong.title}"`,
                    icon: 'success',
                });

                // Update the list of songs to include the newly added one
                setSongs((prevSongs) => [newSong, ...prevSongs]);
            }
        } catch (error) {
            console.error('Error adding new song:', error);
            Swal.fire({
                title: 'Thất bại!',
                text: 'Đã xảy ra lỗi khi thêm bài hát. Vui lòng thử lại sau.',
                icon: 'error',
            });
        }
    };

    const handleEditSong = (song) => {
        setSongToEdit(song);
        setIsEditing(true);
    };

    const handleDeleteSong = async (song) => {
        try {
            // Ask for confirmation before deleting
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: `Bạn có muốn xóa bài hát: "${song.title}"? Thao tác này không thể hoàn tác!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Có, xóa nó!',
                cancelButtonText: 'Hủy',
            });

            // If user confirms
            if (result.isConfirmed) {
                // Call the API to delete the song
                await deleteArtistSong(song.song_id);

                // Optimistically remove the song from the list
                setSongs((prevSongs) => prevSongs.filter((s) => s.song_id !== song.song_id));

                // Show success notification
                Swal.fire({
                    title: 'Đã xóa!',
                    text: `Bài hát "${song.title}" đã được xóa thành công.`,
                    icon: 'success',
                });
            }
        } catch (error) {
            console.error('Error deleting song:', error);

            // Show error notification
            Swal.fire({
                title: 'Thất bại!',
                text: 'Đã xảy ra lỗi khi xóa bài hát. Vui lòng thử lại sau.',
                icon: 'error',
            });
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
                            {isEditing && (
                                <EditSongForm
                                    song={songToEdit}
                                    onClose={() => setIsEditing(false)}
                                    onSave={() => {
                                        setIsEditing(false);
                                        setSongToEdit(null);
                                    }}
                                />
                            )}
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
