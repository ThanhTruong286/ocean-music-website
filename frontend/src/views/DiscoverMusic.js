import React, { useEffect, useState } from 'react';
import Header from "../components/Header";

import Sidebar from "../components/Sidebar";

import Footer from "../components/Footer";
import '../styles/discover-music.scss'; // SCSS for styling 
import playIcon from '../assets/play-button.png'; // Icon for play button

const Home = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [filter, setFilter] = useState('All'); // Filters for new releases

    // Mock data for recently played songs
    const mockRecentlyPlayed = [
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'Song One',
            artist: 'Artist One',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'Song Two',
            artist: 'Artist Two',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'Song Three',
            artist: 'Artist Three',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'Song Four',
            artist: 'Artist Four',
        },
    ];

    // Mock data for new releases
    const mockNewReleases = [
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release One',
            artist: 'Artist One',
            region: 'Vietnam',
            duration: '3:15',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Two',
            artist: 'Artist Two',
            region: 'International',
            duration: '4:05',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Three',
            artist: 'Artist Three',
            region: 'Vietnam',
            duration: '2:45',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Four',
            artist: 'Artist Four',
            region: 'International',
            duration: '3:30',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Five',
            artist: 'Artist Five',
            region: 'Vietnam',
            duration: '4:00',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Six',
            artist: 'Artist Six',
            region: 'International',
            duration: '3:50',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Seven',
            artist: 'Artist Seven',
            region: 'Vietnam',
            duration: '2:55',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Eight',
            artist: 'Artist Eight',
            region: 'International',
            duration: '3:20',
        },
        {
            albumCover: 'https://via.placeholder.com/100',
            title: 'New Release Nine',
            artist: 'Artist Nine',
            region: 'Vietnam',
            duration: '3:40',
        },
    ];

    useEffect(() => {
        // Using mock data instead of fetch functions for testing
        setRecentlyPlayed(mockRecentlyPlayed);
        setNewReleases(mockNewReleases);
    }, []);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="discover-music">
                        <section className="recently-played">
                            <h2>Đã nghe gần đây</h2>
                            <div className="recently-played-list">
                                {recentlyPlayed.map((song, index) => (
                                    <div key={index} className="recently-played-item">
                                        <img src={song.albumCover} alt={song.title} className="album-cover" />
                                        <p className="song-title">{song.title}</p>
                                        <p className="artist-name">{song.artist}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="new-releases">
                            <h2>Mới phát hành</h2>
                            <div className="filter-buttons">
                                <button
                                    onClick={() => handleFilterChange('All')}
                                    className={filter === 'All' ? 'active' : ''}
                                >
                                    Tất cả
                                </button>
                                <button
                                    onClick={() => handleFilterChange('Vietnam')}
                                    className={filter === 'Vietnam' ? 'active' : ''}
                                >
                                    Việt Nam
                                </button>
                                <button
                                    onClick={() => handleFilterChange('International')}
                                    className={filter === 'International' ? 'active' : ''}
                                >
                                    Quốc Tế
                                </button>
                            </div>

                            <div className="new-releases-list">
                                {newReleases
                                    .filter(song => filter === 'All' || song.region === filter)
                                    .map((song, index) => (
                                        <div key={index} className="new-release-item">
                                            <img src={song.albumCover} alt={song.title} className="album-cover" />
                                            <div className="song-info">
                                                <p className="song-title">{song.title}</p>
                                                <p className="artist-name">{song.artist}</p>
                                            </div>
                                            <p className="duration">{song.duration}</p>
                                            <img src={playIcon} alt="Play" className="play-icon" />
                                        </div>
                                    ))}
                            </div>
                        </section>
                    </div>

                </div >
            </main>
            <Footer />
        </div>
    )
}
export default Home