import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'


const Container = styled.div`

	
	width: 100%;
	display: flex;
	gap: 10px;
	justify-content: space-between;
  	border-radius: 5px;


`

const Content = styled.div`


	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	width: 100%;

	& div {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		background-color: rgba(${props => props.theme.white});
		box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
		width: 100%;
		text-align: center;

		&:last-child {
			margin-top: .5rem;
		}
		& p {
			width: 100%;
			color: rgba(${(props) => props.theme.textRgba}, 1);
			font-weight: 800;
		}
	}

`


const Rentabilite = () => {
	useEffect(() => {

	}, [])

	return(
		<Container>
			<Content>
				<div>
					Rentabilité cible
				</div>
				<div>
					<p>8.53%</p>
				</div>
			</Content>
			<Content>
				<div>
					Revenus reversés
				</div>
				<div>
					<p>5.53%</p>
				</div>
			</Content>
			<Content>
				<div>
					Valorisation bien
				</div>
				<div>
					<p>1 523 000€</p>
				</div>
			</Content>
		</Container>	
	)
}

export default Rentabilite;

