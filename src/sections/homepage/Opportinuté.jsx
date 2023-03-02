import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "../../assets/house2.jpg";
import "../../styles/slideSwiper.css";

import "swiper/css";
import CardProject from "../../components/CardProject";
import Button from "../../components/Button";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.fontmd};

  @media screen and (max-width: 70em) {
    padding: ${(props) => props.theme.fontsm} ${(props) => props.theme.fontlg};
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontxxl};
  font-family: "Changa";
  text-transform: uppercase;
  font-weight: 800;
  color: rgba(${(props) => props.theme.bodyRgba}, 1);
  margin-bottom: ${(props) => props.theme.fontlg};
  & span {
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 10px;
      background-color: rgba(${(props) => props.theme.textRgba}, 1);
      position: absolute;
      bottom: 1rem;
      right: 0;
      z-index: -1;
    }
  }
  @media screen and (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};
    margin-bottom: ${(props) => props.theme.fontxl};
  }
`;

const CardContainer = styled.div`
  display: block;
  width: 80%;
  margin: 0 auto;
  margin-bottom: ${(props) => props.theme.fontxxl};
`;

const Opportinuté = () => {
  return (
    <Container>
      <Title>
        Les Opportinuté <span>d'investissement</span>
      </Title>
      <CardContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            100: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <CardProject
              image={img}
              nom="Immeuble Général de Gaule"
              adresse="33450 Izon"
              prix="152300"
              rentabilité="8.53%"
              reversé="5.53%"
              pourcentageInvestissement="57.32%"
            >
              mandona
            </CardProject>
          </SwiperSlide>
          <SwiperSlide>
            <CardProject
              image={img}
              nom="Immeuble Général de Gaule"
              adresse="33450 Izon"
              prix="152300"
              rentabilité="8.53%"
              reversé="5.53%"
              pourcentageInvestissement="57.32%"
            >
              mandona
            </CardProject>
          </SwiperSlide>
          <SwiperSlide>
            <CardProject
              image={img}
              nom="Immeuble Général de Gaule"
              adresse="33450 Izon"
              prix="152300"
              rentabilité="8.53%"
              reversé="5.53%"
              pourcentageInvestissement="57.32%"
            >
              mandona
            </CardProject>
          </SwiperSlide>
          <SwiperSlide>
            <CardProject
              image={img}
              nom="Immeuble Général de Gaule"
              adresse="33450 Izon"
              prix="152300"
              rentabilité="8.53%"
              reversé="5.53%"
              pourcentageInvestissement="57.32%"
            >
              mandona
            </CardProject>
          </SwiperSlide>
          <SwiperSlide>
            <CardProject
              image={img}
              nom="Immeuble Général de Gaule"
              adresse="33450 Izon"
              prix="152300"
              rentabilité="8.53%"
              reversé="5.53%"
              pourcentageInvestissement="57.32%"
            >
              mandona
            </CardProject>
          </SwiperSlide>
          <SwiperSlide>
            <CardProject
              image={img}
              nom="Immeuble Général de Gaule"
              adresse="33450 Izon"
              prix="152300"
              rentabilité="8.53%"
              reversé="5.53%"
              pourcentageInvestissement="57.32%"
            >
              mandona
            </CardProject>
          </SwiperSlide>
        </Swiper>
      </CardContainer>
      <Button href="/" color="#fff" background="rgba(231,62,17, 1)">
        Voir tous les projets
      </Button>
    </Container>
  );
};

export default Opportinuté;
