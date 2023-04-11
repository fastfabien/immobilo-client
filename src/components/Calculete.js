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
	padding: ${(props) => props.theme.fontxl} ${(props) => props.theme.fontmd};
	padding-top: 10px;


`

const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 20px 20px;
	padding-top: 10px;
	border-bottom-left-radius: 50%;
	border-bottom-right-radius: 50%;

`

const Body = styled.div`


	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 2rem;	

	& p {
		& span {
			font-weight: 800;
		}
	}


`


const Range = styled.div`


	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	& input {
		height: 2px;
		border: none;
		background-color: 
		width: 100%;
	}


`

const Investissement = styled.div`

	
	width: 100;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 1rem;

	& div {
		&:first-child {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			& div {
				width: 50%;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				gap: .5rem;
			}
		}
		&:last-child {
			display: flex;
			justify-content: space-between;
			gap: .5rem;
			flex-direction: column;
		}
		& p {
			width: 100%;
			padding: 8px 10px;			
			border: 2px solid rgba(${props => props.theme.bodyRgba}, .2);
			border-radius: 5px;
			text-align: center;
			color rgba(${props => props.theme.textRgba}, 1);
			font-weight: 800;
			font-size: ${props => props.theme.fontmd}
		}
	}


`


const Brickeurs = ({ reverser, potentiel_plus_value }) => {

	const [showAction, setShowAction] = useState(false);
	const [montantInvesti, setMontantInvesti] = useState(0)
	const [revenuMensuel, setRevenuMensuel] = useState(0.0)
	const [plusValue, setPlusValue] = useState(0.0)
	const [valoriation, setValoriation] = useState(0.0)

	const handleChangeMontantInvesti = (e) => {
		const revMensuel = parseFloat(reverser) * e.target.value
		const pluValue = parseFloat(potentiel_plus_value) * e.target.value
		const valoAn = parseFloat(revMensuel) * 12 + pluValue
		setMontantInvesti(e.target.value)
		setRevenuMensuel(revMensuel)
		setPlusValue(pluValue)
		setValoriation(valoAn)
	}

	useEffect(() => {

	}, [])

	return (
		<>
			<Container>
				<Header>
					<h2>Calculette</h2>
					<span>Ces rentabilités cibles peuvent varier</span>
				</Header>
				<Body>
					<Range>
						<p>Montant investi: <span>{montantInvesti} €</span></p>
						<input type="range" step="10" value={montantInvesti} onChange={handleChangeMontantInvesti} min="0" max="5000" />
					</Range>
					<Investissement>
						<div>
							<div>
								Revenu/mois
								<p><span>+{revenuMensuel.toFixed(2)}</span>€</p>
							</div>
							<div>
								Plus value/an
								<p><span>+{plusValue.toFixed(2)}</span>€</p>
							</div>
						</div>
						<div>
							Valorisation/an
							<p><span>+{valoriation.toFixed(2)}</span>€</p>
						</div>
					</Investissement>
				</Body>
			</Container>
		</>
	)
}

export default Brickeurs;

