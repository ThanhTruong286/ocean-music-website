import React, { useEffect, useState } from 'react';
import faker from "../assets/images/artists/faker.jpg";
import { getUser, getArtistAlbums } from "../api/api";
import '../styles/album.scss';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';  // Make sure CryptoJS is imported for encryption

// Load all images from the songs folder
const images = require.context('../assets/images/albums', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getAlbumsImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

// Hàm mã hóa ID
const SECRET_KEY = 'MIKASA';

const encryptId = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
};

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [albumError, setAlbumError] = useState(null);
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [showAll, setShowAll] = useState(false);  // State to toggle show all albums

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Number of albums per page

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setAccessToken(token);
        } else {
            console.error('No access token found');
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (accessToken) {
                try {
                    const data = await getUser();
                    setUser(data);  // Set user state with the fetched data
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        if (accessToken) {
            fetchUser();
        }
    }, [accessToken]); // Only run this effect when accessToken changes

    useEffect(() => {
        const fetchAlbums = async () => {
            if (user && user.user_id) {  // Ensure user is not null before calling the API
                try {
                    const data = await getArtistAlbums(user.user_id);
                    setAlbums(data);
                } catch (error) {
                    setAlbumError('Error fetching albums:', error);
                } finally {
                    setLoadingAlbums(false);
                }
            }
        };

        // Only call fetchAlbums if user has been successfully fetched
        if (user && user.user_id) {
            fetchAlbums();
        }
    }, [user]); // This effect will run when user state changes

    // Calculate total pages
    const totalPages = Math.ceil(albums.length / itemsPerPage);

    // Check if current page is valid after adding new album
    useEffect(() => {
        if (currentPage >= totalPages && totalPages > 0) {
            setCurrentPage(totalPages - 1);
        }
    }, [albums, totalPages, currentPage]);

    // Get the albums for the current page
    const currentAlbums = showAll ? albums : albums.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Handle pagination
    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    // Handle Show All
    const handleShowAll = () => {
        setShowAll(!showAll);  // Toggle between showing all albums or paginated albums
    };

    // Handle redirect to album detail page with encrypted ID
    const handleAlbumClick = (albumId) => {
        const encryptedId = encryptId(albumId);  // Encrypt the albumId
        navigate(`/albums/${encryptedId}`);  // Redirect to the album detail page with encrypted ID
    };
    const handleNavigateSongs = () => {
        navigate('/songs');
    }

    return (
        <div>
            <div className="album-header">
                <h4 className="card-title text-capitalize ms-5">Albums</h4>
                {/* Show All and Add Album Buttons */}
                <div className="album-actions">
                    <button onClick={handleShowAll} className="button">
                        {showAll ? 'Show Paginated' : 'Show All'}
                    </button>
                    <button className="button">
                        Add Album
                    </button>
                    <button onClick={() => handleNavigateSongs()} className="button">
                        Add New Songs
                    </button>
                </div>
            </div>

            <div className="album-list">
                {/* Album Loading & Error State */}
                {loadingAlbums ? (
                    <div>Loading albums...</div>
                ) : albumError ? (
                    <div>Error: {albumError}</div>
                ) : (
                    currentAlbums.map(album => {
                        const albumsImage = getAlbumsImage(album.cover_image_url);
                        return (
                            <div key={album.album_id} className="album-item">
                                <img
                                    src={albumsImage || faker}
                                    alt={album.title}
                                    className="album-image"
                                />
                                <h2
                                    style={{ cursor: "pointer" }}
                                    className="album-title"
                                    onClick={() => handleAlbumClick(album.album_id)}  // Add click handler
                                >
                                    {album.title}
                                </h2>
                                <p className="album-artist">{user?.first_name} {user?.last_name}</p>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination Controls */}
            {!showAll && (
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
            )}
        </div>
    );
};

export default AlbumList;
