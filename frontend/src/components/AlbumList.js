import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/api';
import '../styles/album.scss';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [albumError, setAlbumError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Number of albums per page

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums();
                setAlbums(data);
            } catch (err) {
                setAlbumError('Unable to load albums.');
            } finally {
                setLoadingAlbums(false);
            }
        };

        loadAlbums();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(albums.length / itemsPerPage);

    // Check if current page is valid after adding new album
    useEffect(() => {
        if (currentPage >= totalPages && totalPages > 0) {
            setCurrentPage(totalPages - 1);
        }
    }, [albums, totalPages, currentPage]);

    // Get the albums for the current page
    const currentAlbums = albums.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Handle pagination
    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <div className="album-list">
                {/* Album Loading & Error State */}
                {loadingAlbums ? (
                    <div>Loading albums...</div>
                ) : albumError ? (
                    <div>Error: {albumError}</div>
                ) : (
                    currentAlbums.map(album => (
                        <div key={album.album_id} className="album-item">
                            <img
                                src={album.image || faker}
                                alt={album.title}
                                className="album-image"
                            />
                            <h2 className="album-title">{album.title}</h2>
                            <p className="album-artist">John Faker</p>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={currentPage === index ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AlbumList;
