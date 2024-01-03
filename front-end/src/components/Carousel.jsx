// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";


import Card_movie from "./Card_movie";
import { movies } from "../data/movies";
import { data } from "../data/data";

const Carousel = ( {moviesSelected} ) => {
  //Top movies:
  const TopMovies = data.filter(item => item.top == true);
  const moviesToDisplay = moviesSelected || TopMovies;
  // const id = "1";
  return (
    <div className="swiper-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate : 0,
          stretch: 0,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {moviesToDisplay.map((item, index) => (
          <SwiperSlide key={index}>
            <Card_movie
              movie_item={item}
              // id={id}
              // title={item.name}
              // price={item.price}
              // like={item.like}
              // image={item.image}
              // days_left={item.days_left}
              // salle={item.salle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default Carousel;
