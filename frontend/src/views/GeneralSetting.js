import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/setting.scss';

const GeneralSetting = () => {
    const [explicitContent, setExplicitContent] = useState(true);
    const [autoplay, setAutoplay] = useState(true);
    const [autoAdjust, setAutoAdjust] = useState(true);
    const [normalizeVolume, setNormalizeVolume] = useState(true);

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <h1>Cài đặt</h1>
                        <div className="section">
                            <h2>Ngôn ngữ</h2>
                            <p>Chọn ngôn ngữ - Các thay đổi sẽ được áp dụng sau khi bạn khởi động lại ứng dụng</p>
                            <div className="dropdown">
                                <select id="language-select">
                                    <option>Tiếng Việt (Vietnamese)</option>
                                    <option>English</option>
                                </select>
                            </div>
                        </div>
                        <div className="section">
                            <h2>Nội dung phản cảm</h2>
                            <p>Cho phép phát nội dung được đánh giá là phản cảm.</p>
                            <div className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    id="explicit-content" 
                                    checked={explicitContent}
                                    onChange={() => setExplicitContent(!explicitContent)}
                                />
                                <label htmlFor="explicit-content"></label>
                            </div>
                        </div>
                        <div className="section">
                            <h2>Tự động phát</h2>
                            <p>Thưởng thức nhạc không gián đoạn. Khi bạn nghe hết nhạc, chúng tôi sẽ phát nội dung tương tự</p>
                            <div className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    id="autoplay" 
                                    checked={autoplay}
                                    onChange={() => setAutoplay(!autoplay)}
                                />
                                <label htmlFor="autoplay"></label>
                            </div>
                        </div>
                        <div className="section">
                            <h2>Chất lượng âm thanh</h2>
                            <p>Chất lượng stream</p>
                            <div className="dropdown">
                                <select id="stream-quality-select">
                                    <option>Cao</option>
                                    <option>Thấp</option>
                                </select>
                            </div>
                            <p>Tải xuống <i className="fas fa-info-circle info-icon"></i></p>
                            <div className="dropdown">
                                <select id="download-quality-select">
                                    <option>Cao</option>
                                    <option>Thấp</option>
                                </select>
                            </div>
                            <p>Tự động điều chỉnh chất lượng - Chế độ cài đặt đề xuất: Bật <i className="fas fa-info-circle info-icon"></i></p>
                            <div className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    id="auto-adjust" 
                                    checked={autoAdjust}
                                    onChange={() => setAutoAdjust(!autoAdjust)}
                                />
                                <label htmlFor="auto-adjust"></label>
                            </div>
                            <p>Chuẩn hóa âm lượng - Đặt cùng mức âm lượng cho tất cả các bài hát và podcast</p>
                            <div className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    id="normalize-volume" 
                                    checked={normalizeVolume}
                                    onChange={() => setNormalizeVolume(!normalizeVolume)}
                                />
                                <label htmlFor="normalize-volume"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default GeneralSetting;
