import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const UserMenuDropdown = ({userInfo}) => {

    const {name, email} = userInfo;
    const {state, dispatch: ctxDispatch} = useContext(Store);

    const signoutHandler = () => {
        ctxDispatch({type: "USER_SIGNOUT"});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
    }

  return (
    <Container
    initial={{y: -200, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.6, type: 'spring'}}
    >
        <GreetingTitle>{name}</GreetingTitle>
        <Link to='/profile'>Profil</Link>
        <Link to='/orderhistory'>Istoric comenzi</Link>
        <Link to='#signout' onClick={signoutHandler}>Ieși din cont</Link>
    </Container>
  )
}

const SignOutButton = styled.button`
    font-size: 18px;
    padding: 5px;
    border-radius: 12px;
    border-style: none;
    background-color: transparent;
    color: white;
    border: 1px solid gray;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
        background-color: green;
    }
`

const GreetingTitle = styled.h2`
    text-align-center;
    font-size: 25px;
    color: white;
`

const Container = styled(motion.div)`
    width: 250px;
    height: 200px;
    background-color: rgba(38, 38, 38, 1);
    position: absolute;
    top: 70px;
    right: -5vw;
    z-index: 99;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px 20px;
    border-radius: 12px;
    align-items: center;
    justify-content: space-evenly;
    a {
        text-decoration: none;
        color: white;
        border-bottom: 1px solid gray;
    }
`

export default UserMenuDropdown