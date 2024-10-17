import "../styles/global.scss";
import logo from '../assets/images/logo.png'; // Import hình ảnh

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
                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor"></path>
                                    </svg>
                                    <span className="item-name">Home</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* ADMIN */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" fill="currentColor" />
                                    </svg>
                                    <span className="item-name">Admin</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* SPECIAL PAGES */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.92574 16.39H14.3119C14.7178 16.39 15.0545 16.05 15.0545 15.64C15.0545 15.23 14.7178 14.9 14.3119 14.9H8.92574C8.5198 14.9 8.18317 15.23 8.18317 15.64C8.18317 16.05 8.5198 16.39 8.92574 16.39ZM12.2723 9.9H8.92574C8.5198 9.9 8.18317 10.24 8.18317 10.65C8.18317 11.06 8.5198 11.39 8.92574 11.39H12.2723C12.6782 11.39 13.0149 11.06 13.0149 10.65C13.0149 10.24 12.6782 9.9 12.2723 9.9ZM19.3381 9.02561C19.5708 9.02292 19.8242 9.02 20.0545 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0545 22H8.17327C5.59901 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5099 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4381 9.02 17.8112 9.02316 18.1377 9.02593C18.3917 9.02809 18.6175 9.03 18.8168 9.03C18.9578 9.03 19.1405 9.02789 19.3381 9.02561ZM19.6111 7.566C18.7972 7.569 17.8378 7.566 17.1477 7.559C16.0527 7.559 15.1507 6.648 15.1507 5.542V2.906C15.1507 2.475 15.6685 2.261 15.9646 2.572C16.5004 3.13476 17.2368 3.90834 17.9699 4.67837C18.7009 5.44632 19.4286 6.21074 19.9507 6.759C20.2398 7.062 20.0279 7.565 19.6111 7.566Z" fill="currentColor" />
                                    </svg>
                                    <span className="item-name">Special Pages</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/*AUTH SKINS */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Auth Skins</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* USERS */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Users</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* UTILITIES */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Utilities</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* PLUGINS */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Plugins</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* BLANK PAGE */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Blank Page</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* UI ELEMENTS */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">UI Elements</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* Widgets */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Widgets</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* MAPS */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Maps</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* FORM */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Forms</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* TABLES */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Tables</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* ICONS */}
                            <li className="nav-item">
                                <a href="#" className="nav-link collapsed">
                                    <span className="item-name">Icons</span>
                                </a>
                                <ul className="sub-nav collapse" id="home-menu">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <span className="item-name">Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar