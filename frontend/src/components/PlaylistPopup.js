import React, { useState } from 'react';
import "../styles/playlistPopup.scss";

const AddToPlaylistPopup = ({ playlists = [], onClose, onAddToPlaylist }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const playlistsPerPage = 2;

    const totalPages = Math.ceil(playlists.length / playlistsPerPage);
    const startIndex = (currentPage - 1) * playlistsPerPage;
    const currentPlaylists = playlists.slice(startIndex, startIndex + playlistsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Chọn Playlist để thêm</h3>
                {currentPlaylists.length > 0 ? (
                    <ul className="playlist-list">
                        {currentPlaylists.map((playlist) => (
                            <li
                                key={playlist.id}
                                onClick={() => onAddToPlaylist(playlist.id)}
                                className="playlist-item"
                            >
                                {playlist.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có playlist nào.</p>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            Trang trước
                        </button>
                        <span className="pagination-info">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            Trang sau
                        </button>
                    </div>
                )}

                <button className="close-btn" onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default AddToPlaylistPopup;
