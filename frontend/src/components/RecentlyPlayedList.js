// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import peanut from "../assets/images/artists/peanut.jpg";


// Import Swiper styles
import 'swiper/css';

const RecentlyPlayedList = () => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
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
    )
}

export default RecentlyPlayedList