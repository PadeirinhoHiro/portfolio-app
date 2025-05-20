import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React from "react";
import { Pj1, Pj2 } from "./index";

export function Header() {
  return (
    <header>
      <h1 class="title lexend">Portfólio</h1>
      <Bio />
    </header>
  );
}

function Bio() {
  return (
    <div class="bio_c">
      <h1 class="bio title lexend">Bio</h1>
      <p class="bio lexend">
        Olá, meu nome é Aclerson R. da Silva e fiz este site para expor melhor
        meus projetos tanto na área de ciências da computação quanto na área de
        Game Programming. Este site está em desenvolvimento constante e está me
        ajudando a entender mais como utilizar o framework React.
      </p>
    </div>
  );
}

export function Projects() {
  return (
    <div class="projs_c">
      <Project
        img={Pj1}
        title={"Protótipos da Godot (Solo)"}
        link={
          "https://github.com/PadeirinhoHiro/Jogos-gratuitos-que-fiz-para-aprender.git"
        }
      />
      <Project
        img={Pj2}
        title={"Jogo da Unity (Time)"}
        link={"https://github.com/Os-Construtores-PI/PI-Construtores.git"}
      />
    </div>
  );
}

function Project({ img, title, resume, link }) {
  return (
    <div class="proj_c">
      <h1 class="proj_title lexend">{title}</h1>
      <ImagesSlider url_images={img} />
      <p class="proj_p lexend">{resume}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="proj_link lexend"
        href={link}
      >
        <b>Acesse o repositório!</b>
      </a>
    </div>
  );
}

function ImagesSlider({ url_images = [] }) {
  const swiperParams = {
    modules: [Pagination, Navigation, Autoplay],
    slidesPerView: 1, // Mostrar apenas 1 slide por vez
    spaceBetween: 30,
    loop: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  };
  console.log(url_images);
  return (
    <div class="swiper-container">
      <Swiper {...swiperParams}>
        {url_images.map((image, index) => (
          <SwiperSlide key={index} class="swiper-slide">
            <div class="slide-image-container">
              <img
                class="slide-image"
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
