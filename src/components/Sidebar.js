import "../styles/global.scss";
import logo from '../assets/images/logo.png'; // Import hình ảnh
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    return (
        <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
            <div className="sidebar-header d-flex align-items-center justify-content-center">
                <a href="#" className="navbar-brand">
                    {/* LOGO */}
                    <div className="logo-main">
                        <img src={logo} alt="Logo" className="logo-img" />
                    </div>
                </a>
            </div>
            <div className="sidebar-body pt-0 data-scrollbar">
                <div className="scroll-content">
                    <div className="sidebar-list">
                        {/* sidebar-menu start */}
                        <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
                            <li className="nav-item static-item mt-5">
                                <a href="#" className="nav-link static-item disabled text-start">
                                    <span className="custom-icon default-icon text-uppercase">Main</span>
                                </a>
                            </li>
                            {/* HOME*/}
                            <li className="nav-item active">
                                <a href="#" className="nav-link active collapsed">
                                    <i className="fa-solid fa-house"></i>
                                    <span className="item-name">Trang Chủ</span>
                                </a>
                            </li>
                            {/* Khám Phá */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-earth-americas"></i>
                                    <span className="item-name">Khám Phá</span>
                                </a>
                            </li>
                            {/* Nghệ Sĩ */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-user"></i>
                                    <span className="item-name">Nghệ Sĩ</span>
                                </a>
                            </li>
                            {/* Thư Viện */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-music"></i>
                                    <span className="item-name">Thư Viện</span>
                                </a>
                            </li>
                            {/* Charts */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-chart-line"></i>
                                    <span className="item-name">Biểu Đồ</span>
                                </a>
                            </li>
                            {/* Lịch Sử */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-rotate"></i>
                                    <span className="item-name">Lịch Sử</span>
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
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-gear"></i>
                                    <span className="item-name">Cài Đặt Chung</span>
                                </a>
                            </li>
                            {/* Cài đặt tài khoản */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <i class="fa-solid fa-user"></i>
                                    <span className="item-name">Cài Đặt Tài Khoản</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar