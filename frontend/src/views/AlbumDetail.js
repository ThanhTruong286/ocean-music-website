import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'swiper/css';
import "../styles/albumDetail.scss";
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import faker from "../assets/images/artists/faker.jpg";
import Swal from 'sweetalert2';
import { getAlbumById } from "../api/api";

// Hàm giải mã ID
const decryptId = (encryptedId) => {
    const decoded = decodeURIComponent(encryptedId);
    const bytes = CryptoJS.AES.decrypt(decoded, 'MIKASA');
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Load all images from the songs folder
const images = require.context('../assets/images/albums', false, /\.(jpg|jpeg|png|gif)$/);

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getAlbumsImage = (imageName) => {
    return images.keys().includes(`./${imageName}`) ? images(`./${imageName}`) : faker;
};

const AlbumDetail = () => {
    const albumId = useParams();
    const decryptedId = decryptId(albumId.id);
    const [albums, setAlbum] = useState(null);

    useEffect(() => {
        const loadAlbum = async (decryptedId) => {
            console.log("Decrypted ID:", decryptedId); // Kiểm tra giá trị của decryptedId
            if (!decryptedId) {
                console.error("Invalid decryptedId");
                return;
            }
            try {
                const response = await getAlbumById(decryptedId);
                setAlbum(response);
                console.log("Album Data in State:", response); // Kiểm tra dữ liệu trả về
            } catch (e) {
                console.error("Error get album by id:", e);
            }
        };
        loadAlbum(decryptedId);
    }, [decryptedId]);

    const albumImage = getAlbumsImage(albums?.coverImageUrl);

    return (
        <div>
            <aside className="sidebar" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <div className="album-detail__header">
                            <img
                                alt="Playlist cover image"
                                height="200"
                                src={albumImage}
                                width="200"
                            />
                            <div className="album-detail__info">
                                <p>Album</p>
                                <h1>{albums?.title}</h1>
                                <div className="album-detail__user">
                                    <img
                                        alt="User profile image"
                                        height="30"
                                        src="https://storage.googleapis.com/a1aa/image/l9hdKfl8LfsBQ0Qm6u3FiZIHo8c8gxp0B3UTiWuy55sYG4yTA.jpg"
                                        width="30"
                                    />
                                    <p>{albums?.first_name} {albums?.last_name} • 72 songs</p>
                                </div>
                            </div>
                        </div>

                        <div className="album-detail__action-buttons">
                            <button className="album-detail__action-button play">
                                <i className="fas fa-play"></i> Play
                            </button>
                            <button className="album-detail__action-button add">
                                <i className="fas fa-plus"></i> Add
                            </button>
                            <button className="album-detail__action-button edit">
                                <i className="fas fa-edit"></i> Edit
                            </button>
                            <button className="album-detail__action-button delete">
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                        <div className="album-detail__table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Album</th>
                                        <th>Date added</th>
                                        <th>
                                            <i className="far fa-clock icon"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td className="album-detail__song-title">
                                            <img alt="Song cover image" height="40" src="https://storage.googleapis.com/a1aa/image/304L1sVXxq5pMRAr3jmqbYsJFGcmis3uKzPgEpPaRrslBu8E.jpg" width="40" />
                                            <div className="album-detail__title">
                                                Four Seasons – Winter: I. Allegro Non Mo...
                                                <span>Nevermore Academy Orchestra</span>
                                            </div>
                                        </td>
                                        <td>Wednesday (Original Series Soundtrack)</td>
                                        <td>Dec 14, 2023</td>
                                        <td>0:59</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td className="album-detail__song-title">
                                            <img alt="Song cover image" height="40" src="https://storage.googleapis.com/a1aa/image/304L1sVXxq5pMRAr3jmqbYsJFGcmis3uKzPgEpPaRrslBu8E.jpg" width="40" />
                                            <div className="album-detail__title">
                                                Paint It Black
                                                <span>Wednesday Addams</span>
                                            </div>
                                        </td>
                                        <td>Wednesday (Original Series Soundtrack)</td>
                                        <td>Dec 14, 2023</td>
                                        <td>2:25</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td className="album-detail__song-title">
                                            <img alt="Song cover image" height="40" src="https://storage.googleapis.com/a1aa/image/304L1sVXxq5pMRAr3jmqbYsJFGcmis3uKzPgEpPaRrslBu8E.jpg" width="40" />
                                            <div className="album-detail__title">
                                                BẤT VẤN BIỆT LY x BALENCIAGA (REMIX)
                                                <span>JAPANDEE, THEREON</span>
                                            </div>
                                        </td>
                                        <td>BẤT VẤN BIỆT LY x BALENCIAGA (REMIX)</td>
                                        <td>Dec 7, 2023</td>
                                        <td>4:52</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td className="album-detail__song-title">
                                            <img alt="Song cover image" height="40" src="https://storage.googleapis.com/a1aa/image/304L1sVXxq5pMRAr3jmqbYsJFGcmis3uKzPgEpPaRrslBu8E.jpg" width="40" />
                                            <div className="album-detail__title">
                                                GODS
                                                <span>League of Legends, NewJeans</span>
                                            </div>
                                        </td>
                                        <td>GODS</td>
                                        <td>Nov 21, 2023</td>
                                        <td>3:40</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td className="album-detail__song-title">
                                            <img alt="Song cover image" height="40" src="https://storage.googleapis.com/a1aa/image/304L1sVXxq5pMRAr3jmqbYsJFGcmis3uKzPgEpPaRrslBu8E.jpg" width="40" />
                                            <div className="album-detail__title">
                                                Light Switch
                                                <span>Charlie Puth</span>
                                            </div>
                                        </td>
                                        <td>Light Switch</td>
                                        <td>Oct 7, 2022</td>
                                        <td>3:05</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td className="album-detail__song-title">
                                            <img alt="Song cover image" height="40" src="https://storage.googleapis.com/a1aa/image/304L1sVXxq5pMRAr3jmqbYsJFGcmis3uKzPgEpPaRrslBu8E.jpg" width="40" />
                                            <div className="album-detail__title">
                                                Light Switch
                                                <span>Charlie Puth</span>
                                            </div>
                                        </td>
                                        <td>Light Switch (Instrumental)</td>
                                        <td>Oct 7, 2022</td>
                                        <td>3:07</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AlbumDetail;
