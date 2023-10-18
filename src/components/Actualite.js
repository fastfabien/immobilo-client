import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'


const Container = styled.div`

	
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: space-between;
	margin: 0 auto;
  	padding: ${(props) => props.theme.fontxl} ${(props) => props.theme.fontxxl};
  	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
  	border-radius: 5px;

	@media screen and (max-width: 40em) {
		padding: ${(props) => props.theme.fontmd} ${(props) => props.theme.fontlg};
	}

`

const Header = styled.div`

	display: flex;
	justify-content: space-between;
	align-items: center;

	& div {

		&:last-child {
			display: flex;
			gap: 1rem;
			& p {
				background-color: rgba(${(props) => props.theme.bodyRgba}, 0.1);
				padding: 5px 10px;
				border-radius: 50%;
				font-size: ${(props) => props.theme.fontlg};
				line-height: 0;
				opacity: 1;
				&.active {
					opacity: .5;
				}
			}
		}
	}

`
const Body = styled.p`
	
	line-height: 1.5;

`



const Actualite = () => {





	const actualite = [
		{
			title: "Actualité",
			mois: "Fevrier 2023",
			description: "L'acte authentique a été signé le 7 février. Nous allons pouvoir commencer à collecter les loyers. Les premiers revenus reversés sont donc prévus en mars. La collecte reste ouverte jusqu'à atteindre 100%."
		},
		{
			title: "Actualité",
			mois: "Janvier 2023",
			description: "La signature a été repoussée à début février car nous sommes dans l'attente du retour de la non préamption par la mairie (étape incontournable lors d'une acquisition). Les premiers revenus reversés sont donc prévus en mars. La collecte reste ouverte jusqu'à atteindre 100%."
		},
		{
			title: "Actualité",
			mois: "Decembre 2022",
			description: "L'immeuble sera signé chez le notaire le 20 décembre. Les premiers loyers seront donc collectés fin décembre."
		}
	];

	const navigate = useNavigate();
	const [numAct, setNumAct] = useState(0)

	const handleNext = (e) => {
		var element = document.getElementById('next')
		var prev = document.getElementById('prev')
		if (numAct < actualite.length - 1) {
			setNumAct(numAct + 1)
			prev.classList.remove('active')
		} else {
			element.classList.add('active')
		}
	}

	const handlePrev = (e) => {
		var element = document.getElementById('prev')
		var next = document.getElementById('next')

		if (numAct > 0) {
			setNumAct(numAct - 1)
			next.classList.remove('active')
		} else {
			element.classList.remove('active')
		}
		if (numAct === 0) {
			setNumAct(0)
			element.classList.add('active')
			next.classList.remove('active')
		}
	}


	useEffect(() => {

	}, [numAct])

	return (
		<Container>
			<Header>
				<div>
					<p>{actualite[numAct].title}</p>
					<h2>{actualite[numAct].mois}</h2>
				</div>
				<div>
					<p id="prev" className="active" onClick={handlePrev}>
						<FontAwesomeIcon icon={solid('angle-left')} />
					</p>
					<p id="next" onClick={handleNext}>
						<FontAwesomeIcon icon={solid('angle-right')} />
					</p>
				</div>
			</Header>
			<Body>
				{actualite[numAct].description}
			</Body>
		</Container>
	)
}

export default Actualite;

