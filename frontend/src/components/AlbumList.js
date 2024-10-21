//import defaultAlbumCover from "../assets/images/albums/default.jpg";
import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/api'; // Gọi API để lấy albums

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums(); // Gọi hàm fetchAlbums
                setAlbums(data); // Cập nhật danh sách albums
            } catch (err) {
                setError('Không thể tải danh sách albums');
            } finally {
                setLoading(false);
            }
        };

        loadAlbums();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className="row album-list">
            {albums.map((album) => (
                <div className="col-xl-3 col-md-6 mb-3" key={album.album_id}> {/* Sử dụng album.album_id làm key */}
                    <div className="bg-soft-primary position-relative rounded-3 card-box mb-3">
                        <img
                            src={album.image|| faker} // Dùng ảnh cover của album hoặc ảnh mặc định
                            id="album-cover"
                            className="img-fluid mx-auto d-block"
                            alt="album-cover"
                        />
                    </div>
                    <a href="../dashboard/music-player.html" className="text-capitalize h5">{album.title}</a>
                    <small className="fw-normal line-count-1 text-capitalize">
                        <b>Released: {new Date(album.release_date).toLocaleDateString() || 'Unknown'}</b> 
                    </small>
                </div>
            ))}
        </div>
    );
}

export default AlbumList;
