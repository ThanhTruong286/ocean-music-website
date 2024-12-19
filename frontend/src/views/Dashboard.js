import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/dashboard.scss';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="home">
                    <Header />

                    <div className="container">

                        <div>
                            <div className="snapshots">
                                <div className="snapshot">
                                    <h3>Online Now</h3>
                                    <div className="value">6</div>
                                    <div>Number of people</div>
                                </div>
                                <div className="snapshot">
                                    <h3>Online Today</h3>
                                    <div className="value">10</div>
                                    <div>Number of people</div>
                                </div>
                                <div className="snapshot">
                                    <h3>Online All Total</h3>
                                    <div className="value">2236</div>
                                    <div>Number of people</div>
                                </div>
                                <div className="snapshot">
                                    <h3>Returning Visitors</h3>
                                    <div className="value">12%</div>
                                    <div>Number of people</div>
                                </div>
                                <div className="snapshot">
                                    <h3>Average Age</h3>
                                    <div className="value">25</div>
                                    <div>Number of people</div>
                                </div>
                                <div className="snapshot">
                                    <h3>Mobile Users</h3>
                                    <div className="value">98%</div>
                                    <div>Number of people</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
