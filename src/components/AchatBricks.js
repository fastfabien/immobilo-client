import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import CustomButton from './CustomButton';
import Loader from './Loader';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { buyBricks, refreshUserInformation } from '../actions/auth';



const AcheterBricksContainer = styled.div`


  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, .2);
  z-index: 99;


`


const Button = styled.div`

  
  position: absolute; 
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  appearance: none;
  outline: none;

  & span, & span::after {
    display: block;
    width: 25px;
    height: 3px;
    background-color: red;
  }
  & span {
    transform: rotate(45deg);
  }
  & span::after {
    content: "";
    transform: rotate(90deg);
  }


`


const AcheterBricksContent = styled.div`


  width: 50%;
  height: 80vh;
  background-color: ${props => props.theme.white};

  & .header {
    position: relative;
    text-align: center;
    padding: 1rem;
    box-shadow: 1px 2px 2px rgba(${(props) => props.theme.bodyRgba}, 0.1);
  }

  & .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 3rem;
    position: relative;

    & input[type='submit'] {
      width: 100%;
      display: block; 
      outline: none;
      border: none;
      padding: .75rem;
      text-align: center;
      color: ${props => props.theme.white};
      background-color: rgba(${props => props.theme.textRgba}, 1);
      margin-top: 1rem;
      cursor: pointer;
      border-radius: 2px;
      margin-top: 1.5rem;
      font-weight: 800;
      font-size: ${props => props.theme.fontmd};

      &:disabled {
        cursor: not-allowed;
        opacity: .5; 
      }
    }

    & .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      & div {
        width: 90%!important;
      }
    }

    & .info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: .5rem;

      & img {
        width: 10rem;
        height: 10rem;
        object-fit: cover;
        border-radius: 10px;
      }

      & p {
        font-weight: 800;
        margin-top: 1rem;
      }
    }
  }
  

`


const FondError = styled.div`

  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  width: 80%;
  position: absolute;
  top: 2px;
  padding: 3rem;
  background-color: ${props => props.theme.white};border-radius: 10px;
  box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);

  color: red;

  & .svg-inline--fa {
        height: 1.8em;
  }

  & p {
    color: rgba(${props => props.theme.bodyRgba}, 1);
  }


`


const InputContainer = styled.div`


  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;

`

const Input = styled.input`


  padding: .5rem .75rem;
  border: none;
  border: 2px solid rgba(${props => props.theme.bodyRgba}, .2);
  border-radius: 2px;
  outline: 2px solid transparent;
  font-size: ${props => props.theme.fontmd};

  width: 100%;

  &:read-only {
    background-color: rgba(${props => props.theme.bodyRgba}, .2);
    border: none;
    color: rgba(${props => props.theme.textRgba}, 1);
    font-weight: 800;
  }
  &::placeholder {
    color: rgba(${props => props.theme.textRgba}, 1);
  }


`

const PourcentageInvestissementContainer = styled.div`
  color: rgba(${(props) => props.theme.textRgba}, 0.8);
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 800;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const PourcentageInvestissement = styled.div`
  width: 80%;
  height: 5px;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
  background-color: rgba(${(props) => props.theme.bodyRgba}, 0.2);
  position: relative;

  &::after {
    content: "";
    display: block;
    border-radius: 10px;
    background-color: rgba(${(props) => props.theme.textRgba}, 0.8);
    height: 100%;
    width: ${(props) => props.pourcentage};
  }
`;



const AchatBricks = ({ nom, image, pourcentageInvestissement, brickRestant, setShowAction, id }) => {


  const { isLoggedIn, user, token, wallet } = useSelector(state => state.auth);
  const navigate = useNavigate()
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    nombreBricks: 0,
    prixTotalBricks: 0
  })

  useEffect(() => {

  }, [])

  const handleAddBrick = (e) => {
    e.preventDefault()
    setData({ ...data, nombreBricks: e.target.value, prixTotalBricks: (e.target.value * 10), properties_id: id })
  }

  const handleBuyBricks = async (e) => {
    e.preventDefault()

    setLoading(true)

    await dispatch(buyBricks(data)).then(() => {
      setLoading(false)
      setShowAction(false)
      dispatch(refreshUserInformation())
      window.location.reload()
    }).catch(() => {
      setLoading(false)
    })

  }

  return (
    <>
      {loading && <Loader />}
      <AcheterBricksContainer>
        <AcheterBricksContent>
          <div className="header">
            Acheter des bricks
            <Button onClick={() => setShowAction(false)}><span></span></Button>
          </div>
          <div className="body">
            <div className="info">
              <img src={`data:image/jpg;base64,${image}`} alt={nom} />
              <p>{nom}</p>
              <span>Argent sur votre portefeuille: {wallet.toFixed(2)}€</span>
            </div>
            <div className="briks">
              <form onSubmit={handleBuyBricks}>
                <InputContainer>
                  <div>
                    <label>Nombre de bricks</label>
                    <Input type="number" min="0" max={brickRestant} onChange={handleAddBrick} />
                  </div>
                  <div>
                    <label>Prix par bricks</label>
                    <Input type="number" placeholder="10€" readOnly />
                  </div>
                  <div>
                    <label>Prix total</label>
                    <Input type="number" placeholder={`${data.prixTotalBricks}€`} readOnly />
                  </div>
                </InputContainer>
                <input type="submit" disabled={(data.nombreBricks === 0 || data.nombreBricks === "0" || wallet < data.prixTotalBricks || data.nombreBricks > brickRestant) ? true : false} value={`Acheter ${data.nombreBricks} bricks`} />
              </form>
            </div>
            <div className="footer">
              <PourcentageInvestissementContainer>
                {pourcentageInvestissement}% financé - {brickRestant} de bricks restant
                <PourcentageInvestissement pourcentage={pourcentageInvestissement} />
              </PourcentageInvestissementContainer>
            </div>
            {
              wallet < data.prixTotalBricks && (
                <FondError>
                  <FontAwesomeIcon icon={solid('circle-exclamation')} />
                  <p>Mince, vous n’avez pas assez d’argent dans votre portefeuille.</p>
                </FondError>
              )
            }
          </div>
        </AcheterBricksContent>
      </AcheterBricksContainer>

    </>
  )
}

export default AchatBricks