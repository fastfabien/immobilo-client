import React from 'react'
import { Link, matchPath, useLocation } from "react-router-dom";
import styled from 'styled-components';
import AuthService from '../../services/auth.service';

const Container = styled.div`

    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

const Welcome = () => {
    // if (match.path === "/confirm/:confirmationCode") {
    //     AuthService.verifyUser(match.params.confirmationCode);
    // }
    const { pathname } = useLocation()
    const isMatch = matchPath("/confirm/:confirmationCode", pathname);
    if (isMatch) {
        AuthService.verifyUser(isMatch.params.confirmationCode);
    }

    return (
        <Container>
            <h3>Account Confirmed!</h3>
            <Link to="/login">
                Please Login
            </Link>
        </Container>
    )
}

export default Welcome