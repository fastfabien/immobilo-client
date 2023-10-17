import React from "react";
import styled from "styled-components";
import win from "../../assets/win.jpg";
import Button from "../../components/Button";
import Etape from "../../components/Etape";

const Conceptss = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};


  @media screen and (max-width: 70em) {
    padding: ${props => props.theme.fontsm} ${props => props.theme.fontlg};
  }


`;

const Concepts = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.fontmd};
  position: relative;
  margin-top: ${(props) => props.theme.fontxxl};

  & p {
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const Etapes = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100vw;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  margin-top: ${(props) => props.theme.fontsm};

  & + a {
    margin-top: ${(props) => props.theme.fontxxl};
    margin-bottom: ${(props) => props.theme.fontxxl};
    font-size: ${(props) => props.theme.fontlg};
  }

  & div {
    width: 25%;
    padding: ${(props) => props.theme.fontxs} ${(props) => props.theme.fontsm};
  }

  @media screen and (max-width: 70em) {
    padding: 0;
  }

  @media screen and (max-width: 40em) {
    flex-direction: column;
    & div {
      width: 100%;
    }
  }

`;
const Images = styled.div`
  width: 50%;
  position: relative;
  height: 32rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 32rem;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  @media screen and (max-width: 70em) {
    display: none;
  }
`;
const Info = styled.div`
  width: 50%;
  @media screen and (max-width: 70em) {
    width: 100%;
  }
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxl};
  font-weight: 800;
  margin-bottom: ${(props) => props.theme.fontmd};
`;
const Concept = () => {
  return (
    <Conceptss>
      <Concepts>
        <Info>
          <Title>Achetez des blocs et percevez vos revenus locatifs.</Title>
          <p>
            Participez dès 100 € au financement de biens immobiliers exclusifs
            et recevez chaque mois une part des revenus locatifs à hauteur du
            nombre de blocs que vous possédez.
          </p>
        </Info>
        <Images>
          <img src={win} alt="Winner" />
        </Images>
      </Concepts>
      <Etapes>
        <Etape numero="1" title="Nous sélectionnons des biens à fort potentiel">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet quas
          sit unde.
        </Etape>
        <Etape numero="2" title="Nous sélectionnons des biens à fort potentiel">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet quas
          sit unde.
        </Etape>
        <Etape numero="3" title="Nous sélectionnons des biens à fort potentiel">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet quas
          sit unde.
        </Etape>
        <Etape numero="4" title="Nous sélectionnons des biens à fort potentiel">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet quas
          sit unde.
        </Etape>
      </Etapes>
      <Button href="/signup" color="#fff" background="rgba(231,62,17, 1)">
        Je m'inscris
      </Button>
    </Conceptss>
  );
};

export default Concept;
