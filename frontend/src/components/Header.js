import React, { useState, useEffect, useRef } from "react";
import { logoutUser, getUser } from "../api/api"; // Import API functions
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

const Header = () => {
    const [user, setUser] = useState(null); // User state
    const [loading, setLoading] = useState(true); // Loading state
    const [isPopupVisible, setPopupVisible] = useState(false); // Popup visibility state
    const popupRef = useRef(null); // Reference for the popup
    const navigate = useNavigate(); // Hook for navigation

    // Logout handler
    const handleLogout = async () => {
        try {
            await logoutUser(); // Call logout API
            sessionStorage.removeItem('userToken'); // Remove user token from session storage
            sessionStorage.removeItem('user'); // Remove user info from session storage
            setUser(null); // Reset user state
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const userData = await getUser(); // Fetch user data
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null); // Set user to null if error occurs
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    const handleProfileClick = async (e) => {
        try {
            // Gọi hàm để lấy thông tin người dùng
            await getUser(user.userId);

            // Chuyển hướng đến trang profile
            navigate('/profile');
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Xử lý lỗi nếu cần
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []); // Runs once on mount

    // Toggle popup visibility
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible); // Toggle popup visibility
    };

    // Close popup if clicking outside
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setPopupVisible(false); // Close popup on outside click
        }
    };

    // Listen for outside click event when popup is open
    useEffect(() => {
        if (isPopupVisible) {
            document.addEventListener("mousedown", handleClickOutside); // Add event listener
        } else {
            document.removeEventListener("mousedown", handleClickOutside); // Remove event listener
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
        };
    }, [isPopupVisible]);

    // Show loading state if loading
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="position-relative">
            <nav className="nav navbar navbar-expand-xl navbar-light iq-navbar">
                <div className="container-fluid navbar-inner">
                    <div className="collapse navbar-collapse">
                        <div className="d-flex align-items-center justify-content-between product-offcanvas">
                            <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                            
                                
                                        <li className="nav-item">
                                    <a className="nav-link active" href="/">
                                        <span className="item-name">Trang Chủ</span>
                                    </a>
                                </li>
                                {user ? ( // Check if user is logged in
                                    <>
                                        {user.role_id === 1 && ( // Admin role check
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin">Admin</a>
                                            </li>
                                        )}
                                <li className="nav-item">
                                    <a className="nav-link" href="/albums">
                                        <span className="item-name">Albums</span>
                                    </a>
                                </li>
                                
                                    </>
                                ) : (
                                    <li className="nav-item">
                                    <a className="nav-link" href="/albums">
                                        <span className="item-name">Albums</span>
                                    </a>
                                </li>
                                )}
                            </ul>
                        </div>
                         {/** Thanh tìm kiếm luôn hiển thị */}
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
                                            <input id="search-field" type="text" placeholder="Search here ... " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                            {user ? ( // Kiểm tra nếu người dùng đã đăng nhập
                                <>
                                    {/** Nofications */}
                                    <li className="nav-item dropdown">
                                        <a href="#" className="nav-link p-0 ps-3" id="notification-drop">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <g clipPath="url(#clip0_549_1304)">
                                                    <path d="M7.5 15C7.5 15.663 7.76339 16.2989 8.23223 16.7678C8.70107 17.2366 9.33696 17.5 10 17.5C10.663 17.5 11.2989 17.2366 11.7678 16.7678C12.2366 16.2989 12.5 15.663 12.5 15" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M4.37502 8.125C4.37502 6.63316 4.96766 5.20242 6.02255 4.14752C7.07744 3.09263 8.50818 2.5 10 2.5C11.4919 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 10.9234 16.2735 13.1719 16.7891 14.0625C16.8439 14.1574 16.8727 14.2649 16.8728 14.3744C16.8729 14.484 16.8442 14.5916 16.7896 14.6865C16.735 14.7815 16.6565 14.8604 16.5618 14.9154C16.467 14.9705 16.3595 14.9996 16.25 15H3.75002C3.64063 14.9993 3.53333 14.97 3.43884 14.9149C3.34435 14.8597 3.26599 14.7808 3.21158 14.6859C3.15717 14.591 3.12862 14.4835 3.12878 14.3741C3.12895 14.2647 3.15783 14.1572 3.21252 14.0625C3.72737 13.1719 4.37502 10.9227 4.37502 8.125Z" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="14.2803" cy="2.91665" r="2.58333" fill="#EF3E36" stroke="white" />
                                                </g>
                                            </svg>
                                        </a>
                                        <ul className="p-0 sub-drop dropdown-menu dropdown-menu-end">

                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div className="avatar-container" onClick={togglePopup}>
                                            <img
                                                src={avatar}
                                                alt="User-Profile"
                                                className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                                loading="lazy"
                                                id="avatar"
                                            />
                                            <div className="iq-profile-badge bg-success"></div>

                                            {isPopupVisible && ( // Hiển thị popup nếu popup đang mở
                                                <div className="logout-popup" ref={popupRef}>
                                                    <ul>
                                                        <li><a href="/profile" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleProfileClick(); }}>Profile</a></li>
                                                        <li><a href="/privacy" className="dropdown-item">Privacy Setting</a></li>
                                                        <li><a href="/logout" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <a href="/login" className="header-btn">Login</a>
                                    <a href="/register" className="header-btn">Register</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
                  