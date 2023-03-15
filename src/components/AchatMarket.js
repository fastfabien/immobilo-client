import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Buffer } from "buffer"
import CardProject from "./CardProject";
import ProprieteNavibar from "./ProprieteNavibar";
import img from "./../assets/house2.jpg";
import authHeader from "./../services/auth-header";

const Content = styled.div`


	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0;

	& div {
		box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
		min-width: 32%;
		padding: 1rem;
		&:first-child {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: .5rem;
			& img {
				width: 4rem;
				height: 4rem;
				object-fit: cover;
				border-radius: 10%;
			}
			& p {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: .5rem;
				& h2 {
					font-size: ${props => props.theme.fontmd};
				}
			}
		}
		&:not(:first-child):not(:last-child) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			gap: .5rem;
			& p {
				color: rgba(${(props) => props.theme.bodyRgba}, 0.5);
				font-size: ${props => props.theme.fontxs};
			}
			& span {
				font-weight: 800;
			}
		}
		&:last-child {
			display: flex;
			padding: 0;
			& div:first-child {
				width: 60%;
				box-shadow: none;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				& p {
					display: flex;
					justify-content: space-between;
					&:first-child {
						color: rgba(${(props) => props.theme.bodyRgba}, 0.5);
						font-size: ${props => props.theme.fontxs};
					}
				}
			}
			& div:last-child {
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: none;
			}
		}
	}


`


const Btn = styled.button`

    position: relative;
    color: ${props => props.color};
    background-color: ${props => props.background};
    outline: none;
    border: none;
    padding: ${props => props.theme.fontsm} ${props => props.theme.fontmd};
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.theme.fontsm};
    font-weight: 800;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    opacity: .9;
    text-transform: uppercase;
    &:hover {
        opacity: .8;
    }
    &:disabled {
    	opacity: .5;
    	cursor: not-allowed;
    }

`

const BuyContainer = styled.div`


	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(${props => props.theme.bodyRgba}, .2);
	z-index: 8;
	display: flex;
	justify-content: center;
	align-items: center;


`

const Container = styled.div`

	width: 60%;
	background-color: ${props => props.theme.white};
	height: auto;
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	padding-bottom: 2rem;
`

const Header = styled.div`

	padding: 1rem;
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	position: relative;
	text-align: center;


`

const Button = styled.div`

  
  position: absolute; 
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  appearance: none;
  outline: none;

  & span, & span::after {
    display: block;
    width: 25px;
    height: 3px;
    background-color: red;
  }
  & span {
    transform: rotate(45deg);
  }
  & span::after {
    content: "";
    transform: rotate(90deg);
  }


`

const Body = styled.div`

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;

	& img {
		width: 15rem;
		height: 10rem;
		object-fit: cover;
		border-radius: 20px;
		margin-bottom: 1rem;
	}

`

const Information = styled.div`


	display: flex;
	justify-content: space-between;
	gap: 2rem;
	margin-top: 2rem;
	margin-bottom: 2rem;

	& div {
		& span {
			font-weight: 800;
		}
	}	


`

const Vente = styled.form`


	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	gap: 1rem;

	& div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 2rem;

		& input {
			padding: .5rem 1rem;
			border: none;
			background-color: rgba(${props => props.theme.bodyRgba}, .1);
			appearance: none;
			outline: none;
		}
	}

`

const Success = styled.div`

	
	padding: 1rem;
	background-color: green;
	color: ${props => props.theme.white};
	position: fixed;
	top: 0;
	right: 0;


`

const Error = styled.div`

	
	padding: 1rem;
	color: red;


`

const AchatMarket = ({ id, image, nom, zip, prix_total, nombre_bricks, rentabiliter, reverser, region, status, setDatas }) => {

	const { isLoggedIn, user, token, wallet } = useSelector(state => state.auth);
	const [show, setShow] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [data, setData] = useState({
		new_price: 0
	})
	const [isClicked, setIsClicked] = useState(false)


	const handleSellBricks = async (e) => {
		e.preventDefault()

		setIsClicked(true);

		const value = {
			market_id: id,
			prix_total: prix_total
		}

		await axios.post('/api/markets/sell', value, { headers: authHeader() }).then((data) => {
			window.location.reload()
		}).catch((err) => {
			console.log(err)
		})

	}


	useEffect(() => {

	}, [])




	return (
		<>
			<Content key={id}>
				<div>
					<img src={image} alt={nom} />
					<p>
						<h2>{nom}</h2>
						<span>{zip} - {region}</span>
					</p>
				</div>
				<div>
					<p> Prix du lot </p>
					<span>{prix_total} €</span>
					<span> ~{(prix_total / nombre_bricks).toFixed(2)} € / brick</span>
				</div>
				<div>
					<div>
						<p> Benefices </p>
						<p>{rentabiliter}% rentabilité</p>
						<p>{reverser}% reversé</p>
					</div>
					<div>
						{
							status === "Sell" &&
							<Btn onClick={() => setShow(!show)} color="#fff" background="rgba(231,62,17, 1)">
								Acheter
							</Btn>
						}
					</div>
				</div>
			</Content>
			{
				show &&
				<BuyContainer>
					<Container>
						<Header>
							<Button onClick={() => setShow(!show)}><span></span></Button>
							Acheter des bricks
						</Header>
						<Body>
							<img src={img} alt={nom} />
							<h2>{nom}</h2>
							<span>{zip} - {region}</span>

							<Information>
								<div>
									Nombre: <span> {nombre_bricks} </span>
								</div>
								<div>
									Prix vente/d'origine: <span> {(prix_total / nombre_bricks).toFixed(2)} € / 10 € </span>
								</div>
								<div>
									Rentabilité: <span> {rentabiliter} % </span>
								</div>
								<div>
									Reversé: <span> {reverser} % </span>
								</div>
							</Information>
							<Vente onSubmit={handleSellBricks}>
								<input type="hidden" value={prix_total} />
								{
									error !== '' && <Error>{error}</Error>
								}
								{
									wallet < prix_total && <Error>Vous n'avez pas assez d’argent dans votre portefeuille, s'il vous plait fait un depot!</Error>
								}
								<Btn disabled={wallet < prix_total || isClicked ? true : false} type="submit" color="#fff" background="rgba(231,62,17, 1)">Acheter les bricks pour {prix_total} €</Btn>
							</Vente>
						</Body>
					</Container>
					{
						success !== '' && <Success>{success}</Success>
					}
				</BuyContainer>
			}
		</>
	)
}

export default AchatMarket;

