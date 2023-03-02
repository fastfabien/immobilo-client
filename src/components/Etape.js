import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

    position: relative;
    margin-top: ${(props) => props.theme.fontlg};

`
const NumeroContainer = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;

`

const Numero = styled.span`

    padding: ${props => props.theme.fontsm} ${props => props.theme.fontlg};
    border-radius: 5px;
    outline: none;
    background-color: rgba(${props => props.theme.bodyRgba}, .3);
    font-size: ${props => props.theme.fontmd};
    position: relative;
    display: block;


`

const Title = styled.h3`

    font-size: ${(props) => props.theme.fontlg};
    font-weight: 400;
    margin-bottom: ${(props) => props.theme.fontsm};
    margin-top: ${(props) => props.theme.fontlg};

`

const Etape = ({ numero, title, children }) => {
    return (
        <Container>
            <NumeroContainer>
                <Numero>{numero}</Numero>
                <div></div>
            </NumeroContainer>
            <Title>{title}</Title>
            <p>{children}</p>
        </Container>
    )
}

export default Etape