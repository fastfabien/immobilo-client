import React from "react";
import styled from "styled-components";
import CommentCaMarche from "../../components/CommentCaMarche";
import image1 from "../../assets/win2.jpg";
import image2 from "../../assets/win.jpg";
import image3 from "../../assets/house2.jpg";
import image4 from "../../assets/house.jpg";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  margin-bottom: ${(props) => props.theme.fontxxl};

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

  @media screen and (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Fonctionnements = styled.div``;
const Description = styled.div``;

const Fonctionnement = () => {
  return (
    <Container>
      <Title>
        Comment <span>Ça marche</span> ?
      </Title>
      <Fonctionnements>
        <Description>
          <CommentCaMarche
            title="1.Selection bien immobiliers de rapport"
            image={image1}
          >
            Nous selectionnons les meilleurs biens immobiliers que nous divisons
            en bricks de 10€
          </CommentCaMarche>
          <CommentCaMarche
            title="2.Achât de bricks à partir de 10€"
            image={image2}
          >
            Vous choisissez les biens qui vous interressent et achêtez une ou
            plusieurs bricks
          </CommentCaMarche>
          <CommentCaMarche
            title="3.Rendement locatif versé tous les mois"
            image={image3}
          >
            Tous les mois, nous vous reversons une fraction du loyer en fonction
            du nombre de bricks que vous possedez.
          </CommentCaMarche>
          <CommentCaMarche title="4.Plus-value immobilière" image={image4}>
            Quand vous avez besoin d'argent, revendez vos bricks sur la
            plateforme, et percevez la plus-value immobilière.
          </CommentCaMarche>
        </Description>
      </Fonctionnements>
    </Container>
  );
};

export default Fonctionnement;
