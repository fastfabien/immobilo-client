import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Btn = styled.button`

    position: relative;
    color: ${props => props.color};
    background-color: ${props => props.background};
    outline: none;
    border: none;
    padding: ${props => props.theme.fontsm} ${props => props.theme.fontmd};
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.theme.fontmd};
    font-weight: 800;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    opacity: .9;

    &:hover {
        opacity: .8;
    }

`

const CustomButton = ({ color, background, fontFamily, children, onclick, userAction }) => {
    return (
        <Btn className={userAction} color={color} background={background} fontFamily={fontFamily} onClick={() => onclick}>{children}</Btn>
    )
}

export default CustomButton