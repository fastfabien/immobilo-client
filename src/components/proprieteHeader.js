import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ProprieteNavibar from "./ProprieteNavibar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'


const Container = styled.div`

	
	width: 100%;
	display: block;
	margin: 0 auto;


`

const Header = styled.div`

	
	margin-top: 1rem;
	margin-bottom: 2rem;

	& h1 {
		margin-bottom: .5rem;
		font-size: ${props => props.theme.fontxl};
	}

	& p {
		font-weight: light;
	}


`

const Body = styled.div`

	display: flex;
	justify-content: space-between;
	gap: .5rem;
	position: relative;
	cursor: pointer;

	& img {
		width: 50%;
		object-fit: cover;
	}

	& p {
		position: absolute;
		bottom: 1.5rem;
		right: 1.5rem;
		padding: ${props => props.theme.fontsm} ${props => props.theme.fontsm};
		background-color: ${props => props.theme.white};
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: center;
		box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
	}

`

const GalleryContainer = styled.div`


	width: 100%;
	min-height: 100vh;
	background-color: ${props => props.theme.white};
	padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 6;


`

const Gallery = styled.div`

	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 70%;
	margin: 0 auto;
	margin-top: 2rem;

	& img {
		display: block;
		width: 100%;
		border-radius: 10px;
  		box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
	}

`

const GoBack = styled.div`


	display: flex;
	justify-content: center;
	align-items: center;
	gap: .5rem;
	font-size: ${props => props.theme.fontlg};
	font-weight: 500;
	cursor: pointer;
	padding: .5rem;
	border: 2px solid rgba(${props => props.theme.bodyRgba}, .5);
	width: 10rem;
	text-align: center;
	border-radius: 5px;

	position: fixed;



`


const ProprieteInfoImage = ({ all_images, nom, rue, region, zip }) => {

	const [showGallery, setShowGallery] = useState(false)
	
	const navigate = useNavigate();

	useEffect(() => {
		
	}, [])

	return(
		<Container>
			<Header>
				<h1>{nom}</h1>
				<p>{rue}, {zip} {region}</p>
			</Header>
			<Body onClick={() => setShowGallery(!showGallery)}>
			{
				all_images && all_images?.slice(0, 2).map((image, i) => (
					<img key={i} src={`data:image/jpg;base64,${image}`} />
				))
			}
			<p><FontAwesomeIcon icon={solid('image')} />Voir les {all_images?.length} photos</p>
			</Body>
			{
				showGallery && 
				<GalleryContainer>
					<GoBack onClick={() => setShowGallery(!showGallery)}>
						<FontAwesomeIcon icon={solid('arrow-left-long')} /><span>Retour</span>
					</GoBack>
					<Gallery>
						{
							all_images && all_images?.map((image, i) => (
								<img key={i} src={`data:image/jpg;base64,${image}`} />
							))
						}
					</Gallery>
				</GalleryContainer>
			}
		</Container>	
	)
}

export default ProprieteInfoImage;

