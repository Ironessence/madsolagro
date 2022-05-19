import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const AdminDropdown = ({userInfo}) => {

    const {name, isAdmin} = userInfo;
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
        <GreetingTitle>ADMIN</GreetingTitle>
        <Link to='/admin/dashboard'>Dashboard</Link>
        <Link to='/admin/products'>Listă Produse</Link>
        <Link to='/admin/orders'>Listă Comenzi</Link>
        <Link to='/admin/users'>Listă Useri</Link>
        
        
    </Container>
  )
}

const GreetingTitle = styled.h2`
    text-align-center;
    font-size: 25px;
    color: white;
`

const Container = styled(motion.div)`
    width: 250px;
    gap: 20px;
    
    background-color: rgba(38, 38, 38, 1);
    position: absolute;
    top: 70px;
    right: -5vw;
    z-index: 99;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px 20px;
    border-radius: 12px;
    align-items: center;
    justify-content: space-evenly;
    a {
        text-decoration: none;
        color: white;
        border-bottom: 1px solid gray;
    }
`

export default AdminDropdown