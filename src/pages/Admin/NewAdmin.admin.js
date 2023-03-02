import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from 'styled-components'
import authHeader from "../../services/auth-header";
import Button from "../../components/Button";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'

const API_URL = "/api/user/";


const Container = styled.div`

	width: 80%;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	padding-top: 8rem;

	table {
	  font-family: arial, sans-serif;
	  border-collapse: collapse;
	  width: 100%;
	  margin-top: 2rem;
	  box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);

	  & a {
	  	display: flex;
	  	justify-content: center;
	  	text-align: center;
	  	color: red;
	  }
	}

	td, th {
	  border: 1px solid transparent;
	  text-align: left;
	  padding: 8px;
	  box-shadow: 0px 0px 2px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	  margin: 20px;
	}

	tr:nth-child(even) {
	  background-color: rgba(${(props) => props.theme.textRgba}, 0.18);
	}


`

const SignupContainer = styled.div`

    width: 60%;
    padding: ${props => props.theme.fontxxl};
    box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
    border-radius: 10px;

    @media screen and (max-width: 50em) {
      width: 100%;
      box-shadow: unset;
      padding: ${props => props.theme.fontsm} ${props => props.theme.fontlg};
    }

`

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontxl};
  font-family: "Changa";
  text-transform: uppercase;
  font-weight: 800;
  color: rgba(${(props) => props.theme.bodyRgba}, 1);
  margin-bottom: ${(props) => props.theme.fontlg};
  & span {
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 10px;
      background-color: rgba(${(props) => props.theme.textRgba}, 1);
      position: absolute;
      bottom: 1rem;
      right: 0;
      z-index: -1;
    }
  }

  @media screen and (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};
    margin-bottom: ${(props) => props.theme.fontxl};
  }
`;

const InputContainer = styled.form`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  & input[type="submit"] {
    color: ${props => props.theme.white};
    background-color: rgba(${props => props.theme.textRgba}, 1);
    outline: none;
    border: none;
    padding: ${props => props.theme.fontsm} ${props => props.theme.fontmd};
    font-size: ${props => props.theme.fontmd};
    font-weight: 800;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    opacity: .9;
    width: 80%;

    &:hover {
        opacity: .8;
    }
  }

`

const Input = styled.input`

  padding: ${props => props.theme.fontlg} ${props => props.theme.fontlg};
  width: 80%;
  outline: none;
  border: 1px solid rgba(${(props) => props.theme.textRgba}, 1); 
  border-radius: 5px;

`

const goLeft = keyframes`

0% {
  transform: translateX(500px);
}

100% {
  transform: translateX(0);
}

`

const goRight = keyframes`

0% {
  transform: translateX(0);
}

100% {
  transform: translateX(500px);
}

`

const Error = styled.span`

  color: ${props => props.theme.white};
  background-color: red;
  padding: 1rem 2rem;
  position: absolute;
  top: 5rem;
  right: 0;
  animation: ${goLeft} 1s linear;

`

const ActionContainer = styled.div`

  margin-top: ${props => props.theme.fontxl};
  text-align: center;

  & a {
    color: rgba(${props => props.theme.textRgba});
  }

`

const NewAdmin = () =>  {

	const [data, setData] = useState({
		username: "",
	    email: "",
	    password: ""
	})
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		
	}, [])

	const handleSubmit = async (e) => {
    e.preventDefault();
    return await axios.post("/api/auth/createUser", data).then(() => {
    		navigate("/admin");
    	}).catch((err) => {
    		setError(err.message)
    	})
  	}



	return(
		<Container>
			<SignupContainer>
		        <Title>
		          Crée <span>un Compte admin</span>
		        </Title>
		        <InputContainer onSubmit={handleSubmit}>
		          <Input type="text" name={data.username} required placeholder='Entrez votre nom' onChange={(e) => setData({ ...data, username: e.target.value })} />
		          <Input type="email" name={data.email} required placeholder='Entrez votre email' onChange={(e) => setData({ ...data, email: e.target.value })} />
		          <Input type="password" name={data.password} required placeholder='Entrez votre mot de passe' onChange={(e) => setData({ ...data, password: e.target.value })} />
		          {error && <Error>{error}</Error>}
		          <Input type="submit" placeholder='Entrez votre mot de passe' value="Creer" />
		        </InputContainer>
		    </SignupContainer>
		</Container>
	)
}


export default NewAdmin;