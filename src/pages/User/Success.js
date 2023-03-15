import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useSearchParams } from 'react-router-dom';
import styled from "styled-components";
import authHeader from "../../services/auth-header";


const Container = styled.div`

    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
        text-transform: uppercase;
        font-weight: bold;
    }

    h4 {
        font-weight: bold;
    }

`

function Success() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const queryParams = new URLSearchParams(location.search);

    const amount = queryParams.get('amount')
    const [updatePerformed, setUpdatePerformed] = useState(false)

    const updateUserAmount = () => {
        if (!updatePerformed && amount) {
            return axios.post('api/update-user-amount', { amount: amount }, { headers: authHeader() })
                .then((data) => {
                    if (searchParams.has('amount')) {
                        const token = searchParams.get("amount")
                        if (token) {
                            searchParams.delete('amount')
                            setSearchParams(searchParams)
                        }
                    }
                    setUpdatePerformed(true)
                })
        }
    }

    useEffect(() => {
        updateUserAmount()
    }, [])

    return (
        <Container>
            <h2>Ajout de fond reussi</h2>
            <h4>Payement effectuer</h4>
        </Container>
    );
}

export default Success;
