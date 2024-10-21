import faker from "../assets/images/artists/faker.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const RadioList = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={6}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <li className="col mb-3">
                    <img src={faker} className="mb-3 img-fluid rounded-3" />
                    <a href="#" className=" text-capitalize line-count-1 h5 d-block">
                        music hits
                    </a>
                    <small className="fw-normal text-capitalize line-count-1">music
                        hits by rj karuna</small>
                </li>
            </SwiperSlide>
            <SwiperSlide>
                <li className="col mb-3">
                    <img src={faker} className="mb-3 img-fluid rounded-3" />
                    <a href="#" className=" text-capitalize line-count-1 h5 d-block">
                        music hits
                    </a>
                    <small className="fw-normal text-capitalize line-count-1">music
                        hits by rj karuna</small>
                </li>
            </SwiperSlide>
        </Swiper>
    )
}
export default RadioList