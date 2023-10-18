import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Button from '../../../components/Button';
import CardProject from "../../../components/CardProject";
import ProprieteNavibar from "../../../components/ProprieteNavibar";
import AchatMarket from "../../../components/AchatMarket";
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

const Filter = styled.div`

	display: flex;
	width: 80%;
	margin: 0 auto;
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);

	@media screen and (max-width: 80em) {
		width: 100%;
		padding-top: 2rem;
		padding-bottom: 3rem;
	}

	& form {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 2rem;
		@media screen and (max-width: 80em) {
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;

			gap: 1rem;
			
			& div {
				width: 100%;
			}
		}
		& div {
			display: flex;
			justify-content: space-between;
			align-items: center;	
			position: relative;
			

			& select {
				appearance: none;
				border: none;
				outline: none;
				padding: .5rem;
				padding-left: .5rem;
				padding-right: 2rem;
				background-color: transparent;
				width: 100%;
				cursor: pointer;

				@media screen and (max-width: 40em) {
					padding: 1rem 2rem;
					border-bottom: 2px solid ${p => p.theme.principal};
				}

				& option {
					padding: 1rem;
				}
			}
		}
	}


`

const Input = styled.input`

	appearance: none;
	-webkit-appearance: none;
   -moz-appearance: none;
	padding: 1rem .5rem;
	border: none;
	outline: none;

	@media screen and (max-width: 40em) {
		width: 100%;
		border-bottom: 2px solid ${p => p.theme.principal};
	}

`

const SelectContainer = styled.div`



`

const Select = styled.select`

`

const filterProprietes = (datas, villeFilter, priceFilter, rentabiliteFilter, recentFilter) => {
	if (recentFilter === 'recent') {
		datas.sort((a, b) => {
			return new Date(b.updatedAt) - new Date(a.updatedAt)
		})
	} else if (recentFilter === 'ancien') {
		datas.sort((a, b) => {
			return new Date(a.updatedAt) - new Date(b.updatedAt)
		})
	} else if (recentFilter === 'croissant') {
		datas.sort((a, b) => {
			return a.prix - b.prix
		})
	} else if (recentFilter === 'decroissant') {
		datas.sort((a, b) => {
			return b.prix - a.prix
		})
	} else if (recentFilter === 'reverser') {
		datas.sort((a, b) => {
			return b.bricks.propertie_id.reverser - a.bricks.propertie_id.reverser
		})
	} else if (recentFilter === 'rentabilite') {
		datas.sort((a, b) => {
			return b.bricks.propertie_id.rentabiliter - a.bricks.propertie_id.rentabiliter
		})
	}

	return datas?.filter(
		(data) =>
			(data.bricks.propertie_id.rue.includes(villeFilter) ||
				data.bricks.propertie_id.region.includes(villeFilter) ||
				data.bricks.propertie_id.nom.includes(villeFilter)) &&
			data.prix >= priceFilter &&
			data.bricks.propertie_id.rentabiliter >= rentabiliteFilter
	);
};

const fetchData = async (setLoading, setDatas) => {
	setLoading(true);
	try {
		const response = await axios.get('/api/markets', { headers: authHeader() });
		setDatas(response.data.markets);
		setLoading(false);
	} catch (error) {
		setLoading(false);
	}
};

const MarketPlaces = () => {


	const [datas, setDatas] = useState()
	const [villeFilter, setVilleFilter] = useState("")
	const [priceFilter, setPriceFilter] = useState("")
	const [typeFilter, setTypeFilter] = useState("")
	const [rentabiliteFilter, setRentabiliteFilter] = useState("")
	const [recentFilter, setRecentFilter] = useState("")
	const { isLoggedIn, user, token } = useSelector(state => state.auth);
	const [loading, setLoading] = useState(false)



	useEffect(() => {
		fetchData(setLoading, setDatas)
	}, [setDatas])


	console.log(datas)

	const handleVilleChange = (e) => {
		setVilleFilter(e.target.value);
	};

	const handlePriceChange = (e) => {
		setPriceFilter(e.target.value)
	}

	const handleRentabiliteFilter = (e) => {
		setRentabiliteFilter(e.target.value)
	}

	const handleTypeChange = (e) => {
		setTypeFilter(e.target.value);
	};

	const handleChangeSelect = (e) => {
		setRecentFilter(e.target.value)
	}

	let filteredProprietes = useMemo(
		() => filterProprietes(datas, villeFilter, priceFilter, rentabiliteFilter, recentFilter),
		[datas, villeFilter, priceFilter, rentabiliteFilter, recentFilter]
	);



	return (
		<Container>
			<Filter>
				<form>
					<div>
						<FontAwesomeIcon icon={solid('search')} /><Input type="text" value={villeFilter} placeholder="Ville, Immeuble,..." onChange={handleVilleChange} />
					</div>
					<div>
						<FontAwesomeIcon icon={solid('euro-sign')} /><Input type="number" placeholder="Prix" value={priceFilter} onChange={handlePriceChange} />
					</div>
					<div>
						<FontAwesomeIcon icon={solid('percent')} />
						<Input type="number" placeholder="Rentabilité" value={rentabiliteFilter} onChange={handleRentabiliteFilter} />
					</div>
					<SelectContainer>
						<Select onChange={(e) => handleChangeSelect(e)}>
							<option selected disabled>Choississez un option...</option>
							<option value="recent">Plus recent</option>
							<option value="ancien">Plus ancien</option>
							<option value="croissant">Prix Croissant</option>
							<option value="decroissant">Prix Decroissant</option>
							<option value="reverser">Revenu reversés les plus importants</option>
							<option value="rentabilite">Rentabilité la plus importante</option>
						</Select>
					</SelectContainer>
				</form>
			</Filter>
			{
				loading ? <Loader /> :
					<ProprieteContainer>
						{
							filteredProprietes && filteredProprietes.map((data) => (
								<React.Fragment key={data._id}>
									{
										<AchatMarket
											id={data._id}
											bricks_id={data.bricks._id}
											currentUser={data.user}
											image={`data:image/jpg;base64,${data.bricks.propertie_id.image_couverture}`}
											nom={data.bricks.propertie_id.nom}
											zip={data.bricks.propertie_id.zip}
											prix_total={data.prix}
											nombre_bricks={data.bricks.nombre_bricks}
											rentabiliter={data.bricks.propertie_id.rentabiliter.toFixed(2)}
											reverser={data.bricks.propertie_id.reverser.toFixed(2)}
											region={data.bricks.propertie_id.region}
											status={data.status}
											setDatas={setDatas}
										/>
									}
								</React.Fragment>
							))
						}
					</ProprieteContainer>}
		</Container>
	)
}

export default MarketPlaces;

