import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchAlbums, fetchSongs } from '../api/api'; // Ensure fetchSongs is imported
import '../styles/album.scss'; // Link SCSS

const AlbumList = () => {
    
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]); // State for songs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums(); // Fetch albums
                setAlbums(data);
            } catch (err) {
                setError('Unable to load albums.');
            } finally {
                setLoading(false);
            }
        };

        const loadSongs = async () => {
            try {
                const data = await fetchSongs(); // Fetch songs
                setSongs(data);
            } catch (err) {
                setError('Unable to load songs.');
            }
        };

        loadAlbums();
        loadSongs(); // Call function to load songs
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
                            className="album-image"/>
                        <h2 className="album-title">{album.title}</h2>
                        <p className="album-artist">Jhohn faker</p>
                    </div>
                ))}
            </div>

            {/* Songs Section */}
            <div className="songs-container">
                <h2 className="songs-title">Our Top Releasing Listening Songs</h2>
                <div className="song-list">
                    {songs.map(song => (
                        <div key={song.song_id} className="song-item">
                            <img src={song.image  || faker} alt={song.title} className="song-image" />
                            <div className="song-details">
                                <h3 className="song-title">{song.title}</h3>
                                <p className="song-artist">Jhohn faker</p>
                            </div>
                            <div className="song-plays">
                                <span role="img" aria-label="headphone">🎧 6.2k</span> {song.plays}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlbumList;
