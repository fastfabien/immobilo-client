import React from "react";
import styled from "styled-components";
import house from "../../assets/house2.jpg";
import Button from "../../components/Button";

const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  background: url(${house}) center center/cover no-repeat;

  @media screen and (max-width: 70em) {
    padding: ${(props) => props.theme.fontsm} ${(props) => props.theme.fontlg};
    padding-top: 2rem;
  }

  & p {
    font-family: "Changa";
    font-weight: 400;
    font-size: ${(props) => props.theme.fontxl};
    color: rgba(${(props) => props.theme.bodyRgba}, 1);
    line-height: 1.2;
    width: 80%;
    margin-bottom: ${(props) => props.theme.fontxs};

    @media screen and (max-width: 70em) {
      font-size: ${(props) => props.theme.fontlg};
    }
  }

  & a {
    display: block;
    width: 40% !important;
    font-size: ${(props) => props.theme.fontlg};
    font-family: "Changa";
    margin-top: ${(props) => props.theme.fontxxl};
    line-height: 1;

    @media screen and (max-width: 70em) {
      width: 50% !important;
    }

    @media screen and (max-width: 40em) {
      width: 100% !important;
    }
  }
`;

const Left = styled.div`
  width: 60%;
  position: relative;

  @media screen and (max-width: 70em) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-family: "Changa";
  font-weight: 800;
  font-size: ${(props) => props.theme.fontxxxl};
  color: rgba(${(props) => props.theme.bodyRgba}, 1);
  line-height: 1.2;
  margin-bottom: ${(props) => props.theme.fontxs};
  margin-top: ${(props) => props.theme.fontxs};

  @media screen and (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxxl};
  }

  @media screen and (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Introduction = () => {
  return (
    <Section>
      <Left>
        <Title>Lorem ipsum dolor sit amet</Title>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <Button href="/" color="#fff" background="rgba(231,62,17, 1)">
          Nos Projet en finacement
        </Button>
      </Left>
    </Section>
  );
};

export default Introduction;
