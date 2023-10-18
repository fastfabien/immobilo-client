import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from '../../../components/Button';
import authHeader from "../../../services/auth-header";
import Loader from '../../../components/Loader';
// import BlogCard from '../../../components/BlogCard';




const Container = styled.div`

	width: 100%;
	min-height: 100vh;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  padding-top: 10rem;
  position: relative;

  @media screen and (max-width: 70em) {
    padding: ${(props) => props.theme.fontsm} ${(props) => props.theme.fontlg};
    padding-top: 10rem;
  }

`


const Message = styled.div`



  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem 5rem;
  border-radius: 10px;
  box-shadow: 1px 10px 10px rgba(${(props) => props.theme.textRgba}, 0.2);
  margin-bottom: 3rem;



`

const MessageContainer = styled.div`

  
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 50%;
  gap: 1rem;


  & h1 {
    font-size: ${props => props.theme.fontlg};
  }

`

const Content = styled.div`

  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;

  @media screen and (max-width: 70em) {
    width: 100%;
  }

`
const Recap = styled.div`


  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;
  width: 100%;

  @media screen and (max-width: 80em) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 40em) {
    flex-direction: column;
  }


`

const RecapContent = styled.div`


  width: 25%;
  padding: 1rem;
  box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 70em) {
    flex-direction: column;
    width: 45%;
    gap: 2rem;
  }

  @media screen and (max-width: 40em) {
    width: 100%;
  }

  & h2 {
    text-transform: uppercase;
    text-align: center;
    font-size: ${props => props.theme.fontxs};
    color: rgba(${(props) => props.theme.bodyRgba}, .6);
    padding: 1rem 0;
  }

  & div {
    border-top: 2px solid rgba(${(props) => props.theme.textRgba}, .6);
    padding: 1rem 0;
    text-align: center;
    text-transform: uppercase;
    font-weight: 800;
    font-size: ${props => props.theme.fontlg};
    color: rgba(${(props) => props.theme.bodyRgba}, 1);
    width: 100%;
  }



`
const Propriete = styled.div`


  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.fontxl} ${(props) => props.theme.fontlg};
  box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
  width: 100%;



`
const Left = styled.div`

  
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(red 50%, orange 70%, green 50%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-size: auto;

  &::after {
    content: '';
    display: block;
    padding: 75px;
    border-radius: 100%;
    background: #ffffff;
  }


`
const Right = styled.div`


  width: 100%;

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    text-align: left;
    padding: 8px;
  }

  tr:not(:first-child):not(:last-child) {
    border-top: 1px solid rgba(${(props) => props.theme.bodyRgba}, .5);
    border-bottom: 1px solid rgba(${(props) => props.theme.bodyRgba}, .5);
  }


`



const Dashboard = () => {
  const [message, setMessage] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, user, token } = useSelector(state => state.auth);
  const [datas, setDatas] = useState()
  const [bricksValue, setBrickValue] = useState()
  const formatedBrickPriceTotal = datas?.bricks.reduce((acc, curr) => acc + parseFloat(curr.prix_total), 0)
  const userRole = user?.roles[0].name

  const refreshUserInfo = useCallback(() => {
    return axios.get('/api/user/dashboard', { headers: authHeader() }).then(async (data) => {
      setDatas(data.data.user)
      setBrickValue(data.data.user.bricks)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  useEffect(() => {
    if (user.verification === "Non verifier") {
      setMessage({
        description: 'Notre prestataire bancaire doit valider vos documents. La validation peut prendre plusieurs jours. Tant que votre compte n’est pas validé, vous ne pourrez pas mettre d’argent sur votre portefeuille ou acheter des bricks.',
        titre: "Vous devez completer votre information pour pouvoir investir."
      })
    } else if (user.verification === "En attente") {
      setMessage({
        description: 'Notre prestataire bancaire doit valider vos documents. La validation peut prendre plusieurs jours. Tant que votre compte n’est pas validé, vous ne pourrez pas mettre d’argent sur votre portefeuille ou acheter des bricks.',
        titre: "Vos informations sont en cours d'examen"
      })
    } else if (user.verification === "Refuser") {
      setMessage({
        description: 'Dans 98 % des cas c’est parce que votre document n’était pas lisible ou conforme aux informations renseignées dans le formulaire.',
        titre: "Votre document a été refusé par le prestataire de paiement"
      })
    }
    refreshUserInfo()
  }, [refreshUserInfo])

  if (userRole === "admin") {
    return <Navigate to="/admin" />
  } else if (!isLoggedIn) {
    return <Navigate to="/login" />
  }


  return (
    <Container>
      {
        user?.verification !== "Verifier" &&
        <Message>
          <MessageContainer>
            <h1>{message.titre}</h1>
            <p>{message.description}</p>
          </MessageContainer>
          {
            user?.verification !== "En attente" && <Button userAction="user__action" href="/information" color="#fff" background="rgba(53,52,52,1)">Verifier mes information</Button>
          }
        </Message>
      }

      <Content>
        {isLoading ? <Loader /> :
          <>
            <Recap>
              <RecapContent>
                <h2>valeur de mes bricks</h2>
                <div>{datas?.bricks.reduce((acc, curr) => acc + parseFloat(curr.prix_total), 0).toFixed(2)} €</div>
              </RecapContent>
              <RecapContent>
                <h2>proprieté en portefeuille</h2>
                <div>{datas?.bricks.length}</div>
              </RecapContent>
              <RecapContent>
                <h2>révenus réçu</h2>
                <div>{datas?.user_benefits.toFixed(2)} €</div>
              </RecapContent>
              <RecapContent>
                <h2>montant total investi</h2>
                <div>{datas?.invested_money.toFixed(2)} €</div>
              </RecapContent>
            </Recap>
            <Propriete>
              <Right>
                {bricksValue?.length > 0 ? < table >
                  <tr>
                    <th>Propriété</th>
                    <th>Répartition</th>
                    <th>Valoriation</th>
                  </tr>
                  {
                    bricksValue?.map((brick) => (

                      <tr>
                        <td>{brick.propertie_id.nom}</td>
                        <td>{((parseFloat(brick.prix_total) * 100) / formatedBrickPriceTotal).toFixed(2)}%</td>
                        <td>{brick.prix_total} €</td>
                      </tr>

                    ))
                  }
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td>100%</td>
                      <td>{formatedBrickPriceTotal} €</td>
                    </tr>
                  </tfoot>
                </table> :
                  "Vous avez pas encore de propriete"
                }
              </Right>
            </Propriete>
          </>
        }
        {/* <BlogCard /> */}
      </Content>

    </Container >
  )
}

export default Dashboard