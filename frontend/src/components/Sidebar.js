import "../styles/sidebar.scss";
import logo from "../assets/images/logo.png";

const Sidebar = () => {
    return (
        <div>
            <div className="sidebar-body pt-0 data-scrollbar">
                {/* Logo section */}
                <div className="sidebar-header d-flex align-items-center">
                    <a href="#" className="navbar-brand">
                        <div className="logo-main">
                            <img src={logo} alt="Logo" className="logo-img" />
                        </div>
                    </a>
                </div>
                <div className="scroll-content">
                    <div className="sidebar-list">
                        {/* sidebar-menu start */}
                        <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
                            <li className="nav-item static-item mt-5">
                                <a href="#" className="nav-link static-item disabled text-start">
                                    <span className="custom-icon default-icon text-uppercase">Main</span>
                                </a>
                            </li>
                            {/* Khám Phá */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i className="fa-solid fa-earth-americas"></i>
                                    <span className="item-name">Khám Phá</span>
                                </a>
                            </li>
                            {/* Nghệ Sĩ */}
                            <li className="nav-item">
                                <a href="/artist" className="nav-link collapsed">
                                    <i className="fa-solid fa-user"></i>
                                    <span className="item-name">Nghệ Sĩ</span>
                                </a>
                            </li>
                            {/* Thư Viện */}
                            <li className="nav-item">
                                <a href="/playlist" className="nav-link collapsed">
                                    <i className="fa-solid fa-music"></i>
                                    <span className="item-name">Thư Viện</span>
                                </a>
                            </li>
                            {/* Charts */}
                            <li className="nav-item">
                                <a href="/chart" className="nav-link collapsed">
                                    <i className="fa-solid fa-chart-line"></i>
                                    <span className="item-name">Biểu Đồ</span>
                                </a>
                            </li>
                            {/* Lịch Sử */}
                            <li className="nav-item">
                                <a href="/help" className="nav-link collapsed">
                                    <i className="fa-solid fa-question-circle"></i>
                                    <span className="item-name">Hỗ Trợ</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/user-ticket" className="nav-link collapsed">
                                    <i className="fa-solid fa-question-circle"></i>
                                    <span className="item-name">Theo Dõi Phiếu</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/chatbot" className="nav-link collapsed">
                                    <i className="fa-solid fa-question-circle"></i>
                                    <span className="item-name">Chat Bot</span>
                                </a>
                            </li>
                            {/* Cài Đặt */}
                            <li className="nav-item static-item mt-5">
                                <a href="#" className="nav-link static-item disabled text-start">
                                    <span className="custom-icon default-icon text-uppercase">Cài Đặt</span>
                                </a>
                            </li>
                            {/* Cài đặt chung */}
                            <li className="nav-item">
                                <a href="/general-setting" className="nav-link collapsed">
                                    <i className="fa-solid fa-gear"></i>
                                    <span className="item-name">Cài Đặt Chung</span>
                                </a>
                            </li>
                            {/* Cài đặt tài khoản */}
                            <li className="nav-item">
                                <a href="/setting-profile" className="nav-link collapsed">
                                    <i className="fa-solid fa-user"></i>
                                    <span className="item-name">Cài Đặt Tài Khoản</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar