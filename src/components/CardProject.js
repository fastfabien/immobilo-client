import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomButton from './CustomButton';
import AchatBricks from './AchatBricks';
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  border-radius: 10px;
  box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
  gap: 2rem;
  transition: transform 0.5s ease;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;
  width: 30%;
  position: relative;

  &:hover {
    box-shadow: 1px 20px 20px rgba(${(props) => props.theme.bodyRgba}, 0.1);
    transform: translateY(-10px) scale(1.01);
    transition: transform 0.5s ease;
  }

  @media screen and (max-width: 70em) {
    width: 45%;
  }

  @media screen and (max-width: 40em) {
    width: 100%;
  }
`;

const Header = styled.img`
  display: block;
  width: 100%;
  height: 25%;
  border-radius: 10px;
  & + div {
    text-align: center;
  }
`;

const Body = styled.div`
  padding: ${(props) => props.theme.fontmd};
  padding-top: 0rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  & div {
    & p {
      text-transform: capitalize;
    }
  }
`;

const Investissement = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: ${(props) => props.theme.fontmd};
  & div {
    border-left: 1px solid #000;
    padding-left: ${(props) => props.theme.fontxs};
    color: rgba(${(props) => props.theme.bodyRgba}, 0.8);
    & p:last-child {
      color: #000;
      font-size: ${(props) => props.theme.fontlg};
      font-weight: 500;
    }
  }
`;

const Action = styled.div`

  
  width: 100%;
  display: flex; 
  justify-content: space-between;
  align-items: center;


`

const PourcentageInvestissementContainer = styled.div`
  color: rgba(${(props) => props.theme.textRgba}, 0.8);
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 800;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const PourcentageInvestissement = styled.div`
  width: 80%;
  height: 5px;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
  background-color: rgba(${(props) => props.theme.bodyRgba}, 0.2);
  position: relative;

  &::after {
    content: "";
    display: block;
    border-radius: 10px;
    background-color: rgba(${(props) => props.theme.textRgba}, 0.8);
    height: 100%;
    width: ${(props) => props.pourcentage};
  }
`;



const Btn = styled.button`

    position: relative;
    color: ${props => props.color};
    background-color: ${props => props.background};
    outline: none;
    border: none;
    padding: ${props => props.theme.fontsm} ${props => props.theme.fontmd};
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.theme.fontmd};
    font-weight: 800;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    opacity: .9;

    &:hover {
        opacity: .8;
    }

`


const CardProject = ({
  image,
  nom,
  adresse,
  prix,
  rentabilité,
  reversé,
  pourcentageInvestissement,
  acheter,
  brickRestant,
  id
}) => {


  const [showAction, setShowAction] = useState(false);
  const navigate = useNavigate()
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleGoToLink = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/proprietes/${id}`)
  }

  const stopHandleClick = (e) => {
    e.stopPropagation()
    setShowAction(true)
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <Container onClick={handleGoToLink}
      >
        <Header src={`data:image/jpg;base64,${image}`} alt="Photo de couverture" />
        <Body >
          <div>
            <p>{nom}</p>
            <p>
              {adresse} - {prix}
            </p>
          </div>
          <Investissement>
            <div>
              <p>Rentabilité</p>
              <p>{rentabilité}</p>
            </div>
            <div>
              <p>Reversé</p>
              <p>{reversé}</p>
            </div>
          </Investissement>
          <Action>
            <PourcentageInvestissementContainer>
              {pourcentageInvestissement}% financé
              <PourcentageInvestissement pourcentage={pourcentageInvestissement} />
            </PourcentageInvestissementContainer>
            {
              acheter &&
              <Btn onClick={(e) => {
                e.stopPropagation();
                setShowAction(true);
              }


              } color="#fff" background="rgba(231,62,17, 1)">
                Acheter
              </Btn>
            }
          </Action>
        </Body>
      </Container>
      {
        showAction &&
        <AchatBricks setShowAction={setShowAction} nom={nom} image={image} pourcentageInvestissement={pourcentageInvestissement} brickRestant={brickRestant} id={id} />
      }
    </>
  );
};

export default CardProject;