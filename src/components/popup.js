import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Container = styled.div`
  position: fixed;
  top: 5rem;
  right: 0rem;
  padding: 1rem;
  background-color: rgba(${props => props.failed ? props.theme.textRgba : props.theme.bodyRgba}, 1);
  color: ${props => props.theme.white};
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  font-weight: 800;
  transform: translateX(${props => props.showPopup ? '0' : '1000px'});
  transition: transform .5s ease-in-out;
  z-index: 99999999;
`

const Popup = ({ failed, children, timeout = 3000 }) => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(!showPopup);
        }, timeout);
        return () => clearTimeout(timer);
    }, [timeout]);



    return (
        <>
            {showPopup && <Container failed={failed} showPopup={showPopup}>
                <FontAwesomeIcon icon={failed ? solid('circle-xmark') : solid('circle-check')} />
                {children}
            </Container>}
        </>
    );
};

export default Popup;
