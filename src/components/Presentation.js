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
	gap: 2rem;
	justify-content: space-between;
  	border-radius: 5px;
  	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
  	padding: ${(props) => props.theme.fontxl} ${(props) => props.theme.fontxxl};

	@media screen and (max-width: 40em) {
		padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontlg};
	}


`

const Info = styled.div`


	width: 100%;
	display: flex;
	justify-content: space-between;

	& div {
		display: flex;
		gap: .5em;
		align-items: center;

		&:last-child {
			& p {
				&:first-child {
					transform: rotate(45deg);
				}
			}
		}

		& p {
			font-weight: 800;
			&:first-child {
				color: rgba(${(props) => props.theme.textRgba}, 1);
				padding: 5px;
				border-radius: 50%;
				font-size: ${(props) => props.theme.fontlg};
				line-height: 0;
			}
		}
	}

	@media screen and (max-width: 40em) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}


`

const Description = styled.div`


	line-height: 1.5;

	& p {
		margin-top: 1rem;
	}


`

const Presentation = ({ nombre_lots, loyer_mensuel, aire, description }) => {

	const formatedLoyerMensuel = loyer_mensuel?.toLocaleString(undefined, { useGrouping: true, groupingSeparator: " " });
	const descritionRef = useRef()


	useEffect(() => {

	}, [])

	console.dir(descritionRef?.current)

	return (
		<Container>
			<h2>Presentation</h2>
			<iframe height="312" src="https://www.youtube.com/embed/g5VOi9V4Rjo" title="Le mot de l&#39;expert - Izon Immeuble Générale de Gaulle - Bricks.co" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			<Info>
				<div>
					<p><FontAwesomeIcon icon={solid('building')} /></p>
					<p>{nombre_lots} lots</p>
				</div>
				<div>
					<p><FontAwesomeIcon icon={solid('euro')} /></p>
					<p>{formatedLoyerMensuel} € / loyer mensuel</p>
				</div>
				<div>
					<p><FontAwesomeIcon icon={solid('arrows-left-right')} /></p>
					<p>{aire} m²</p>
				</div>
			</Info>
			<Description ref={descritionRef}>

				{description && description.map((detail, i) => (

					<p key={i}>{detail}</p>

				))}
			</Description>
		</Container>
	)
}

export default Presentation;

