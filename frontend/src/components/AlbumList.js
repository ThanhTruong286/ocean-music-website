import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchAlbums, fetchSongs } from '../api/api';
import '../styles/album.scss';

const AlbumList = () => {
    
    // Separate states for albums and songs
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    // Separate loading states
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [loadingSongs, setLoadingSongs] = useState(true);

    // Separate error states
    const [albumError, setAlbumError] = useState(null);
    const [songError, setSongError] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums(); // Fetch albums
                setAlbums(data);
            } catch (err) {
                setAlbumError('Unable to load albums.');
            } finally {
                setLoadingAlbums(false);
            }
        };

        const loadSongs = async () => {
            try {
                const data = await fetchSongs(); // Fetch songs
                setSongs(data);
            } catch (err) {
                setSongError('Unable to load songs.');
            } finally {
                setLoadingSongs(false);
            }
        };

        loadAlbums();
        loadSongs(); // Call function to load songs
    }, []);

    return (
        <div>
            <h1 className="album-title">Albums</h1>
            <div className="album-list">
                {/* Album Loading & Error State */}
                {loadingAlbums ? (
                    <div>Loading albums...</div>
                ) : albumError ? (
                    <div>Error: {albumError}</div>
                ) : (
                    albums.map(album => (
                        <div key={album.album_id} className="album-item">
                            <img
                                src={album.image || faker} 
                                alt={album.title}
                                className="album-image"/>
                            
                            <a href="../dashboard/music-player.html" className="album-title h2">{album.title}</a>
                            <p className="album-artist">Jhohn faker</p>
                        </div>
                    ))
                )}
            </div>

            {/* Songs Section */}
            <div className="songs-container">
                <h2 className="songs-title">Our Top Releasing Listening Songs</h2>
                <div className="song-list">
                    {/* Song Loading & Error State */}
                    {loadingSongs ? (
                        <div>Loading songs...</div>
                    ) : songError ? (
                        <div>Error: {songError}</div>
                    ) : (
                        songs.map(song => (
                            <div key={song.song_id} className="song-item">
                                <img src={song.image  || faker} alt={song.title} className="song-image" />
                                <div className="song-details">
                                    <h3 className="song-title" >{song.title}</h3>
                                    <p className="song-artist">Jhohn faker</p>
                                </div>
                                <div className="song-plays">
                                    <span role="img" aria-label="headphone">🎧 6.2k</span> {song.plays}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlbumList;
