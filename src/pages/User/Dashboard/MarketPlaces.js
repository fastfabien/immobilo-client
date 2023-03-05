import React, { useState, useRef, useEffect, useCallback} from 'react'
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

	& form {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 2rem;
		& div {
			display: flex;
			justify-content: space-between;
			align-items: center;	
			position: relative;
			&:last-child::after {
				content: "";
				width: 0.8em;
				height: 0.5em;
				background-color: rgba(${props => props.theme.textRgba}, 1);
				clip-path: polygon(100% 0%, 0 0%, 50% 100%);
				position: absolute;
				right: 0;
			}

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

`


const MarketPlaces = () => {


	const [datas, setDatas] = useState()
	const { isLoggedIn, user, token } = useSelector(state => state.auth);
	const [loading, setLoading] = useState(false)

	const getAllSales = useCallback(async () => {
	  setLoading(true)
	  try {
	    const response = await axios.get('/api/markets', { headers: authHeader() })
	    setDatas(response.data.markets)
	  } catch (error) {
	    console.log(error)
	  } finally {
	    setLoading(false)
	  }
	}, [])


	useEffect(() => {
		getAllSales()
	}, [getAllSales])


	return(
		<Container>
			<Filter>
				<form>
					<div>
						<FontAwesomeIcon icon={solid('search')} /><Input type="text" placeholder="Ville, Immeuble,..." />
					</div>
					<div>
						<FontAwesomeIcon icon={solid('euro-sign')} /><Input type="number" placeholder="Prix" />
					</div>
					<div>
						<FontAwesomeIcon icon={solid('percent')} />
						<Input type="number" placeholder="Rentabilité" />
						<select>
							<option>Mandona</option>
							<option>Mandona</option>
							<option>Mandona</option>
							<option>Mandona</option>
						</select>
					</div>
				</form>
			</Filter>
			{
				loading ? <Loader /> :
				<ProprieteContainer>
							{
								datas && datas.map((data) => (
									<React.Fragment key={data._id}>
										{
												<AchatMarket 
													id={data._id} 
													image={`data:image/jpg;base64,${data.bricks.propertie_id.image_couverture}`} 
													nom={ data.bricks.propertie_id.nom }
													zip={ data.bricks.propertie_id.zip }
													prix_total={ data.prix }
													nombre_bricks={ data.bricks.nombre_bricks }
													rentabiliter={ data.bricks.propertie_id.rentabiliter.toFixed(2) } 
													reverser={ data.bricks.propertie_id.reverser.toFixed(2) }
													region={ data.bricks.propertie_id.region }
													status={ data.status }
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

