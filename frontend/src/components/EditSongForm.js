import React, { useState } from 'react';
import { createNewSong, updateSong } from "../api/api";
import Swal from 'sweetalert2';
import "../styles/editSongForm.scss";  // Giữ lại đường dẫn SCSS

const EditSongForm = ({ song, onClose, onSave }) => {
    const [title, setTitle] = useState(song ? song.title : 'Bài hát mới');
    const [duration, setDuration] = useState(song ? song.duration : '');
    const [file, setFile] = useState(null); // State để lưu file nhạc
    const [coverImage, setCoverImage] = useState(null); // State để lưu file ảnh bìa
    const [lyric, setLyric] = useState(song ? song.lyric : '');

    // Hàm submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const songData = {
                title: title,
                duration: duration,
                lyric: lyric,
                fileUrl: file ? file.name : '',  // Send just the file name (not the actual file)
                coverImageUrl: coverImage ? coverImage.name : ''  // Send just the cover image file name
            };

            // If you are updating the song:
            if (song) {
                await updateSong(song.song_id, songData);  // Send songData as JSON
                onSave();  // Refresh the song list
                Swal.fire({
                    title: 'Success!',
                    text: `Successfully updated song: "${title}"`,
                    icon: 'success',
                });
            } else {
                // If you are creating a new song:
                const newSong = await createNewSong(songData);
                onSave();  // Refresh the song list
                Swal.fire({
                    title: 'Success!',
                    text: `Successfully added new song: "${newSong.title}"`,
                    icon: 'success',
                });
            }
        } catch (error) {
            console.error('Error saving song:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while saving the song.',
                icon: 'error',
            });
        }
    };

    // Xử lý thay đổi file nhạc
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Lưu trữ file nhạc được chọn
    };

    // Xử lý thay đổi file hình ảnh
    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0]); // Lưu trữ file hình ảnh được chọn
    };

    return (
        <div className="edit-song-form">
            <form onSubmit={handleSubmit} className="edit-song-form__form">
                <h2 className="edit-song-form__title">{song ? 'Sửa bài hát' : 'Thêm bài hát mới'}</h2>

                {/* Tiêu đề bài hát */}
                <div className="edit-song-form__group">
                    <label className="edit-song-form__label">Tên bài hát</label>
                    <input
                        className="edit-song-form__input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Thời gian bài hát */}
                <div className="edit-song-form__group">
                    <label className="edit-song-form__label">Thời gian</label>
                    <input
                        className="edit-song-form__input"
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>

                {/* Lời bài hát */}
                <div className="edit-song-form__group">
                    <label className="edit-song-form__label">Lời bài hát</label>
                    <textarea
                        className="edit-song-form__input"
                        value={lyric}
                        onChange={(e) => setLyric(e.target.value)}
                    />
                </div>

                {/* Chọn file nhạc */}
                <div className="edit-song-form__group">
                    <label className="edit-song-form__label">Chọn file nhạc</label>
                    <input
                        className="edit-song-form__input"
                        type="file"
                        accept="audio/*" // Chỉ cho phép file âm thanh
                        onChange={handleFileChange}
                    />
                </div>

                {/* Chọn file hình ảnh bìa */}
                <div className="edit-song-form__group">
                    <label className="edit-song-form__label">Chọn ảnh bìa</label>
                    <input
                        className="edit-song-form__input"
                        type="file"
                        accept="image/*" // Chỉ cho phép file hình ảnh
                        onChange={handleCoverImageChange}
                    />
                </div>

                {/* Các nút Save và Cancel */}
                <div className="edit-song-form__actions">
                    <button type="submit" className="edit-song-form__button">Lưu</button>
                    <button type="button" className="edit-song-form__button edit-song-form__button--cancel" onClick={onClose}>Hủy</button>
                </div>
            </form>
        </div>
    );
};

export default EditSongForm;
