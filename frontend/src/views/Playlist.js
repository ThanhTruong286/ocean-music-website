import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import "../styles/playlist.scss";
import CryptoJS from 'crypto-js';
import { addPlaylist, getAllUserPlaylist, deletePlaylist, updatePlaylist } from "../api/api"; // Giả sử bạn đã có API cho xóa và sửa

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
            setPlaylists([...playlists, newPlaylist]);  // Thêm playlist mới vào danh sách
        } catch (error) {
            console.error('Error adding playlist:', error);
        }
    };

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
        // Xóa playlist bằng API
        deletePlaylist(playlistId)
            .then(() => {
                setUserPlaylists(userPlaylist.filter(p => p.id !== playlistId));  // Cập nhật lại danh sách playlist sau khi xóa
            })
            .catch((error) => {
                console.error("Error deleting playlist", error);
            });
    };

    // Hàm sửa playlist
    const handleEdit = (playlistId) => {
        const newTitle = prompt("Nhập tiêu đề mới cho playlist:");
        if (newTitle) {
            updatePlaylist(playlistId, newTitle)
                .then(() => {
                    // Cập nhật lại tên playlist trong danh sách
                    setUserPlaylists(userPlaylist.map(playlist =>
                        playlist.id === playlistId ? { ...playlist, title: newTitle } : playlist
                    ));
                })
                .catch((error) => {
                    console.error("Error editing playlist", error);
                });
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
                                        style={{ cursor: 'pointer' }}
                                    ></i>
                                    <i className="fas fa-arrow-right"></i>
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
                                                        <a href="#" className="play" onClick={() => handlePlay(playlist.id)}>Nghe</a>
                                                        <a href="#" className="edit" onClick={() => handleEdit(playlist.id)}>Sửa</a>
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
