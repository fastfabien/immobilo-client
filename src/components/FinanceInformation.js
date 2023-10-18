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
  	border-radius: 5px;
  	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
  	padding: ${(props) => props.theme.fontxl} ${(props) => props.theme.fontxxl};
  	margin-top: 1rem;

	@media screen and (max-width: 40em) {
		padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontlg};
	}


`

const Header = styled.div`

	
	width: 100%;
	& div {
		display: flex;
		justify-content: flex-start;
		gap: 2rem;
		align-items: center;
	}



`

const Body = styled.div`

	
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
	gap: .7rem;
	font-size: ${props => props.theme.fontmd};


`

const Content = styled.div`


	display: flex;
	justify-content: space-between;
	width: 100%;


`

const Footer = styled.div`

	
	font-weight: bold;
	border-top: 2px solid rgba(${props => props.theme.textRgba}, 1);
	padding: 1rem 0;
	


`


const FinanceInformation = ({ information }) => {

	/*const formatedLoyerMensuel = loyer_mensuel?.toLocaleString(undefined, {useGrouping: true, groupingSeparator: " "});*/

	const fontAwesomeNom = information?.[0].header[0]
	const financeInformationTitle = information?.[0].header[1]
	const formatedInformationArray = information.slice(1, information.length - 1)

	useEffect(() => {

	}, [])


	return (
		<Container>
			<Header>
				<div>
					{fontAwesomeNom}
					<h2>{financeInformationTitle}</h2>
				</div>
			</Header>
			<Body>
				{
					formatedInformationArray && formatedInformationArray.map((info, i) => (

						<Content key={i}>
							<div>{info[0]}</div>
							<div>{info[1]} €</div>
						</Content>

					))
				}
			</Body>
			<Footer>
				<Content>
					<div>{information[information.length - 1][0]}</div>
					<div>{information[information.length - 1][1]} €</div>
				</Content>
			</Footer>
		</Container>
	)
}

export default FinanceInformation;

