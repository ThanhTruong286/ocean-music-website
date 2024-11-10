import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSpotifyUser } from "../api/api"; // Giả sử fetchSpotifyUser là hàm lấy thông tin người dùng từ Spotify API
import faker from "../assets/images/artists/faker.jpg";

const Header = () => {
    const [user, setUser] = useState(null); // State để lưu thông tin người dùng
    const [accessToken, setAccessToken] = useState(null); // State lưu token truy cập
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State để điều khiển việc hiển thị popup
    const popupRef = useRef(null); // Dùng để tham chiếu đến popup
    const avatarRef = useRef(null); // Dùng để tham chiếu đến avatar (nếu cần)
    const navigate = useNavigate(); // Hook cho việc điều hướng

    // Hàm xử lý khi click vào Home
    const goToHome = () => {
        navigate('/');
    };

    // Hàm xử lý khi click vào Albums
    const goToAlbums = () => {
        navigate('/albums');
    };

    // Hàm xử lý khi click vào Premium
    const goToSubscribe = () => {
        navigate('/subcribe');
    };

    // Hàm xử lý click vào avatar để toggle popup
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    // Hàm xử lý click vào Profile trong popup
    const handleProfileClick = () => {
        // Điều hướng đến trang Profile
        navigate('/profile');
    };

    // Hàm xử lý Logout trong popup
    const handleLogout = () => {
        // Xử lý logout, có thể clear sessionStorage và redirect về trang chủ
        localStorage.removeItem('spotifyToken');
        navigate('/login'); // Điều hướng tới trang login
    };

    // Lấy accessToken từ sessionStorage hoặc từ props/context nếu bạn có
    useEffect(() => {
        const token = localStorage.getItem('spotifyToken'); // Lấy accessToken từ localStorage
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
                    const data = await fetchSpotifyUser(accessToken); // Gọi API lấy thông tin người dùng
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user from Spotify:', error);
                }
            }
        };

        if (accessToken) {
            fetchUser();
        }
    }, [accessToken]); // Chạy lại khi accessToken thay đổi

    // Hàm xử lý sự kiện click bên ngoài để đóng popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra xem người dùng có click ngoài popup và avatar không
            if (popupRef.current && !popupRef.current.contains(event.target) && avatarRef.current && !avatarRef.current.contains(event.target)) {
                setIsPopupVisible(false); // Đóng popup khi click ra ngoài
            }
        };

        // Lắng nghe sự kiện click trên toàn bộ document
        document.addEventListener('mousedown', handleClickOutside);

        // Dọn dẹp sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="position-relative">
            <nav className="nav navbar navbar-expand-xl navbar-light iq-navbar">
                <div className="container-fluid navbar-inner">
                    <div className="collapse navbar-collapse">
                        <div className="d-flex align-items-center justify-content-between product-offcanvas">
                            <ul className="iq-nav-menu list-unstyled">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/" onClick={goToHome}>
                                        <span className="item-name">Home</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/albums" onClick={goToAlbums}>
                                        <span className="item-name">Albums</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/subcribe" onClick={goToSubscribe}>
                                        <span className="item-name">Get Premium</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="search-box d-xl-block d-none">
                            <div className="dropdown">
                                <div className="search-box-drop" id="search-box-drop">
                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                        <div className="search-box-inner">
                                            <button type="submit" className="search-box-drop-submit">
                                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24">
                                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5"
                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5"
                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <input id="search-field" type="text" placeholder="Search here ..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hiển thị avatar nếu đã login, nếu không hiển thị nút Login */}
                    {accessToken ? (
                        <div className="avatar-container" onClick={togglePopup} ref={avatarRef}>
                            <img
                                src={user && user.images && user.images.length > 0 ? user.images[0].url : faker} // Lấy avatar từ Spotify hoặc dùng ảnh mặc định
                                alt="User-Profile"
                                className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                loading="lazy"
                                id="avatar"
                            />
                            <div className="iq-profile-badge bg-success"></div>

                            {isPopupVisible && (
                                <div className="logout-popup" ref={popupRef}>
                                    <ul>
                                        <li><a href="/profile" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleProfileClick(); }}>Profile</a></li>
                                        <li><a href="/privacy" className="dropdown-item">Privacy Setting</a></li>
                                        <li><a href="/logout" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
