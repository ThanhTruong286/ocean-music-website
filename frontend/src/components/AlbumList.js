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
                                className="album-image" />

                            <h2 className="album-title"> {album.title}</h2>
                            <p className="album-artist">Jhohn faker</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default AlbumList;
