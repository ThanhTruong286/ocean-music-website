import Header from "../components/Header";
import peanut from "../assets/images/artists/peanut.jpg";
import faker from "../assets/images/artists/faker.jpg";
import ArtistList from "../components/ArtistList";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const Home = () => {

    return (

        <div id="header">
            <Header />
            <div className="content-inner pb-0 container-fluid" id="page_layout">
                <div className="row mb-5">
                    <div className="col-lg-12">
                        <div className="card-header">
                            <div className="header-title">
                                <h4 className="card-title text-capitalize mb-3">playlist by artist</h4>
                            </div>
                        </div>
                    </div>
                    {/** ARTIST LIST */}
                    <ArtistList />
                    {/** END ARTIST LIST */}
                </div>
                <div className="row mb-4">
                    <div className="col-lg-12">
                        <div className="card-header mb-3">
                            <div className="header-title d-flex align-items-center justify-content-between">
                                <h4 className="card-title text-capitalize">Trending Songs</h4>
                                <a href="#" className="small text-body">View All
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                        <path d="M10.9375 4V9.6875C10.9375 9.80353 10.8914 9.91481 10.8094 9.99686C10.7273 10.0789 10.616 10.125 10.5 10.125C10.384 10.125 10.2727 10.0789 10.1906 9.99686C10.1086 9.91481 10.0625 9.80353 10.0625 9.6875V5.05602L3.80953 11.3095C3.72744 11.3916 3.6161 11.4377 3.5 11.4377C3.3839 11.4377 3.27256 11.3916 3.19047 11.3095C3.10838 11.2274 3.06226 11.1161 3.06226 11C3.06226 10.8839 3.10838 10.7726 3.19047 10.6905L9.44398 4.4375H4.8125C4.69647 4.4375 4.58519 4.39141 4.50314 4.30936C4.42109 4.22731 4.375 4.11603 4.375 4C4.375 3.88397 4.42109 3.77269 4.50314 3.69064C4.58519 3.60859 4.69647 3.5625 4.8125 3.5625H10.5C10.616 3.5625 10.7273 3.60859 10.8094 3.69064C10.8914 3.77269 10.9375 3.88397 10.9375 4Z" fill="#4A525F"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul className="list-unstyled mb-0">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={6}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={faker} id="05" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                            <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">the girl</a>
                                            <small className="fw-normal text-capitalize line-count-1">by
                                                snoods smith Jonas </small>
                                        </div>
                                    </div>
                                </li>
                            </SwiperSlide>
                        </Swiper>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <div className="card-header  mb-3">
                            <div className="header-title">
                                <h4 className="card-title text-capitalize">recently played</h4>
                            </div>
                        </div>

                        <div className="swiper overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                            <ul className="swiper-wrapper p-0 list-unstyled mb-0 ">
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={5}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                >
                                    <SwiperSlide>
                                        <li className="swiper-slide card card-slide swiper-slide-active" role="group" aria-label="5 / 12" data-swiper-slide-index="4">
                                            <div className="card-body">

                                                <img src={peanut} id="15" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                                <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">my crying eyes</a>
                                                <small className="fw-normal text-capitalize line-count-1">snoods smith jonas </small>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li className="swiper-slide card card-slide swiper-slide-active" role="group" aria-label="5 / 12" data-swiper-slide-index="4">
                                            <div className="card-body">

                                                <img src={peanut} id="15" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                                <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">my crying eyes</a>
                                                <small className="fw-normal text-capitalize line-count-1">snoods smith jonas </small>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li className="swiper-slide card card-slide swiper-slide-active" role="group" aria-label="5 / 12" data-swiper-slide-index="4">
                                            <div className="card-body">

                                                <img src={peanut} id="15" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                                <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">my crying eyes</a>
                                                <small className="fw-normal text-capitalize line-count-1">snoods smith jonas </small>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li className="swiper-slide card card-slide swiper-slide-active" role="group" aria-label="5 / 12" data-swiper-slide-index="4">
                                            <div className="card-body">

                                                <img src={peanut} id="15" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                                <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">my crying eyes</a>
                                                <small className="fw-normal text-capitalize line-count-1">snoods smith jonas </small>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li className="swiper-slide card card-slide swiper-slide-active" role="group" aria-label="5 / 12" data-swiper-slide-index="4">
                                            <div className="card-body">

                                                <img src={peanut} id="15" className="mb-3 img-fluid rounded-3" alt="song-img" />
                                                <a href="../dashboard/music-player.html" className=" text-capitalize line-count-1 h5 d-block">my crying eyes</a>
                                                <small className="fw-normal text-capitalize line-count-1">snoods smith jonas </small>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                </Swiper>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Home