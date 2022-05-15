import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo-white.svg';
import search from '../assets/loupe.svg';
import user from '../assets/user.svg';
import cart from '../assets/shopping-cart.svg';
import { Link, Outlet } from 'react-router-dom';
import ToateProduseleMeniu from '../components/ToateProduseleMeniu';
import hamburger from '../assets/hamburger.png';


const Nav = () => {

    const [toateProduseleOpen, setToateProduseleOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toateProduseleToggle = () => {
        setToateProduseleOpen(!toateProduseleOpen);
        console.log(toateProduseleOpen);
    }

    const menuOpenToggle = () => {
        setMenuOpen(!menuOpen);
    }

  return (
      <>
    <Container>
        <LogoContainer>
            <Link to='/'>
            <LogoImg src={logo}/>
            </Link>
            
        </LogoContainer>
        <Menu>
            <Link to='/'>Acasă</Link>
            <Link to='/' onClick={toateProduseleToggle}>Toate Produsele</Link>
            <Link to='/'>Promoții</Link>
            <Link to='/'>Contact</Link>
        </Menu>
        <EndContainer>
            <SearchImg src={search} />
            <UserImg src={user}/>
            <CartImg src={cart}/>
            <TotalCartValue>124 Lei</TotalCartValue>
            <HamburgerImg 
            
            src={hamburger}/>
        </EndContainer>
        {toateProduseleOpen && <ToateProduseleMeniu 
        toateProduseleOpen={toateProduseleOpen}
        setToateProduseleOpen={setToateProduseleOpen}
        />}
    </Container>
    <Outlet />
    </>

  )
}

const HamburgerImg = styled.img`
    display: none;
    width: 40px;
    cursor: pointer;
    @media only screen and (max-width: 800px) {
        display: initial;
    }
`

const TotalCartValue = styled.p`
    color: white;
    @media only screen and (max-width: 800px) {
        display: none;
    }
    
`

const CartImg = styled.img`
    width: 25px;
    cursor: pointer;
`

const UserImg = styled.img`
    width: 25px;
    cursor: pointer;
`

const SearchImg = styled.img`
    width: 25px;
    cursor: pointer;
`

const LogoImg = styled.img`
    width: 200px;
    
    margin-left: 40px;
`

const EndContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-right: 10px;
`

const Menu = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    
    justify-content: space-evenly;
    a {
        text-decoration: none;
        color: white;
        
    }
    @media only screen and (max-width: 800px) {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 200px;
        background-color: rgba(38, 38, 38, 1);
        right: 10px;
        top: 90px;
        padding: 30px 0px;
    }
    
    
`

const LogoContainer = styled.div`
    flex: 1;
`

const Container = styled.div`
    width: 100%;
    height: 90px;
    background-color: transparent;
    display: flex;
    align-items: center;
    jsutify-content: space-between;
    position: absolute;
    z-index: 99;
    

`

export default Nav