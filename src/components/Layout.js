import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Button from './Button'
import AddFund from './AddFund'
import MyLogo from "../assets/logo.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import { logout, refreshUserInformation } from "../actions/auth";
import { clearMessage } from "../actions/message";

const NavBar = styled.nav`


    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    padding: ${props => props.theme.fontlg} ${props => props.theme.fontxxl};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    z-index: 5;

    @media screen and (max-width: 70em) {
        padding: ${props => props.theme.fontsm} ${props => props.theme.fontlg};
    }

`

const Logo = styled(Link)`

    text-transform: uppercase;
    font-weight: 800;
    font-size: ${props => props.theme.fontlg};
    color: rgba(${props => props.theme.textRgba}, 1);
    width: 30%;

    @media screen and (max-width: 70em) {
        font-size: ${props => props.theme.fontmd};
        width: 40%;

    }


`
const Right = styled.div`

    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & a:first-child {
        font-weight: 800;
        &:hover {
            opacity: .8;
        }
    }

    .showNav {
        display: none;
        &:checked {
            & + label {
                & p {
                    & span {
                        opacity: 0;
                        transition: opacity .5s ease-in;
                    }
                    &::before, &::after {
                        top: 0;
                        transition: transform .5s ease-in;
                    }
                    &::before {
                        transform: rotate(-45deg);
                    }
                    &::after {
                        transform: rotate(45deg);
                    }
                }
                & + div {
                    transform: translateX(0);
                    transition: transform 1s ease;
                }
            }
        }
    }
    
    @media screen and (max-width: 70em) {
        justify-content: end;
        & .user__action {
            display: none;
        }
    }
    @media screen and (min-width: 70em) {
        & .user__action {
            display: block;
        }
    }

`

const HamburgerContainer = styled.label`

    position: relative;
    width: 40%;
    cursor: pointer;
    display: block;
    & p {
        & span {
            background-color: rgba(${props => props.theme.textRgba}, 1);
            width: 50px;
            height: 6px;
            display: block;
            border-radius: 10px;
            position: relative;
            opacity: 1;
        }
        &::before, &::after {
            content: "";
            position: absolute;
            display: block;
            background-color: rgba(${props => props.theme.textRgba}, 1);
            width: 50px;
            height: 6px;
            border-radius: 10px;
            transition: transform .5s ease;
        }
        &::before {
            top: -.8rem;
            opacity: 1;
        }
        &::after {
            top: .8rem;
            opacity: 1;
        }
    }

    @media screen and (min-width: 70em) {
        display: none;
    }    

`

const Navigation = styled.div`

    position: fixed;
    top: 0;
    right: 0;
    min-width: 50%;
    height: 13rem;
    background-color: ${props => props.theme.white};
    z-index: -2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    text-transform: uppercase;
    font-weight: 800;
    padding-top: 2rem;
    transform: translateX(1000px);
    transition: transform 1s ease;


    & > * {
        position: relative;
        &::before {
            content: "";
            width: 0;
            height: 3px;
            display: block;
            background-color: rgba(${props => props.theme.textRgba}, 1);
            position: absolute;
            bottom: -2px;
            transition: width .5s ease;
        }
        &:hover {
            &::before {
                width: 100%;
                transition: width .5s ease;
            }
        }
    }
    

`


const UserNavigation = styled.div`


    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2em;

    & a {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: .5em;
        &.link {
            color:rgba(${(props) => props.theme.bodyRgba}, .7);
            &.link-active {
                color:rgba(${(props) => props.theme.bodyRgba}, 1);
            }
        }

        & .svg-inline--fa {
            height: 1.5em;
        }
    }


`

const UserInfo = styled.div`


    width: 30%;
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    & div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        a {
            display: block;
            color:rgba(${(props) => props.theme.bodyRgba}, 1);
        }
    }

    & a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0;
        gap: .5rem;
        color:rgba(${(props) => props.theme.textRgba}, 1);
        & .svg-inline--fa {
            height: 1.8em;
        }
    }


`

const Wallet = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0;
    gap: .5rem;
    font-weight: 800;
    color:rgba(${(props) => props.theme.textRgba}, 1);
    cursor: pointer;
    & .svg-inline--fa {
        height: 1.8em;
    }



`



function Header() {
    const { user: currentUser, isLoggedIn, wallet } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false)
    const [showAddFund, setShowAddFund] = useState(false)

    let location = useLocation();
    const navRef = useRef()

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage());
        }
        if (navRef.current) {
            const nav = navRef.current.children;
            for(let i = 0; i < nav.length; i++) {
                if (nav[i].pathname === location.pathname) {
                    nav[i].classList.add('link-active')
                } else {
                    nav[i].classList.remove('link-active')
                }
            }
        }
        dispatch(refreshUserInformation())

    }, [dispatch, location])

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <NavBar>
            <Logo to="/">
                <img src={MyLogo} alt="logo" />
            </Logo>
            {
                showAddFund && <AddFund setShowAddFund={setShowAddFund} />
            }
            {
                currentUser && (<>

                    <UserNavigation ref={navRef}>
                        <Link className="link" to="/"><FontAwesomeIcon icon={solid('house')} /><span>Accueil</span></Link>
                        <Link className="link" to="/proprietes"><FontAwesomeIcon icon={solid('building')} /><span>Propriete</span></Link>
                        <Link className="link" to="/market"><FontAwesomeIcon icon={solid('coins')} /><span>Marketplace</span></Link>
                        <Link className="link" to="/me"><FontAwesomeIcon icon={solid('user')} /><span>Mon compte</span></Link>
                    </UserNavigation>

                </>)
            }
            <Right>
                {
                    currentUser
                        ?   (<>
                                <UserInfo>
                                    <Wallet onClick={() => setShowAddFund(true)} ><span>{wallet}€</span><FontAwesomeIcon icon={solid('wallet')} /></Wallet>
                                    <div><Link className="link" to="/"><FontAwesomeIcon icon={solid('circle-info')} /></Link></div>
                                    <div><Link className="link" onClick={logOut} to="/"><FontAwesomeIcon icon={solid('right-from-bracket')} /></Link></div>
                                </UserInfo>
                            </>)
                        : (<>
                            <Link className='user__action' to="signup">Créer compte</Link><Button userAction="user__action" href="login" color="#fff" background="rgba(53,52,52,1)">Se connecter</Button>
                            <input type="checkbox" id="show" name='show' className='showNav' />
                            <HamburgerContainer for="show">
                                <p isShow={isShow}>
                                    <span isShow={isShow}></span>
                                </p>
                            </HamburgerContainer>
                            <Navigation>
                                {
                                    currentUser
                                        ? (<>
                                            <Link to="profil">Mon compte</Link>
                                            <p onClick={logOut}>Se Deconnecter</p>
                                        </>)
                                        : (<>
                                            <Link to="signup">Créer compte</Link>
                                            <Link to="login">Se connecter</Link>
                                        </>)
                                }
                            </Navigation>
                        </>)
                }
            </Right>
        </NavBar>
    )
}

export default Header