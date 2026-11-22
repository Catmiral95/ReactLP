import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import data from "../../data/dataJurists.json";
import styles from "./jurists.module.css";

export default function Jurists() {
  return (
    <main className={styles.main}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        grabCursor
        scrollbar={{ draggable: true }}
        initialSlide={0}
        centeredSlides={false}
        slidesPerView={"auto"}
        speed={1200}
        slideToClickedSlide={true}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation
        className={styles.slider}
      >
        <div className="slider-container">
          {data.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className={`col ${styles.slide}`}
              lazy="true"
            >
              <div className={styles.slideContainer}>
                <img
                  src={`${import.meta.env.BASE_URL}${slide.picture}`}
                  alt={slide.name}
                  loading="lazy"
                  className={styles.img}
                />
                <div className="col captions">
                  <div className={styles.title}>
                    <h4 className="col">{slide.name}</h4>
                    <small className="pos">{slide.position}</small>
                  </div>
                  <p className={styles.desc}>{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </main>
  );
}
