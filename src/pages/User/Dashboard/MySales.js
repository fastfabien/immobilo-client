import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from '../../../components/Button';
import CardProject from "../../../components/CardProject";
import ProprieteNavibar from "../../../components/ProprieteNavibar";
import SellBricks from "../../../components/VendreBricks";
import img from "../../../assets/house2.jpg";
import authHeader from "../../../services/auth-header";
import Loader from '../../../components/Loader';

const Container = styled.div`

	
	width: 100%;
	display: block;
	margin: 0 auto;
	min-height: 100vh;
  	padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  	padding-top: 10rem;

	@media screen and (max-width: 70em) {
		padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontmd};
		padding-top: 10rem;
	}

	@media screen and (max-width: 40em) {
		padding-top: 2rem;
	}


`

const ProprieteContainer = styled.div`

	display: flex;
	justify-content: start;
	flex-direction: column;
	flex-wrap: wrap;
	gap: .1rem;
	width: 80%;
	margin: 0 auto;
	margin-top: 2rem;

	@media screen and (max-width: 80em) {
		width: 100%;
		gap: 2rem;
	}


`

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
				width: 100%;
				padding: 1rem;
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

`


const MySales = () => {


	const [datas, setDatas] = useState()
	const [loading, setLoading] = useState(false)

	const getMySales = useCallback(() => {
		setLoading(true)
		return axios.get('/api/market', { headers: authHeader() }).then((data) => {
			setDatas(data.data.markets)
			setLoading(false)
		}).catch((err) => {
			setLoading(false)
			console.log(err)
		})
	}, [])

	useEffect(() => {
		getMySales()
		console.log(datas)
	}, [])


	return (
		<Container>
			<ProprieteNavibar alignment="center" content={
				[{ lien: "/proprietes", text: "Tous les biens" },
				{ lien: "/mes-proprietes", text: "Mes biens" },
				{ lien: "/mes-ventes", text: "Mes ventes en cours" }]
			} />
			{
				loading ? <Loader /> :
					<ProprieteContainer>
						{
							datas && datas.map((data) => (

								<SellBricks
									id={data._id}
									image={`data:image/jpg;base64,${data.bricks.propertie_id.image_couverture}`}
									nom={data.bricks.propertie_id.nom}
									zip={data.bricks.propertie_id.zip}
									prix_total={data.prix}
									nombre_bricks={data.bricks.nombre_bricks}
									rentabiliter={data.bricks.propertie_id.rentabiliter}
									reverser={data.bricks.propertie_id.reverser.toFixed(2)}
									region={data.bricks.propertie_id.region}
								/>
							))
						}
					</ProprieteContainer>}
		</Container>
	)
}

export default MySales;

