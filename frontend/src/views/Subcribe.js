import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/global.scss";
import logo from "../assets/images/logo.png";

const Subcribe = () => {

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>
            <main className="main-content">
                <div id="subcribe">
                    <Header />
                    <div className="main-view-container">
                        <div className="main-content">
                            <div className="content">
                                <h1><span>Get more out of your music with Premium Individual.</span></h1>
                                <p>
                                    <span>Enjoy uninterrupted music listening with Spotify Premium. </span>
                                    <span>Starting at only ₫59,000. Cancel anytime. </span>
                                </p>
                                <div className="main-button">
                                    <button>
                                        <span>Get Premium Individual</span>
                                    </button>
                                    <button style={{ border: "1px solid #000", backgroundColor: "transparent", color: "#000" }}>
                                        <span>View All Plan</span>
                                    </button>
                                </div>
                                <p>
                                    <span>
                                        <a>Terms apply.</a>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="affordable ">
                            <div className="content">
                                <h1>Affordable plans for any situation</h1>
                                <p>Choose a Premium plan and listen to ad-free music without limits on your phone, speaker, and other devices. Pay in various ways. Cancel anytime.</p>
                            </div>
                        </div>
                        <div className="payment">
                            <ul>
                                <li>
                                    <div id="momoIcon" role="img" class="payment-icon" aria-label="momo"></div>

                                </li>
                                <li>
                                    <div id="visaIcon" role="img" class="payment-icon" aria-label="visa"></div>
                                </li>
                                <li>
                                    <div id="masterCardIcon" role="img" class="payment-icon" aria-label="card"></div>
                                </li>
                                <li>
                                    <div id="expressIcon" role="img" class="payment-icon" aria-label="momo"></div>
                                </li>
                            </ul>
                        </div>
                        <div className="plan">
                            <div className="description">
                                <h2>All Premium plans include</h2>
                                <div className="include">
                                    <ul>
                                        <div className="include-item">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="M21.707 4.805a1 1 0 0 1 0 1.414L8.024 19.902l-5.731-5.73a1 1 0 1 1 1.414-1.415l4.317 4.317L20.293 4.805a1 1 0 0 1 1.414 0z"></path></svg>
                                            <li>Ad-free music listening</li>
                                        </div>
                                        <div className="include-item">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="M21.707 4.805a1 1 0 0 1 0 1.414L8.024 19.902l-5.731-5.73a1 1 0 1 1 1.414-1.415l4.317 4.317L20.293 4.805a1 1 0 0 1 1.414 0z"></path></svg>
                                            <li>Download to listen offline</li>
                                        </div>
                                        <div className="include-item">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="M21.707 4.805a1 1 0 0 1 0 1.414L8.024 19.902l-5.731-5.73a1 1 0 1 1 1.414-1.415l4.317 4.317L20.293 4.805a1 1 0 0 1 1.414 0z"></path></svg>
                                            <li>Play songs in any order</li>
                                        </div>
                                        <div className="include-item">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="M21.707 4.805a1 1 0 0 1 0 1.414L8.024 19.902l-5.731-5.73a1 1 0 1 1 1.414-1.415l4.317 4.317L20.293 4.805a1 1 0 0 1 1.414 0z"></path></svg>
                                            <li>High audio quality</li>
                                        </div>
                                        <div className="include-item">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="M21.707 4.805a1 1 0 0 1 0 1.414L8.024 19.902l-5.731-5.73a1 1 0 1 1 1.414-1.415l4.317 4.317L20.293 4.805a1 1 0 0 1 1.414 0z"></path></svg>
                                            <li>Listen with friends in real time</li>
                                        </div>
                                        <div className="include-item">
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="M21.707 4.805a1 1 0 0 1 0 1.414L8.024 19.902l-5.731-5.73a1 1 0 1 1 1.414-1.415l4.317 4.317L20.293 4.805a1 1 0 0 1 1.414 0z"></path></svg>
                                            <li>Organize listening queue</li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="plan-list">
                                <div className="content">
                                    <div className="plan-card">
                                        <div className="head-card">
                                            <div className="logo">
                                                <span className="type">Premium</span>
                                                <img src={logo}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default Subcribe