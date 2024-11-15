import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import faker from "../assets/images/artists/faker.jpg";
import ArtistList from "../components/ArtistList";
import Sidebar from "../components/Sidebar";
import RadioList from "../components/RadioList";
import TrendingList from "../components/TrendingList";
import RecentlyPlayedList from "../components/RecentlyPlayedList";
import Footer from "../components/Footer";
import 'swiper/css';
import ArtistPlaylist from "../components/ArtistPlaylist";
import { useNavigate } from 'react-router-dom';
import "../styles/playlist.scss"

const PlaylistDetail = () => {
    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div class="container">
                        <div class="header">
                            <img alt="Album cover image" height="200" src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg" width="200" />
                            <div class="details">
                                <p>
                                    Playlist
                                </p>
                                <h1>
                                    G6
                                </h1>
                                <p>
                                    Đỗ Vương • 1 song, 3 min 51 sec
                                </p>
                            </div>
                        </div>
                        <div class="controls">
                            <button class="play-button">
                                <i class="fas fa-play">
                                </i>
                            </button>
                        </div>
                        <table class="song-list">
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Album
                                    </th>
                                    <th>
                                        Date added
                                    </th>
                                    <th>
                                        <i class="far fa-clock">
                                        </i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <img alt="Album cover image" height="40" src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg" width="40" />
                                        <span>
                                            Style
                                        </span>
                                        <br />
                                        <span>
                                            Taylor Swift
                                        </span>
                                    </td>
                                    <td>
                                        1989 (Deluxe)
                                    </td>
                                    <td>
                                        Apr 26, 2020
                                    </td>
                                    <td>
                                        3:51
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="recommended">
                            <h2>
                                Recommended
                            </h2>
                            <p>
                                Based on what's in this playlist
                            </p>
                            <div class="song">
                                <div class="details">
                                    <img alt="Album cover image" height="40" src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg" width="40" />
                                    <div>
                                        <p class="title">
                                            Blank Space
                                        </p>
                                        <p class="artist">
                                            Taylor Swift
                                        </p>
                                    </div>
                                </div>
                                <button class="add-button">
                                    Add
                                </button>
                            </div>
                            <div class="song">
                                <div class="details">
                                    <img alt="Album cover image" height="40" src="https://storage.googleapis.com/a1aa/image/qAdhwvaYqposKVmv7oUfnfDL6utHe7Q5eELtOR2FUrmDtwEPB.jpg" width="40" />
                                    <div>
                                        <p class="title">
                                            Wildest Dreams
                                        </p>
                                        <p class="artist">
                                            Taylor Swift
                                        </p>
                                    </div>
                                </div>
                                <button class="add-button">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </main>
            <Footer />
        </div>
    )
}
export default PlaylistDetail