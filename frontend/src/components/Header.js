import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../api/api";
import "../styles/header.scss";
import AdComponent from "./AdComponent";

const API_URL = 'http://localhost:5000';

// Hàm lấy hình ảnh của bài hát hoặc trả về ảnh mặc định
const getProfileImage = (imageName) => {
    // Trả về URL hình ảnh từ backend nếu có, nếu không thì dùng ảnh fallback
    return imageName ? `${API_URL}/assets/images/profiles/${imageName}` : null;
};

const Header = () => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef(null);
    const avatarRef = useRef(null);
    const location = useLocation();
    const [showAd, setShowAd] = useState(false);
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToSubscribe = () => {
        navigate('/subcribe');
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

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
                    const data = await getUser(accessToken);
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user from Spotify:', error);
                }
            }
        };

        if (accessToken) {
            fetchUser();
        }
    }, [accessToken]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && avatarRef.current && !avatarRef.current.contains(event.target)) {
                setIsPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Exclude the "Help" page from the token check
        if (location.pathname !== '/help') {
            const token = localStorage.getItem('userToken');
            if (token) {
                setAccessToken(token);
            } else {
                // Nếu không có token, điều hướng về trang đăng nhập
                navigate('/login');
            }
        }
    }, [location.pathname, navigate]);

    const renderDashboard = () => {
        if (user && user.role_id === 3) {
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/albums" onClick={goToDashboard}>
                        <span className="item-name">Albums</span>
                    </a>
                </li>
            );
        }
        return null;
    };

    const ProfileImage = user?.profile_url ? getProfileImage(user.profile_url) : null;

    return (
        <div id="header">
            <div className="position-relative">
                <nav className="nav navbar navbar-expand-xl navbar-light iq-navbar">
                    <div className="container-fluid navbar-inner">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            {/* Navigation menu */}
                            <div className="collapse navbar-collapse flex-grow-1">
                                <ul className="iq-nav-menu list-unstyled d-flex mb-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/" onClick={goToHome}>
                                            <span className="item-name">Trang Chủ</span>
                                        </a>
                                    </li>
                                    {renderDashboard()}
                    
                                    <li className="nav-item">
                                        <a className="nav-link" href="/subcribe" onClick={goToSubscribe}>
                                            <span className="item-name">Gói trả phí</span>
                                        </a>
                                    </li>
                                    {/* Search Box */}
                                    <div className="search-box d-xl-block d-none ms-3">
                                        <div className="dropdown">
                                            <div className="search-box-drop" id="search-box-drop">
                                                <div className="d-flex align-items-center justify-content-between gap-2">
                                                    <div className="search-box-inner">
                                                        <button type="submit" className="search-box-drop-submit">
                                                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                                                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </svg>
                                                        </button>
                                                        <input id="search-field" type="text" placeholder="Search here ..." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                            {/* Avatar and Popup */}
                            {accessToken ? (
                                <div className="avatar-container" onClick={togglePopup} ref={avatarRef}>
                                    <img
                                        src={user && user.profile_url ? ProfileImage : null}
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
                                <button className="btn btn-primary" onClick={() => navigate('/login')}>Đăng nhập</button>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            {user && user.is_vip === 0 && <AdComponent is_vip={user.is_vip} />}
        </div>
    );
};

export default Header;
