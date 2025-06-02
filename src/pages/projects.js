import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/Projects.css";
import { importAll } from "../components/importfunc/importfunc.js";
import { motion } from "motion/react";

export function Projects() {
  return (
    <div className="projs_c">
      <Project
        img={Pj1}
        title={"Protótipos da Godot"}
        link={
          "https://github.com/PadeirinhoHiro/Jogos-gratuitos-que-fiz-para-aprender.git"
        }
      />
      <Project
        img={Pj2}
        title={"Pandora"}
        link={"https://github.com/Os-Construtores-PI/PI-Construtores.git"}
      />
    </div>
  );
}

function Project({ img, title, link }) {
  return (
    <motion.div
      className="proj_c"
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      style={{ cursor: "pointer;" }}
      onClick={() => (window.location.href = link)}
    >
      <ImagesSlider url_images={img} />
      <h1 className="proj_title lexend">{title}</h1>
      <b className="proj_call">Acesse o repositório!</b>
    </motion.div>
  );
}

function ImagesSlider({ url_images = [] }) {
  const swiperParams = {
    modules: [Pagination, Navigation, Autoplay],
    slidesPerView: 1, // Mostrar apenas 1 slide por vez
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  };
  console.log(url_images);
  return (
    <div className="swiper-container">
      <Swiper {...swiperParams}>
        {url_images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="slide-image-container">
              <img
                className="slide-image"
                src={image}
                alt="Imagens demonstrativas do projeto"
              ></img>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const Pj1 = importAll(
  require.context("../images/p1/", false, /\.(png|jpe?g|svg)$/),
);
const Pj2 = importAll(
  require.context("../images/p2/", false, /\.(png|jpe?g|svg)$/),
);
