import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'
import expert from "../assets/expert.png"


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

const Header = styled.div`


	width: 100%;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 1rem;

	& img {
		width: 6em;
		height: 6em;
		border-radius: 50%;
		object-fit: cover;
		background-color: rgba(${props => props.theme.textRgba}, .8);
	}

	& div {
		display: flex;
		justify-content: start;
		flex-direction: column;
		gap: .5rem;
	}

	@media screen and (max-width: 40em) {
		flex-direction: column;

		& div {
			text-align: center;
		}
	}


`

const Body = styled.div`



	display: flex;
	flex-direction: column;
	gap: 2rem;	


`

const Avis = styled.div`

	display: flex;
	justify-content: start;
	align-items: start;
	gap: 1rem;

	@media screen and (max-width: 40em) {
		flex-direction: column;

		& p:first-child {
			display: none;
		}
	}

	& p {
		line-height: 1.5;
		&:first-child {
			background-color: rgba(${(props) => props.theme.textRgba}, 0.1);
			color: rgba(${(props) => props.theme.textRgba}, 1);
			padding: 10px;
			border-radius: 50%;
			font-size: ${(props) => props.theme.fontlg};
			line-height: 0;
		}
		&:last-child {
			& span {
				font-weight: 800;
			}
		}
	}

`


const PourquoiInvestir = ({ localisation, etat_immeuble, nature_lots, totalite_lots }) => {
	useEffect(() => {

	}, [])

	return (
		<Container>
			<Header>
				<img src={expert} alt="L'expert" />
				<div>
					<h3>Pourquoi investir ici?</h3>
					<p>L'avis de l’expert, Sylvain Dumas</p>
				</div>
			</Header>
			<Body>
				<Avis>
					<p><FontAwesomeIcon icon={solid('check')} /></p>
					<p>
						<span>Localisation</span> - {localisation}.
					</p>
				</Avis>
				<Avis>
					<p><FontAwesomeIcon icon={solid('check')} /></p>
					<p>
						<span>Immeuble en bon état</span> - {etat_immeuble}.
					</p>
				</Avis>
				<Avis>
					<p><FontAwesomeIcon icon={solid('check')} /></p>
					<p>
						<span>Nature des lots</span> - {nature_lots}.
					</p>
				</Avis>
				<Avis>
					<p><FontAwesomeIcon icon={solid('check')} /></p>
					<p>
						<span>Totalité des lots loués</span> - {totalite_lots}.
					</p>
				</Avis>
			</Body>
		</Container>
	)
}

export default PourquoiInvestir;

