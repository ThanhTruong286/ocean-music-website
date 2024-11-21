import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import "../styles/playlist.scss";
import CryptoJS from 'crypto-js';
import { addPlaylist, getAllUserPlaylist, deletePlaylist, updatePlaylist } from "../api/api"; // Giả sử bạn đã có API cho xóa và sửa
import Swal from 'sweetalert2';

const encryptPlaylistId = (id) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(id));
};

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);  // Lưu danh sách playlist
    const [e, setError] = useState(null);  // Lưu lỗi
    const [loading, setLoading] = useState(true);  // Lưu trạng thái loading
    const [userPlaylist, setUserPlaylists] = useState([]);  // Lưu danh sách playlist

    // Hàm thêm playlist mới
    const handleAddPlaylist = async () => {
        try {
            const newPlaylist = await addPlaylist();
            setPlaylists([...playlists, newPlaylist]);
    
            // Hiển thị thông báo thành công
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Playlist đã được tạo.',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error adding playlist:', error);
            // Hiển thị thông báo lỗi
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Không thể tạo playlist. Vui lòng thử lại.',
            });
        }
    }

    // Hàm tải tất cả playlist của người dùng
    useEffect(() => {
        const loadPlaylist = async () => {
            try {
                const data = await getAllUserPlaylist();  // Fetch data from the API

                // If the data is an object, wrap it in an array
                const playlists = Array.isArray(data) ? data : [data]; // Wrap in an array if it's not already
                setUserPlaylists(playlists);  // Set playlists state

            } catch (error) {
                setError("Không tìm thấy playlist");
            } finally {
                setLoading(false);
            }
        };

        loadPlaylist();  // Load playlists
    }, []);

    // Hàm xóa playlist
    const handleDelete = (playlistId) => {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: 'Playlist này sẽ bị xóa và không thể khôi phục!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                deletePlaylist(playlistId)
                    .then(() => {
                        setUserPlaylists(userPlaylist.filter((p) => p.id !== playlistId)); // Cập nhật danh sách playlist
                        // Hiển thị thông báo thành công
                        Swal.fire({
                            icon: 'success',
                            title: 'Đã xóa!',
                            text: 'Playlist đã được xóa.',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    })
                    .catch((error) => {
                        console.error('Error deleting playlist:', error);
                        // Hiển thị thông báo lỗi
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!',
                            text: 'Không thể xóa playlist. Vui lòng thử lại.',
                        });
                    });
            }
        });
    };  

    // Hàm sửa playlist
    const handleEdit = async (playlistId) => {
        const { value: newTitle } = await Swal.fire({
            title: 'Sửa Playlist',
            input: 'text',
            inputLabel: 'Nhập tiêu đề mới:',
            inputPlaceholder: 'Tiêu đề mới',
            showCancelButton: true,
        });
    
        if (newTitle) {
            try {
                await updatePlaylist(playlistId, newTitle);
                setUserPlaylists(userPlaylist.map(playlist =>
                    playlist.id === playlistId ? { ...playlist, title: newTitle } : playlist
                ));
    
                // Hiển thị thông báo thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Playlist đã được cập nhật.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error('Error editing playlist', error);
                // Hiển thị thông báo lỗi
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể cập nhật playlist. Vui lòng thử lại.',
                });
            }
        }
    };    

    // Hàm nghe playlist (giả sử bạn có một cách để mở playlist)
    const handlePlay = (playlistId) => {
        // Logic để chơi playlist
        console.log(`Đang chơi playlist với ID: ${playlistId}`);
    };

    if (e) {
        return <div>Error: {e}</div>;  // Hiển thị lỗi nếu có
    }

    if (loading) {
        return <div>Loading...</div>;  // Hiển thị loading khi đang tải dữ liệu
    }

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="centered-wrapper">
                        <div className="container">
                            <div className="header">
                                <h1>Thư Viện Của Bạn</h1>
                                <div className="icons">
                                    <i
                                        className="fas fa-plus"
                                        onClick={handleAddPlaylist}
                                        style={{ cursor: 'pointer', color: 'black' }}
                                    ></i>
                                    <i className="fas fa-arrow-right" style={{ color: 'black' }}></i>
                                </div>

                            </div>
                            <div className="filters">
                                <button className="active">Danh Sách Playlists</button>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tiêu Đề</th>
                                        <th>Ngày Thêm</th>
                                        <th>Lần Cuối Play</th>
                                        <th>Hành Động</th> {/* Cột hành động */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {userPlaylist.length > 0 ? (
                                        userPlaylist.map((playlist, index) => {
                                            const encodedId = encryptPlaylistId(playlist.id); // Mã hóa playlistId
                                            return (
                                                <tr key={index}>
                                                    <td className="title">
                                                        <div>
                                                            <span>{playlist.title}</span>
                                                        </div>
                                                    </td>
                                                    <td>{new Date().toLocaleDateString()}</td>
                                                    <td>{new Date().toLocaleTimeString()}</td>
                                                    <td className="actions">
                                                        {/* Các nút hành động với playlistId đã mã hóa */}
                                                        <a href={`/playlist/${encodedId}`} className="watch">Xem</a>
                                                        <a className="edit" onClick={() => handleEdit(playlist.id)}>Sửa</a>
                                                        <a href="#" className="delete" onClick={() => handleDelete(playlist.id)}>Xóa</a>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4">Không có playlist nào.</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Playlist;
