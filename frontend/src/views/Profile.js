import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/global.scss";
import faker from "../assets/images/artists/faker.jpg";
import peanut from "../assets/images/artists/peanut.jpg";
import { useEffect, useState } from "react";
import { getUser } from "../api/api";

const Profile = () => {

    const [user, setUser] = useState(null);
    const [e, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUser(); // Thêm await ở đây
                setUser(data); // Lưu dữ liệu user vào state
            }
            catch (error) {
                setError("Không tìm thấy user");
            }
            finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    if (e) {
        return <div>Error: {e}</div>;
    }
    if (loading) {
        return <div>Loading ...</div>;
    }
    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="profile">
                    <Header />
                    <div className="content-inner pb-0 container-fluid" id="page_layout">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                                            <div className="d-flex flex-wrap align-items-center">
                                                <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                                                    <img src={faker} alt="User-Profile" className="theme-color-default-img img-fluid rounded-pill avatar-100" loading="lazy" />
                                                </div>
                                                <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                                                    <h4 id="fullname" className="me-2 h4">{user.first_name} {user.last_name} - <span>{user.username}</span></h4>
                                                </div>
                                            </div>
                                            <ul className="d-flex nav nav-pills mb-0 text-center profile-tab nav-slider" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link show" data-bs-toggle="tab" href="#profile-feed" role="tab" aria-selected="false" tabIndex="-1">Feed</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" data-bs-toggle="tab" href="#profile-activity" role="tab" aria-selected="false" tabIndex="-1">Activity</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" data-bs-toggle="tab" href="#profile-friends" role="tab" aria-selected="false" tabIndex="-1">Friends</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" data-bs-toggle="tab" href="#profile-profile" role="tab" aria-selected="true">Profile</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/** NEWS */}
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="header-title">
                                            <h4 className="card-title">News</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-inline m-0 p-0">
                                            <li className="d-flex mb-2">
                                                <div className="news-icon me-3">
                                                    <svg width="20" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z"></path>
                                                    </svg>
                                                </div>
                                                <p className="news-detail mb-0">there is a meetup in your city on fryday at 19:00. <a href="#">see details</a></p>
                                            </li>
                                            <li className="d-flex">
                                                <div className="news-icon me-3">
                                                    <svg width="20" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z"></path>
                                                    </svg>
                                                </div>
                                                <p className="news-detail mb-0">20% off coupon on selected items at pharmaprix </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="header-title">
                                            <h4 className="card-title">Twitter Feeds</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="twit-feed">
                                            <div className="d-flex align-items-center mb-2">
                                                <img className="rounded-pill img-fluid avatar-50 me-3 p-1 bg-soft-danger ps-2" src="../../assets/images/dashboard/56.png" alt="" loading="lazy" />
                                                <div className="media-support-info">
                                                    <h6 className="mb-0">Wade Warren</h6>
                                                    <p className="mb-0">@wade007
                                                        <span className="text-primary">
                                                            <svg width="15" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                                                            </svg>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="media-support-body">
                                                <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                                <div className="d-flex flex-wrap">
                                                    <a href="#" className="twit-meta-tag pe-2">#Html</a>
                                                    <a href="#" className="twit-meta-tag pe-2">#Bootstrap</a>
                                                </div>
                                                <div className="twit-date">07 Jan 2021</div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="twit-feed">
                                            <div className="d-flex align-items-center mb-2">
                                                <img className="rounded-pill img-fluid avatar-50 me-3 p-1 bg-soft-primary" src="../../assets/images/dashboard/55.png" alt="" loading="lazy" />
                                                <div className="media-support-info">
                                                    <h6 className="mb-0">Jane Cooper</h6>
                                                    <p className="mb-0">@jane59
                                                        <span className="text-primary">
                                                            <svg width="15" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                                                            </svg>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="media-support-body">
                                                <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                                <div className="d-flex flex-wrap">
                                                    <a href="#" className="twit-meta-tag pe-2">#Js</a>
                                                    <a href="#" className="twit-meta-tag pe-2">#Bootstrap</a>
                                                </div>
                                                <div className="twit-date">18 Feb 2021</div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="twit-feed">
                                            <div className="d-flex align-items-center mb-2">
                                                <img className="rounded-pill img-fluid avatar-50 me-3 p-1 bg-soft-warning pt-2" src="../../assets/images/dashboard/56.png" alt="" loading="lazy" />
                                                <div className="mt-2">
                                                    <h6 className="mb-0">Guy Hawkins</h6>
                                                    <p className="mb-0">@hawk_g
                                                        <span className="text-primary">
                                                            <svg width="15" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                                                            </svg>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="media-support-body">
                                                <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                                <div className="d-flex flex-wrap">
                                                    <a href="#" className="twit-meta-tag pe-2">#Html</a>
                                                    <a href="#" className="twit-meta-tag pe-2">#CSS</a>
                                                </div>
                                                <div className="twit-date">15 Mar 2021</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/** OTHER USER PROFILE */}
                            <div className="col-lg-6">
                                <div className="profile-content tab-content iq-tab-fade-up">
                                    <div id="profile-feed" className="tab-pane fade" role="tabpanel">
                                    </div>
                                    <div id="profile-profile" className="tab-pane fade active show" role="tabpanel">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="header-title">
                                                    <h4 className="card-title">Profile</h4>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <div>
                                                        <img src={peanut} alt="profile-img" className="rounded-pill avatar-130 img-fluid" loading="lazy" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3 className="d-inline-block" id="fullname">WANG-HO - <span>Jungle</span></h3>

                                                        <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="header-title">
                                                    <h4 className="card-title">About User</h4>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="user-bio">
                                                    <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.</p>
                                                </div>
                                                <div className="mt-2">
                                                    <h6 className="mb-1">Joined:</h6>
                                                    <p>Feb 15, 2021</p>
                                                </div>
                                                <div className="mt-2">
                                                    <h6 className="mb-1">Lives:</h6>
                                                    <p>United States of America</p>
                                                </div>
                                                <div className="mt-2">
                                                    <h6 className="mb-1">Email:</h6>
                                                    <p><a href="#" className="text-body"> austin@gmail.com</a></p>
                                                </div>
                                                <div className="mt-2">
                                                    <h6 className="mb-1">Url:</h6>
                                                    <p><a href="#" className="text-body" target="_blank"> www.bootstrap.com </a></p>
                                                </div>
                                                <div className="mt-2">
                                                    <h6 className="mb-1">Contact:</h6>
                                                    <p><a href="#" className="text-body">(001) 4544 565 456</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="header-title">
                                            <h4 className="card-title">About</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p>I'm MidKing</p>
                                        <div className="mb-1">Email: <a href="#" className="ms-3">{user.email}</a></div>
                                        <div className="mb-1">Loại tài khoản: <a href="#" className="ms-3">{user.subscription_name || "Thường"}</a></div>
                                        <div>Hết hạn lúc: <span>10:00</span></div>
                                        <hr />
                                        <ul className="d-flex nav nav-pills mb-0 text-center profile-tab nav-slider" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" data-bs-toggle="tab" href="change-password" role="tab" aria-selected="true">Change Password</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="header-title">
                                            <h4 className="card-title">Stories</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-inline m-0 p-0">
                                            <li className="d-flex mb-4 align-items-center active">
                                                <img src={faker} alt="story-img" className="rounded-pill avatar-70 p-1 border bg-soft-light img-fluid" loading="lazy" />
                                                <div className="ms-3">
                                                    <h5>User 1</h5>
                                                    <p className="mb-0">1 hour ago</p>
                                                </div>
                                            </li>
                                            <li className="d-flex mb-4 align-items-center">
                                                <img src={faker} alt="story-img" className="rounded-pill avatar-70 p-1 border img-fluid bg-soft-danger" loading="lazy" />
                                                <div className="ms-3">
                                                    <h5>User 2</h5>
                                                    <p className="mb-0">4 hour ago</p>
                                                </div>
                                            </li>
                                            <li className="d-flex align-items-center">
                                                <img src={faker} alt="story-img" className="rounded-pill avatar-70 p-1 border bg-soft-primary img-fluid" loading="lazy" />
                                                <div className="ms-3">
                                                    <h5>User 3</h5>
                                                    <p className="mb-0">9 hour ago</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="header-title">
                                            <h4 className="card-title">Suggestions</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-inline m-0 p-0">
                                            <li className="d-flex mb-4 align-items-center">
                                                <div className="img-fluid bg-soft-info rounded-pill"><img src={faker} alt="story-img" className="rounded-pill avatar-40" loading="lazy" /></div>
                                                <div className="ms-3 flex-grow-1">
                                                    <h6>Bessie Cooper</h6>
                                                    <p className="mb-0">1 mutual friends</p>
                                                </div>
                                                <a href="javascript:void(0);" className="btn btn-outline-primary rounded-circle btn-icon btn-sm p-2">
                                                    <span className="btn-inner">
                                                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M19.2036 8.66919V12.6792" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M21.2497 10.6741H17.1597" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="card border-top mb-0">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between flex-md-row flex-column gap-3">
                                            <div>
                                                <ul className="list-unstyled p-0 m-0 mb-3 text-capitalize d-flex gap-3 flex-md-nowrap flex-wrap">
                                                    <li>about</li>
                                                    <li>|</li>
                                                    <li>terms of use</li>
                                                    <li>|</li>
                                                    <li>privacy policy</li>
                                                    <li>|</li>
                                                    <li>support</li>
                                                    <li>|</li>
                                                    <li>feedback</li>
                                                    <li>|</li>
                                                </ul>
                                                <small>
                                                    Copyright 2024 . Made with love by HOPI.
                                                </small>
                                            </div>
                                            <div>
                                                <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-3">
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M5.026 15C11.064 15 14.367 9.99702 14.367 5.66602C14.367 5.52602 14.367 5.38402 14.361 5.24402C15.0041 4.77851 15.5591 4.20217 16 3.54202C15.3993 3.80687 14.7628 3.98143 14.111 4.06002C14.7975 3.64966 15.3117 3.00399 15.558 2.24302C14.913 2.62515 14.207 2.8934 13.471 3.03602C12.9762 2.50905 12.3214 2.15994 11.6081 2.04278C10.8948 1.92562 10.1627 2.04694 9.52534 2.38796C8.88796 2.72897 8.38081 3.27065 8.08245 3.92908C7.78409 4.58751 7.71118 5.32595 7.875 6.03002C6.56974 5.96457 5.29282 5.62549 4.12704 5.03476C2.96127 4.44404 1.93268 3.61487 1.108 2.60102C0.68934 3.3241 0.561574 4.17942 0.750646 4.99329C0.939718 5.80715 1.43145 6.51855 2.126 6.98302C1.60554 6.96534 1.09652 6.82558 0.64 6.57502V6.62002C0.640897 7.3775 0.903307 8.11144 1.38287 8.69778C1.86244 9.28412 2.52975 9.68689 3.272 9.83802C2.99026 9.91564 2.69923 9.95433 2.407 9.95302C2.20098 9.95365 1.99538 9.93456 1.793 9.89602C2.00279 10.5481 2.41127 11.1182 2.96125 11.5265C3.51122 11.9348 4.17513 12.1609 4.86 12.173C3.69656 13.0868 2.2594 13.5824 0.78 13.58C0.519321 13.5811 0.258823 13.5661 0 13.535C1.50151 14.4923 3.2453 15.0006 5.026 15Z" fill="#4A525F" />
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <g clipPath="url(#clip0_389_2574)">
                                                                <path d="M0 1.146C0 0.513 0.526 0 1.175 0H14.825C15.474 0 16 0.513 16 1.146V14.854C16 15.487 15.474 16 14.825 16H1.175C0.526 16 0 15.487 0 14.854V1.146ZM4.943 13.394V6.169H2.542V13.394H4.943ZM3.743 5.182C4.58 5.182 5.101 4.628 5.101 3.934C5.086 3.225 4.581 2.686 3.759 2.686C2.937 2.686 2.4 3.226 2.4 3.934C2.4 4.628 2.921 5.182 3.727 5.182H3.743ZM8.651 13.394V9.359C8.651 9.143 8.667 8.927 8.731 8.773C8.904 8.342 9.299 7.895 9.963 7.895C10.832 7.895 11.179 8.557 11.179 9.529V13.394H13.58V9.25C13.58 7.03 12.396 5.998 10.816 5.998C9.542 5.998 8.971 6.698 8.651 7.191V7.216H8.635C8.64031 7.20765 8.64564 7.19932 8.651 7.191V6.169H6.251C6.281 6.847 6.251 13.394 6.251 13.394H8.651Z" fill="#4A525F" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_389_2574">
                                                                    <rect width="16" height="16" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <g clipPath="url(#clip0_389_2576)">
                                                                <path d="M16 8.04902C16 3.60302 12.418 -0.000976562 8.00005 -0.000976562C3.58005 2.34375e-05 -0.00195312 3.60302 -0.00195312 8.05002C-0.00195312 12.067 2.92405 15.397 6.74805 16.001V10.376H4.71805V8.05002H6.75005V6.27502C6.75005 4.25802 7.94505 3.14402 9.77205 3.14402C10.648 3.14402 11.563 3.30102 11.563 3.30102V5.28102H10.554C9.56105 5.28102 9.25105 5.90202 9.25105 6.53902V8.04902H11.469L11.115 10.375H9.25005V16C13.074 15.396 16 12.066 16 8.04902Z" fill="#FF4545" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_389_2576">
                                                                    <rect width="16" height="16" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <g clipPath="url(#clip0_389_2578)">
                                                                <path d="M8 0C5.829 0 5.556 0.01 4.703 0.048C3.85 0.088 3.269 0.222 2.76 0.42C2.22609 0.620819 1.74249 0.935826 1.343 1.343C0.936076 1.7427 0.621107 2.22624 0.42 2.76C0.222 3.268 0.087 3.85 0.048 4.7C0.01 5.555 0 5.827 0 8.001C0 10.173 0.01 10.445 0.048 11.298C0.088 12.15 0.222 12.731 0.42 13.24C0.625 13.766 0.898 14.212 1.343 14.657C1.787 15.102 2.233 15.376 2.759 15.58C3.269 15.778 3.849 15.913 4.701 15.952C5.555 15.99 5.827 16 8 16C10.173 16 10.444 15.99 11.298 15.952C12.149 15.912 12.732 15.778 13.241 15.58C13.7746 15.3791 14.2578 15.0641 14.657 14.657C15.102 14.212 15.375 13.766 15.58 13.24C15.777 12.731 15.912 12.15 15.952 11.298C15.99 10.445 16 10.173 16 8C16 5.827 15.99 5.555 15.952 4.701C15.912 3.85 15.777 3.268 15.58 2.76C15.3789 2.22623 15.0639 1.74268 14.657 1.343C14.2576 0.935676 13.774 0.620645 13.24 0.42C12.73 0.222 12.148 0.087 11.297 0.048C10.443 0.01 10.172 0 7.998 0H8.001H8ZM7.283 1.442H8.001C10.137 1.442 10.39 1.449 11.233 1.488C12.013 1.523 12.437 1.654 12.719 1.763C13.092 1.908 13.359 2.082 13.639 2.362C13.919 2.642 14.092 2.908 14.237 3.282C14.347 3.563 14.477 3.987 14.512 4.767C14.551 5.61 14.559 5.863 14.559 7.998C14.559 10.133 14.551 10.387 14.512 11.23C14.477 12.01 14.346 12.433 14.237 12.715C14.1087 13.0624 13.904 13.3764 13.638 13.634C13.358 13.914 13.092 14.087 12.718 14.232C12.438 14.342 12.014 14.472 11.233 14.508C10.39 14.546 10.137 14.555 8.001 14.555C5.865 14.555 5.611 14.546 4.768 14.508C3.988 14.472 3.565 14.342 3.283 14.232C2.9355 14.1039 2.62113 13.8996 2.363 13.634C2.09675 13.376 1.89172 13.0617 1.763 12.714C1.654 12.433 1.523 12.009 1.488 11.229C1.45 10.386 1.442 10.133 1.442 7.996C1.442 5.86 1.45 5.608 1.488 4.765C1.524 3.985 1.654 3.561 1.764 3.279C1.909 2.906 2.083 2.639 2.363 2.359C2.643 2.079 2.909 1.906 3.283 1.761C3.565 1.651 3.988 1.521 4.768 1.485C5.506 1.451 5.792 1.441 7.283 1.44V1.442ZM12.271 2.77C12.1449 2.77 12.0201 2.79483 11.9036 2.84308C11.7872 2.89132 11.6813 2.96203 11.5922 3.05118C11.503 3.14032 11.4323 3.24615 11.3841 3.36262C11.3358 3.4791 11.311 3.60393 11.311 3.73C11.311 3.85607 11.3358 3.9809 11.3841 4.09738C11.4323 4.21385 11.503 4.31968 11.5922 4.40882C11.6813 4.49797 11.7872 4.56868 11.9036 4.61692C12.0201 4.66517 12.1449 4.69 12.271 4.69C12.5256 4.69 12.7698 4.58886 12.9498 4.40882C13.1299 4.22879 13.231 3.98461 13.231 3.73C13.231 3.47539 13.1299 3.23121 12.9498 3.05118C12.7698 2.87114 12.5256 2.77 12.271 2.77ZM8.001 3.892C7.45607 3.8835 6.91489 3.98349 6.40898 4.18614C5.90306 4.3888 5.44251 4.69007 5.05415 5.07242C4.66579 5.45478 4.35736 5.91057 4.14684 6.41326C3.93632 6.91595 3.8279 7.4555 3.8279 8.0005C3.8279 8.5455 3.93632 9.08505 4.14684 9.58774C4.35736 10.0904 4.66579 10.5462 5.05415 10.9286C5.44251 11.3109 5.90306 11.6122 6.40898 11.8149C6.91489 12.0175 7.45607 12.1175 8.001 12.109C9.07954 12.0922 10.1082 11.6519 10.865 10.8833C11.6217 10.1146 12.0459 9.07917 12.0459 8.0005C12.0459 6.92183 11.6217 5.88641 10.865 5.11775C10.1082 4.34909 9.07954 3.90883 8.001 3.892ZM8.001 5.333C8.70833 5.333 9.38669 5.61399 9.88685 6.11415C10.387 6.61431 10.668 7.29267 10.668 8C10.668 8.70733 10.387 9.38569 9.88685 9.88585C9.38669 10.386 8.70833 10.667 8.001 10.667C7.29367 10.667 6.61531 10.386 6.11515 9.88585C5.61499 9.38569 5.334 8.70733 5.334 8C5.334 7.29267 5.61499 6.61431 6.11515 6.11415C6.61531 5.61399 7.29367 5.333 8.001 5.333Z" fill="#4A525F" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_389_2578">
                                                                    <rect width="16" height="16" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="offcanvas offcanvas-bottom share-offcanvas" tabIndex="-1" id="share-btn" aria-labelledby="shareBottomLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="shareBottomLabel">Share</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body small">
                                <div className="d-flex flex-wrap align-items-center">
                                    <div className="text-center me-3 mb-3">
                                        <img src="../../assets/images/brands/08.png" className="img-fluid rounded mb-2" alt="" loading="lazy" />
                                        <h6>Facebook</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </main>
            <Footer />
        </div>
    )
}
export default Profile