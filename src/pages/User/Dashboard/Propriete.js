import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import CardProject from "../../../components/CardProject";
import ProprieteNavibar from "../../../components/ProprieteNavibar";
import img from "../../../assets/house2.jpg";


const Container = styled.div`

	
	width: 100%;
	display: block;
	margin: 0 auto;
	min-height: 100vh;
  	padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  	padding-top: 10rem;

	@media screen and (max-width: 70em) {
      padding: ${(props) => props.theme.fontmd} ${(props) => props.theme.fontxl};
	  padding-top: 10rem;
    }

	@media screen and (max-width: 40em) {
		padding: ${(props) => props.theme.fontmd} ${(props) => props.theme.fontmd};
		padding-top: 2rem;
  	}



`

const ProprieteContainer = styled.div`

	display: flex;
	justify-content: start;
	flex-wrap: wrap;
	gap: 3rem;
	width: 80%;
	margin: 2rem auto;
	position: relative;

	@media screen and (max-width: 70em) {
		justify-content: space-around;
      	width: 90%;
	  	gap: 1rem;
    }

	& > div {
		& img {
			height: 100%;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}


`

const Proprietes = () => {


	const [datas, setDatas] = useState()
	const [loading, setLoading] = useState(false)
	const { isLoggedIn } = useSelector(state => state.auth);

	const getAllPropriete = () => {
		setLoading(true)
		return axios.get('/api/properties').then(async (data) => {
			await setDatas(data.data)
			setLoading(false)
		}).catch((err) => {
			setLoading(false)
		})
	}


	useEffect(() => {
		getAllPropriete()
	}, [])



	return (
		<Container>
			<ProprieteNavibar alignment="center" content={
				[{ lien: "/proprietes", text: "Tous les biens" },
				{ lien: "/mes-proprietes", text: "Mes biens" },
				{ lien: "/mes-ventes", text: "Mes ventes en cours" }]
			} />
			{
				loading ?
					<Loader /> :
					<ProprieteContainer>
						{
							datas && datas?.map((data) => (

								<CardProject
									key={data._id}
									id={data._id}
									image={data.image_couverture}
									nom={data.nom}
									adresse={`${data.zip} ${data.rue}`}
									prix={`${data.valorisation.toLocaleString(undefined, { useGrouping: true, groupingSeparator: " " })}€`}
									rentabilité={`${data.rentabiliter.toFixed(2)}%`}
									reversé={`${data.reverser.toFixed(2)}%`}
									pourcentageInvestissement={(((parseFloat(data?.nb_brique) - parseFloat(data?.nb_brique_restant)) * 100) / parseFloat(data?.nb_brique)).toFixed(2)} //((parseFloat(data?.nb_brique_restant) * 100) / parseFloat(data?.nb_brique))
									acheter={isLoggedIn}
									brickRestant={data.nb_brique_restant}
								/>

							))
						}
					</ProprieteContainer>
			}

		</Container>
	)
}

export default Proprietes;

