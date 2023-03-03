import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button";
import Loader from "../../components/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import { login, googleLogin } from '../../actions/auth';

const required = (value) => {
  if (!value) {
    return ("Ce champs est requis")
  }
}

const Container = styled.div`

    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;


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

const Inputs = styled.input`

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

  color: red;
  display: flex;
  width: 80%;
  justify-content: flex-start;
  margin: 0 auto;
  font-size: ${props => props.theme.fontsm};

`

const ActionContainer = styled.div`

  display: flex;
  justify-content: flex-start;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  gap: 2rem;
  margin-top: ${props => props.theme.fontxl};
  text-align: center;

  & a {
    color: rgba(${props => props.theme.textRgba});
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 50%;
    margin: 0 auto;
    text-transform: uppercase;
    appearance: none;
    border: none;
    background-color: rgba(${props => props.theme.bodyRgba}, 1);
    color: ${props => props.theme.white};
    padding: 1rem;
    cursor: pointer;
    font-weight: 800;
    font-size: ${props => props.theme.fontsm};

    & .svg-inline--fa {
      height: 1.5rem;
    }
    &:hover {
      opacity: .9;
    }
  }

`

const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  var { message } = useSelector(state => state.message);

  const dispatch = useDispatch()

  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {

  }, [message])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await dispatch(login(data.username, data.password))
      .then(() => {
        setLoading(false)
        navigate("/dashboard");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false)
      });

  }

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    setLoading(true)
    dispatch(googleLogin(accessToken,navigate)).then(() => {
      setLoading(false)
      window.location.reload();
    }).catch(() => {
      setLoading(false)
    })
  }

  const Glogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />
  }
  return (
    <Container>
      <SignupContainer>
        <Title>
          Se <span>connecter</span>
        </Title>
        <InputContainer onSubmit={handleLogin}>
          <Inputs type="text" validations={[required]} name={data.username} required placeholder='Entrez votre nom' onChange={(e) => setData({ ...data, username: e.target.value })} />
          <Inputs type="password" validations={[required]} name={data.password} required placeholder='Entrez votre mot de passe' onChange={(e) => setData({ ...data, password: e.target.value })} />
          {message && <Error>{message}</Error>}
          <Inputs type="submit" placeholder='Entrez votre mot de passe' value="Se connecter" />
        </InputContainer>
        <ActionContainer>
          <div>Vous n'avez pas de compte? <Link to='/signup'>Creé un compte</Link></div>
          <button onClick={() => Glogin()}>
            <p><FontAwesomeIcon icon={brands('google-plus-g')} /></p>
            <span>Continuer avec google</span>
          </button>
        </ActionContainer>
      </SignupContainer>
      { loading && <Loader />}
    </Container>
  )
}

export default Login