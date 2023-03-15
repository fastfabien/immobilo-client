import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"
import styled from 'styled-components';
import Loader from './Loader';


const Container = styled.div`


    width: 80%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    gap: 1rem;

`

const Content = styled.div`

    display: flex;
    justify-center: space-between;
    width: 100%;
    gap: 5rem;
    padding: 3rem 3rem;

    div {
        display: flex;
        justify-content: start;
        flex-direction: column;
        width: 50%;
        margin: 0 auto;
        gap: 1rem;

        h2 {
            text-align: center;
            text-transform: uppercase;
            font-weight: 800;
        }
    }


`

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontxxl};
  font-family: "Changa";
  text-transform: uppercase;
  font-weight: 800;
  color: rgba(${(props) => props.theme.bodyRgba}, 1);
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
  }
`;


const Input = styled.input`

    padding: .5rem 1rem;
    outline: none; 
    background-color: none;

`

const Button = styled.button`

    border: none;
    background-color: blue;
    color: white;
    text-align: center;
    font-weight: 800;
    padding: 1rem 2rem;
    cursor: pointer;

`


const StripePayment = () => {


    const [loading, setLoading] = useState(false)

    const [product, setProduct] = useState({
        name: "Go FullStack with KnowledgeHut",
        price: 0,
        productOwner: "KnowledgeHut",
        description: "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
        quantity: 1,
    })

    const makePayment = async () => {
        setLoading(true)
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
        const body = { product };
        const response = await axios.post('/api/create-checkout-session', body)


        const session = await response.data;

        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
        }
    };

    return (
        <Container>
            {
                !loading ?
                    <Content>
                        <div>
                            <Title>Ajouter des fond</Title>
                            <Input type="number" min="0" required value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                            {product.price > 0 && <Button onClick={makePayment}>Ajouter {product.price}€ dans votre compte</Button>}
                        </div>
                        {/* <div>
                    <h2>Retrait de fond</h2>
                    <Input type="number" min="0" required />
                    <Button>Buy now for {product.price}</Button>
                </div> */}
                    </Content>
                    : <Loader />
            }
        </Container>
    )
}

export default StripePayment