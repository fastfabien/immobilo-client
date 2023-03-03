import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { register, googleRegister } from "../../actions/auth"
import message from '../../reducers/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const Container = styled.div`

    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;

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

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState()
  const [welcome, setWelcome] = useState(false)

  const navigate = useNavigate()
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(data.username, data.email, data.password))
      .then(() => {
        setWelcome(true)
      })
  }

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    dispatch(googleRegister(accessToken, navigate)).then(() => {
      window.location.reload()
    })
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  return (
    <Container>
      {
        welcome ? <div>Votre compte a été crée avec succes, verifier votre email pour confirmer.</div> : <SignupContainer>
          <Title>
            Crée <span>un Compte</span>
          </Title>
          <InputContainer onSubmit={handleSubmit}>
            <Input type="text" name={data.username} required placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setData({ ...data, username: e.target.value })} />
            <Input type="email" name={data.email} required placeholder='Entrez votre email' onChange={(e) => setData({ ...data, email: e.target.value })} />
            <Input type="password" name={data.password} required placeholder='Entrez votre mot de passe' onChange={(e) => setData({ ...data, password: e.target.value })} />
            {message && <Error>{message}</Error>}
            <Input type="submit" placeholder='Entrez votre mot de passe' value="S'inscrire" />
          </InputContainer>
          <ActionContainer>
            <div>Vous avez déjà un compte? <Link to='/login'>Se connecter</Link></div>
            <button onClick={() => login()}>
              <p><FontAwesomeIcon icon={brands('google-plus-g')} /></p>
              <span>Continuer avec google</span>
            </button>
          </ActionContainer>
        </SignupContainer>
      }
    </Container>
  )
}

export default Signup