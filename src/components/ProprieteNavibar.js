import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`

    display: flex;
    justify-content: ${props => props.alignment};
    align-items: center;
    gap: 1rem;

    & a {
        color: rgba(${props => props.theme.bodyRgba}, .5);
        font-weight: 800;
        text-align: center;
        padding: 1em 2em;
        &.active {
            color: rgba(${props => props.theme.textRgba}, 1);
            background-color: rgba(${props => props.theme.bodyRgba}, 0.05);
        }
    }

`

const ProprieteNavibar = ({ content, alignment }) => {

    const navRef = useRef()
    const Location = useLocation()

    useEffect(() => {
        const nav = navRef.current.children;
        for(let i = 0; i < nav.length; i++) {
            if (nav[i].pathname === Location.pathname) {
                nav[i].classList.add('active')
            } else {
                nav[i].classList.remove('active')
            }
        }
    }, [])

    return (
        <Container alignment={alignment} ref={navRef} >
            {
                content && content.map((val) => (
                    <Link to={val.lien} key={val.lien}>{val.text}</Link>
                ))
            }
        </Container>
    )
}

export default ProprieteNavibar