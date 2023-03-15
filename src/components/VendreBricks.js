import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Buffer } from "buffer"
import CardProject from "./CardProject";
import ProprieteNavibar from "./ProprieteNavibar";
import Loader from "./Loader";
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
	height: 80%;
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);

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
	background-color: red;
	color: ${props => props.theme.white};
	position: fixed;
	top: 0;
	right: 0;


`

const SellBricks = ({ id, image, nom, zip, prix_total, nombre_bricks, rentabiliter, reverser, region, status }) => {

	const [show, setShow] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const [data, setData] = useState({
		new_price: 0,
		bricks_id: id
	})


	const handleSellBricks = async (e) => {
		e.preventDefault()

		setIsClicked(true)

		setLoading(true)

		await axios.post('/api/market', data, { headers: authHeader() }).then((data) => {
			setLoading(false)
			setShow(!show)
			window.location.reload()
		}).catch((err) => {
			setLoading(false)
		})

	}


	useEffect(() => {

	}, [])




	return (
		<>
			{
				loading && <Loader />
			}
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
					<span> ~{prix_total / nombre_bricks} € / brick</span>
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
								Vendre
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
							Vendre des bricks
						</Header>
						<Body>
							<img src={img} alt={nom} />
							<h2>{nom}</h2>
							<span>{zip} - {region}</span>

							<Information>
								<div>
									Argent investi: <span>{prix_total} €</span>
								</div>
								<div>
									Nombre de bricks: <span> {nombre_bricks} </span>
								</div>
								<div>
									Prix unitaire de bricks: <span> 10 € </span>
								</div>
							</Information>
							<Vente onSubmit={handleSellBricks}>
								<div>
									<p>Prix des bricks: </p>
									<input type="number" value={data.new_price} min="0" onChange={(e) => setData({ ...data, new_price: e.target.value })} />
								</div>
								<Btn disabled={data.new_price === "0" || data.new_price === "" || data.new_price === 0 ? true : false || isClicked} type="submit" color="#fff" background="rgba(231,62,17, 1)">Vendre les {nombre_bricks} bricks à {data.new_price} € dont {(data.new_price / nombre_bricks).toFixed(2)} € par bricks</Btn>
							</Vente>
						</Body>
					</Container>
					{
						success !== '' && <Success>{success}</Success>
					}
					{
						error !== '' && <Error>{error}</Error>
					}
				</BuyContainer>
			}
		</>
	)
}

export default SellBricks;

