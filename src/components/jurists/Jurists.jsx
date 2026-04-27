import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import data from "../../data/dataJurists.json";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./new_css.css";

export default function Jurists() {
  const swiper = useSwiper();
  return (
    <main className="main-jurists">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        grabCursor
        scrollbar={{ draggable: true }}
        initialSlide={0}
        centeredSlides={false}
        slidesPerView={"auto"}
        speed={1200}
        slideToClickedSlide={true}
        spaceBetween={"10"}
        pagination={{ clickable: true }}
        navigation
        className="swiper"
      >
        <div className="slider-container">
          {data.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="col swiper-slide"
              lazy="true"
            >
              <div className="swiper-slide-container">
                <img
                  src={process.env.PUBLIC_URL + slide.picture}
                  alt={slide.name}
                  load="lazy"
                  className="img-jurists"
                ></img>
                <div className="col captions">
                  <div className="title-jurists">
                    <h4 className="col">{slide.name}</h4>
                    <small className="pos">{slide.position}</small>
                  </div>
                  <p className="desc">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </main>
  );
}
