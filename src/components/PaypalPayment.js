import React, { useState } from 'react'
import styled from 'styled-components'
import PayPalBtn from './PayPalBtn'

const Container = styled.div`
    
    width: 80%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    gap: 1rem;
    padding-top: 8rem;

`


const InputContainer = styled.div`


  width: 60%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  margin: 0 auto;
  margin-bottom: 2rem;

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


  padding: .5rem .75rem;
  border: none;
  border: 2px solid rgba(${props => props.theme.bodyRgba}, .2);
  border-radius: 2px;
  outline: 2px solid transparent;
  font-size: ${props => props.theme.fontmd};

  width: 100%;

  & + div {
    width: 100%;
    z-index: 1;
    & #buttons-container {
      width: 100%!important;
    }
  }

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

const PaypalPayment = () => {

  const [price, setPrice] = useState()

  return (
    <Container>
      <InputContainer>
        <Title>Ajout fond</Title>
        <Input type="number" required onChange={(e) => setPrice(e.target.value)} value={price} />
        {
          price > 0 && <PayPalBtn price={price} />
        }
      </InputContainer>
    </Container>
  )
}

export default PaypalPayment