import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../../../services/auth-header";
import { Buffer } from "buffer"
import axios from "axios";
import ProprieteNavibar from "../../../components/ProprieteNavibar";
import ProprieteInfoImage from "../../../components/proprieteHeader";
import Actualite from "../../../components/Actualite";
import Rentabilite from "../../../components/Rentabilite";
import PourquoiInvestir from "../../../components/PourquoiInvestir";
import Presentation from "../../../components/Presentation";
import Brickeurs from "../../../components/Brickeurs";
import Calculete from "../../../components/Calculete";
import img from "../../../assets/house2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'

const API_URL = "/api/properties/";

const Container = styled.div`

	
	width: 90%;
	display: block;
	margin: 0 auto;
	min-height: 100vh;
  	padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  	padding-top: 10rem;
  	position: relative;


`

const GoBack = styled.div`


	display: flex;
	justify-content: start;
	align-items: center;
	gap: .5rem;
	font-size: ${props => props.theme.fontlg};
	font-weight: 500;
	cursor: pointer;





`

const NavBarContainer = styled.div`

	
	margin-top: 1rem;
	position: sticky;
	top: 0;
	background-color: ${props => props.theme.white};
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	z-index: 5;

`

const InformationContainer = styled.div`


	display: flex;
	justify-content: space-between;
	gap: 2rem;
	margin-top: 2rem;

`

const Left = styled.div`

	width: 60%;
	display: flex;
	flex-direction: column;
	gap: 2rem;


`
const Right = styled.div`

	width: 40%;
	gap: 2rem;
	display: flex;
	flex-direction: column;

`


const Content = styled.div`

	line-height: 1.5;
	background-color: ${props => props.theme.white};
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	padding: 2rem;
	& div {
		margin-top: 2rem;
	}	

`


const Lieu = () => {

	const navigate = useNavigate();
	const [datas, setDatas] = useState()
	const { id } = useParams()

	const pourcentage_investisement= ((parseFloat(datas?.nb_brique_restant) * 100) / parseFloat(datas?.nb_brique)).toFixed(2)

	const getInformation = async () => {
		return await axios.get(API_URL + `${id}`, { headers: authHeader() }).then( async (data) => {
			await setDatas(data.data.property)
		}).catch((err) => {
			console.log(err)
		})	
	}

	useEffect(() => {
		getInformation()
	}, [])

	

	return(
		<Container>
			<GoBack onClick={() => navigate(-1)}>
				<FontAwesomeIcon icon={solid('arrow-left-long')} /><span>Retour</span>
			</GoBack>
			<ProprieteInfoImage 
				all_images={datas?.images} 
				nom={datas?.nom}
				rue={datas?.rue}
				region={datas?.region}
				zip={datas?.zip}
				 />
			<NavBarContainer>
				<ProprieteNavibar alignment="start" content={
					[{ lien: `/proprietes/${id}`, text: "Général" },
					{ lien: `/proprietes/${id}/finance`, text: "Finance" },
					{ lien: `/proprietes/${id}/location`, text: "Lieu" }]
				} />
			</NavBarContainer>
			<InformationContainer>
				<Left>
					<Content>
						<h2>À propos</h2>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu consectetur tortor, pellentesque vehicula sapien. Praesent tristique, justo in vulputate finibus, turpis ex tempor mauris, ut rhoncus justo dui at lectus. Etiam cursus, odio sit amet volutpat mollis, lacus nulla sodales leo, blandit tempus elit lectus vel risus. Nunc nec egestas dui. Nulla eget sagittis mi, ac rutrum diam. Curabitur eget mauris a justo convallis mattis rhoncus non nisl. Sed at pulvinar ante. Nam dignissim laoreet mi, a molestie ante sodales nec. Integer ultrices dictum dolor sollicitudin sagittis. In vel nunc et nisl aliquet placerat aliquam at dolor. Duis semper, libero nec varius tempor, erat ante suscipit nisi, vitae tempor tellus dolor vitae ipsum.
						</div>
					</Content>
				</Left>
				<Right>
					<Brickeurs 
						nom={datas?.nom}
						image={datas?.image_couverture}
						pourcentageInvestissement={pourcentage_investisement}
						brickRestant={datas?.nb_brique_restant}
						id={datas?._id}
					 />
					<Calculete reverser={datas?.reverser.toFixed(2)} />
				</Right>
			</InformationContainer>
		</Container>	
	)
}

export default Lieu;
