import faker from "../assets/images/artists/faker.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';


const TrendingList = () => {
    return (
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
    )
}
export default TrendingList