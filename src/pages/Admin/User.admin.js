import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import authHeader from "../../services/auth-header";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'
import ProprieteNavibar from '../../components/ProprieteNavibar'


const API_URL = "/api/user/";



const Container = styled.div`
	
	padding: 8em ${(props) => props.theme.fontxxl};
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;


	table {
	  font-family: arial, sans-serif;
	  border-collapse: collapse;
	  width: 100%;
	}

	td, th {
	  border: 1px solid #dddddd;
	  text-align: left;
	  padding: 8px;
	}

	tr:nth-child(even) {
	  background-color: #dddddd;
	}


`

const NavBarContainer = styled.div`

	display: flex;
	justify-content: center;
	margin: 0 auto;
	margin-top: 1rem;
	background-color: ${props => props.theme.white};
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	z-index: 5;

`

const Title = styled.h1`

	
	font-size: ${(props) => props.theme.fontlg};
    font-weight: 800;
    line-height: 1;
    width: 70%;


`

const UserInformationContainer = styled.div`

	
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;

	& form {
		width: 30%;
		display: flex;
		flex-direction: column;
		width: 100;
		justify-content: flex-start;
		gap: 1rem;

		& a {
			color: blue;
			text-decoration: underline;
		}

		& select {
			width: 100%;
		}

		& input[type="text"] {
			width: 100%;
			border: 1px solid rgba(${props => props.theme.bodyRgba}, .2);
			padding: ${props => props.theme.fontmd} ${props => props.theme.fontlg};
			outline: none;
			border-radius: 5px;
			outline: none;
		}

		& input[type="submit"] {
			padding: ${props => props.theme.fontmd} ${props => props.theme.fontlg};
			appearance: none;
			border: none;
			background-color: rgba(${props => props.theme.textRgba}, 1);
			border-radius: 5px;
			text-transform: uppercase;
			color: ${props => props.theme.white};
			font-weight: 800;
			font-size: ${props => props.theme.fontxs};
			cursor: pointer;

			&:hover {
				background-color: rgba(${props => props.theme.textRgba}, .8);
			}

		}
	}


`
const Left = styled.div`


	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 20%;


`
const Right = styled.div`

	width: 50%;
	display: flex;
	justify-content:space-between;
	flex-direction: column;
	gap: 1rem;

	& p {
		width: 100%;
		display: flex;
		justify-content: space-between;
		& span {
			&:first-child {
				font-weight: bold;
				text-transform: uppercase;
			}
			&:last-child {
				text-transform: capitalize;
			}
			width: 50%;
			text-align: left;
		}
	}

`
const Profil = styled.div`

	display: block;
	width: 10rem;
	height: 10rem;
	border: 1px solid #000;

	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}


`

const Select = styled.select`


	padding: ${props => props.theme.fontlg} ${props => props.theme.fontlg};
	  width: 80%;
	  outline: none;
	  border: 1px solid rgba(${(props) => props.theme.textRgba}, 1); 
	  border-radius: 5px;

`

const Message = styled.div`

	padding: 20px;
	color: ${props => props.theme.white};
	position: fixed;
	top: 6rem;
	right: 0;
	background-color: darkgreen;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	& span {
		padding: 3px 4px;
		border-radius: 50%;
		border: 1px solid ${props => props.theme.white};
	}

`

const Erreur = styled.div`
	
	position: fixed;
	top: 10rem;
	right: 0;
	padding: 20px;
	color: ${props => props.theme.white};
	position: fixed;
	background-color: red;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	& span {
		padding: 3px 4px;
		border-radius: 50%;
		border: 1px solid ${props => props.theme.white};
	}
`

const UserDashboard = () => {


	const messageRef = useRef()

	const [user, setUser] = useState()
	const [message, setMessage] = useState()
	const [error, setError] = useState()
	const [data, setData] = useState({})
	const { id } = useParams()
	const messageRefused = document.getElementById('messageRefused')

	const getUserInformation = useCallback(() => {
		return axios.get(API_URL + `${id}`, { headers: authHeader() }).then((data) => {
			setUser(data.data.user)
			console.log(data.data.user)
		}).catch((err) => {
			console.log(err)
		})
	})


	useEffect(() => {
		getUserInformation()
	}, [])






	const handleSetVerification = async (e) => {
		e.preventDefault()

		axios.post(API_URL + `${id}`, data, { headers: authHeader() }).then((data) => {
			setMessage('Information enregistrer !')
		}).catch((err) => {
			setError(err.message)
		})
	}

	return (
		<Container>
			<NavBarContainer>
				<ProprieteNavibar alignment="center" content={
					[{ lien: "/admin", text: "Tous les utilisateurs" },
					{ lien: "/admin/proprietes", text: "Tous les biens" }]
				} />
			</NavBarContainer>
			<Title>User Information</Title>
			{
				user && <UserInformationContainer>
					<Left>
						{/* <Profil>
							{
								user.document && 
							   <img src={`data:image/jpg;base64,${user.document}`} height="50" width="60" alt="Red dot" />
							}
						</Profil> */}
					</Left>
					<Right>
						<p><span>Username:</span> <span>{user.username}</span></p>
						<p><span>First Name:</span> <span>{user.firstName}</span></p>
						<p><span>Last Name:</span> <span>{user.lastName}</span></p>
						<p><span>Addresse:</span> <span>{user.adresse}</span></p>
						<p><span>Boite postal:</span> <span>{user.boitePostal}</span></p>
						<p><span>Lieu Naissance:</span> <span>{user.lieuNaissance}</span></p>
						<p><span>Pays de Naissance: </span><span>{user.pays}</span></p>
						<p><span>Pays Actuel:</span> <span>{user.paysActuel}</span></p>
						<p><span>Sexe:</span> <span>{user.sexe}</span></p>
						<p><span>Telephone:</span> <span>{user.tel}</span></p>
						<p><span>Type de compte:</span> <span>{user.typeCompte}</span></p>
					</Right>
					<form onSubmit={handleSetVerification}>
						{
							user.document && (
								<p>
									<a href={`data:${user.documentMimetype};base64,${user.document}`} download={`document.${user.documentMimetype.split("/")[1]}`}>Voir le document</a>
								</p>
							)
						}
						<Select onChange={(e) => setData({ ...data, verification: e.target.value })}>
							<option value={user.verification} disabled="disabled" selected="selected">{user.verification}</option>
							<option value="Refuser">Refuser</option>
							<option value="Verifier">Accepter</option>
						</Select>
						<input type="text" id="messageRefused" ref={messageRef} onChange={(e) => setData({ ...data, documentMessage: e.target.value })} placeholder="Message" />
						<input type="submit" value="enregistrer" />
						{
							message && <Message>{message}<span onClick={() => setMessage(!message)}><FontAwesomeIcon icon={solid('xmark')} /></span></Message>
						}
						{
							error && <Erreur>{error}<span onClick={() => setMessage(!error)}><FontAwesomeIcon icon={solid('xmark')} /></span></Erreur>
						}
					</form>
				</UserInformationContainer>
			}

		</Container>
	)
}


export default React.memo(UserDashboard);