// AlbumList.js
import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/api'; // Assuming API call for albums
import '../styles/album.scss'; // Link SCSS

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums(); // Assuming API call
                setAlbums(data);
            } catch (err) {
                setError('Unable to load albums.');
            } finally {
                setLoading(false);
            }
        };

        loadAlbums();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="album-title">Albums</h1>
            <div className="album-list">
                {albums.map(album => (
                    <div key={album.album_id} className="album-item">
                        <img
                            src={album.image || faker} 
                            alt={album.title}
                            className="album-image"
                        />
                        <h2 className="album-title">{album.title}</h2>
                        <p className="album-artist">By {album.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumList;
