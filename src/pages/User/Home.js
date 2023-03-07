import React from 'react'
import Introduction from '../../sections/homepage/Introduction'
import Concept from '../../sections/homepage/Concept'
import Fonctionnement from '../../sections/homepage/Fonctionnement'
import Opportinuté from '../../sections/homepage/Opportinuté'
import FAQ from '../../sections/homepage/FAQ'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <Introduction />
            <Concept />
            <Fonctionnement />
            <Opportinuté />
            <FAQ />
        </>
    )
}

export default Home