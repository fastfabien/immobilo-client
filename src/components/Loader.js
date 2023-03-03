import React from 'react'
import styled, { keyframes } from 'styled-components'



const LoadingAnimation = keyframes`

0% {
  transform: translateX(100px);
}

100% {
  transform: translateX(0);
}

`

const LoaderContainer = styled.div`


	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 9999999;

	

`


const Container = styled.div`

	
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	& div {
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 10px;
		height: 20px;
		background: rgba(${props => props.theme.textRgba}, 1);
		animation: ${LoadingAnimation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

		&:nth-child(1) {
		  left: 8px;
		  animation-delay: -0.24s;
		}
		&:nth-child(2) {
		  left: 32px;
		  animation-delay: -0.12s;
		}
		&:nth-child(3) {
		  left: 56px;
		  animation-delay: 0;
		}
	}


`

const Loader = () => {

	return(
		<LoaderContainer>
			<Container>
				<div></div><div></div><div></div>	
			</Container>	
		</LoaderContainer>
	)
}

export default Loader;

