import React, { useState, useRef, useEffect, useCallback} from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Buffer } from "buffer"
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
  	position: relative;


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


`


const MyPropriete = () => {


	const [datas, setDatas] = useState()
	const [loading, setLoading] = useState(false)

	const getAllPropriete =  async () => {
		setLoading(true)
		return await axios.get('/api/bricks', { headers: authHeader() }).then((data) => {
			setDatas(data.data.bricks)
			setLoading(false)
		}).catch((err) => {
			setLoading(false)
			console.log(err)
		})	
	}

	useEffect(() => {
		getAllPropriete()
		console.log(datas)
	}, [])


	return(
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
										image={`data:image/jpg;base64,${Buffer.from(data.propertie_id.images[0].data).toString('base64')}`} 
										nom={ data.propertie_id.nom }
										zip={ data.propertie_id.zip }
										prix_total={ data.prix_total }
										nombre_bricks={ data.nombre_bricks }
										rentabiliter={ data.propertie_id.rentabiliter } 
										reverser={ data.propertie_id.reverser.toFixed(2) }
										region={ data.propertie_id.region }
										status={ data.status === "Sell" && data.status }
									 />
									))
							}
						</ProprieteContainer>}
		</Container>	
	)
}

export default MyPropriete;

