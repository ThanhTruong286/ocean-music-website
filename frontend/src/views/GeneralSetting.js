// src/views/GeneralSetting.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/setting.scss';

const GeneralSetting = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value); // Thay đổi ngôn ngữ khi chọn
    };

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="container">
                        <h1>{t('title')}</h1>
                        <div className="section">
                            <h2>{t('language')}</h2>
                            <p>{t('languageDescription')}</p>
                            <div className="dropdown">
                                <select id="language-select" onChange={handleLanguageChange}>
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                        <div className="section">
                            <h2>{content[language].explicitContent}</h2>
                            <p>{content[language].explicitContentDescription}</p>
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
                            <h2>{content[language].autoplay}</h2>
                            <p>{content[language].autoplayDescription}</p>
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
                            <h2>{content[language].audioQuality}</h2>
                            <p>{content[language].streamQuality}</p>
                            <div className="dropdown">
                                <select id="stream-quality-select">
                                    <option>Cao</option>
                                    <option>Thấp</option>
                                </select>
                            </div>
                            <p>{content[language].downloadQuality}</p>
                            <div className="dropdown">
                                <select id="download-quality-select">
                                    <option>Cao</option>
                                    <option>Thấp</option>
                                </select>
                            </div>
                            <p>{content[language].autoAdjust}</p>
                            <div className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    id="auto-adjust" 
                                    checked={autoAdjust}
                                    onChange={() => setAutoAdjust(!autoAdjust)}
                                />
                                <label htmlFor="auto-adjust"></label>
                            </div>
                            <p>{content[language].normalizeVolume}</p>
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
