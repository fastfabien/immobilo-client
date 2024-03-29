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
import FinanceInformation from "../../../components/FinanceInformation";
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

	@media screen and (max-width: 80em) {
		padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontmd};
		padding-top: 10rem;
	}

	@media screen and (max-width: 40em) {
		padding-top: 2rem;
	}


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

	@media screen and (max-width: 40em) {
		position: static;
	}

`

const InformationContainer = styled.div`


	display: flex;
	justify-content: space-between;
	gap: 2rem;


	@media screen and (max-width: 80em) {
		flex-direction: row;
	}

	@media screen and (max-width: 40em) {
		flex-direction: column;
	}

`

const Left = styled.div`

	width: 60%;
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media screen and (max-width: 40em) {
		width: 100%;
	}


`
const Right = styled.div`

	width: 40%;
	gap: 2rem;
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 40em) {
		width: 100%;
	}

`


const Finance = () => {

	const navigate = useNavigate();
	const [datas, setDatas] = useState()
	const { id } = useParams()

	const pourcentage_investisement = ((parseFloat(datas?.nb_brique_restant) * 100) / parseFloat(datas?.nb_brique)).toFixed(2)
	const formatedRevenuReverserValue = parseFloat(datas?.revenu_reverser).toLocaleString(undefined, { useGrouping: true, groupingSeparator: " " });
	const formatedValorisation = datas?.valorisation.toLocaleString(undefined, { useGrouping: true, groupingSeparator: " " });

	const getInformation = async () => {
		return await axios.get(API_URL + `${id}`, { headers: authHeader() }).then(async (data) => {
			await setDatas(data.data.property)
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getInformation()
	}, [])

	console.log(datas)

	return (
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
					<FinanceInformation

						information={[{ header: [<FontAwesomeIcon icon={solid('home')} />, "Acquisition"] },
						["Prix d'acquisition", datas?.prix_acquisition],
						["Rémunération", datas?.renumeration_service],
						["Frais de notaire", datas?.frais_notaire],
						["Réserve d’argent (notamment pour travaux)", datas?.reserve_argent],
						["Coût d'acquisition total", formatedValorisation]
						]}
					/>
					<FinanceInformation
						information={[{ header: [<FontAwesomeIcon icon={solid('home')} />, "Rendement Locatif Cible"] },
						["Loyers collectés", datas?.loyer_collecter_annuel],
						["Charges de coproprietés", `-${datas?.charge_co_proprietes}`],
						["Taxes foncières", `-${datas?.taxe_foncières}`],
						["Frais d’agence immobilière", `-${datas?.frais_agence}`],
						["Remboursement de l'emprunt", `-${datas?.remboursement_emprunt}`],
						["Assurances", `-${datas?.assurance}`],
						["Taxes", `-${datas?.taxes}`],
						["Revenu Reverser", `${formatedRevenuReverserValue} € (soit ${datas?.reverser.toFixed(2)}%)`]
						]}
					/>
					<FinanceInformation
						information={[{ header: [<FontAwesomeIcon icon={solid('home')} />, "valorisation"] },
						["Nombre de bricks", datas?.nb_brique],
						["Valorisation du bien", formatedValorisation],
						["Réserve d'argent actuelle", datas?.reserve_argent],
						["Prêt à rembourser", datas?.remboursement_emprunt],
						["Valeur Totale", formatedValorisation]
						]}
					/>
				</Left>
				<Right>
					<Brickeurs
						nom={datas?.nom}
						image={datas?.image_couverture}
						pourcentageInvestissement={pourcentage_investisement}
						brickRestant={datas?.nb_brique_restant}
						id={datas?._id}
					/>
					<Calculete reverser={datas?.reverser.toFixed(2)} potentiel_plus_value={datas?.potentiel_plus_value} />
				</Right>
			</InformationContainer>
		</Container>
	)
}

export default Finance;

