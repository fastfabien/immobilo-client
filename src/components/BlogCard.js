import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import img from '../assets/win.jpg'

const Container = styled(Link)`

    width: 40%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 10px;
    box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
    padding: 1rem 2rem;
    gap: 1rem;

`

const Header = styled.img`


    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-radius: 10px;

`

const Category = styled(Link)`

    padding: .5rem 1rem;
    border: 1px solid rgba(${props => props.theme.bodyRgba}, .8);
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;

    & span:first-child {
        display: block;
        background-color: ${props => props.color};
        border-radius: 50%;
        width: 10px;
        height: 10px;
    }


`

const Title = styled.h2`


    font-weight: 800;
    font-size: ${props => props.theme.fontlg};
    line-height: 1.8;


`

const Public = styled.p`

    display: flex;
    justify-content: start;
    gap: .5rem;
    font-size: ${props => props.theme.fontxs};

    & span:first-child {
        color: ${props => props.color};
        font-weight: 800;
    }

`

const Teaser = styled.p`


    font-size: ${props => props.theme.fontmd};
    line-height: 1.5;


`

const Information = styled.div`


    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & span:first-child {
        text-transform: uppercase;
        font-size: ${props => props.theme.fontmd};
        font-weight: 800;
    }

    & span:last-child {
        display: block;
        padding: 1rem;
        line-height: 0;
        border: 2px solid rgba(${props => props.theme.bodyRgba}, .5);
        border-radius: 50%;
        font-weight: 800;
        color: rgba(${props => props.theme.bodyRgba}, .8);
        font-size: ${props => props.theme.fontlg};
    }



`

const BlogCard = () => {
    return (
        <Container to={`blogs/${1}`} >
            <Header src={img} alt='Header Image' />
            <Category color="orange" to={`blogs/category/${1}`}>
                <span></span>
                Tout comprendre sur Bricks.co
            </Category>
            <Title>Comment valider son profil investisseur sur Bricks.co</Title>
            <Public color="green">
                <span>Public</span> <span>-</span> <span>3 min de lecture</span>
            </Public>
            <Teaser>
                Découvrez comment valider votre profil d'investisseur sur Bricks.co en remplissant le test d'adéquation et investissez en toute connaissance sur…
            </Teaser>
            <Information>
                <span>10 mars 2023</span>
                <span>F</span>
            </Information>
        </Container>
    )
}

export default BlogCard