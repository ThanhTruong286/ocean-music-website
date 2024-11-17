import React from 'react';

const AddToPlaylistPopup = ({ playlists, onClose, onAddToPlaylist }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Chọn Playlist để thêm</h3>
                {playlists.length > 0 ? (
                    <ul>
                        {playlists.map((playlist) => (
                            <li key={playlist.id} onClick={() => onAddToPlaylist(playlist.id)}>
                                {playlist.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có playlist nào.</p>
                )}
                <button className="close-btn" onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default AddToPlaylistPopup;
