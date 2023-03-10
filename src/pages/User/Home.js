import React from 'react'
import Introduction from '../../sections/homepage/Introduction'
import Concept from '../../sections/homepage/Concept'
import Fonctionnement from '../../sections/homepage/Fonctionnement'
import OpportinutÃ© from '../../sections/homepage/OpportinutÃ©'
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
            <OpportinutÃ© />
            <FAQ />
        </>
    )
}

export default Home