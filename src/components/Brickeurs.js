import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'
import CustomButton from './CustomButton';
import AchatBricks from './AchatBricks';
import img from "../assets/house2.jpg";


const Container = styled.div`

	
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2.3rem;
	justify-content: space-between;
  	border-radius: 5px;
  	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
  	padding: ${(props) => props.theme.fontxl} ${(props) => props.theme.fontxl};
  	


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
  width: 100%;
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

const Brickeurs = () => {

	const [showAction, setShowAction] = useState(false);

	const handleShowAction = (e) => {
	    e.stopPropagation()
	    setShowAction(!showAction)
	  }

	useEffect(() => {

	}, [])

	return(
		<>
			<Container>
				<PourcentageInvestissementContainer>
	              71.2% financé  de bricks restant
	              <PourcentageInvestissement pourcentage={"71.2%"} />
	            </PourcentageInvestissementContainer>
	            <Btn onClick={handleShowAction} color="#fff" background="rgba(231,62,17, 1)">
	              Acheter
	            </Btn>
			</Container>	
			{
		        showAction && 
		        <AchatBricks onclick={handleShowAction} nom="Immeuble Général de Gaulle" image={img} pourcentageInvestissement="71.2%" brickRestant="45000" />
		    }
		</>
	)
}

export default Brickeurs;

