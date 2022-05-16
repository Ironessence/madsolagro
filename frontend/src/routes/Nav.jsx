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
import closemenu from '../assets/closemenuicon.png';


const Nav = () => {

    const [toateProduseleOpen, setToateProduseleOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toateProduseleToggle = (e) => {
        setToateProduseleOpen(!toateProduseleOpen);
        console.log(toateProduseleOpen);
        e.preventDefault();
    }

    const menuOpenToggle = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    }

  return (
      <>
    <Container>
        <LogoContainer>
            <Link to='/'>
            <LogoImg src={logo}/>
            </Link>
            
        </LogoContainer>
        <Menu menuOpen={menuOpen}>
            <Link to='/'>Acasă</Link>
            <Link to='/' onClick={toateProduseleToggle}>Toate Produsele</Link>
            {toateProduseleOpen && <ToateProduseleMeniu 
        toateProduseleOpen={toateProduseleOpen}
        setToateProduseleOpen={setToateProduseleOpen}
        />}
            <Link to='/'>Promoții</Link>
            <Link to='/'>Contact</Link>
        </Menu>
        <EndContainer>
            <SearchImg src={search} />
            <UserImg src={user}/>
            <CartImg src={cart}/>
            <TotalCartValue>124 Lei</TotalCartValue>
            <HamburgerDiv
            onClick={menuOpenToggle}>
            <HamburgerImg 
            src={!menuOpen ? hamburger : closemenu}/>
            </HamburgerDiv>
        </EndContainer>
        
    </Container>
    <Outlet />
    </>

  )
}

const HamburgerDiv = styled.div`
    display: flex;
`

const HamburgerImg = styled.img`
    display: none;
    width: 30px;
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
        font-size: 20px;
        font-weight: 400;
        
    }
    @media only screen and (max-width: 800px) {
        position: absolute;
        display: ${props => props.menuOpen ? 'flex' : 'none'};
        flex-direction: column;
        gap: 20px;
        width: 500px;
        background-color: rgba(38, 38, 38, 1);
        
        top: 90px;
        padding: 30px 0px;
        border-radius: 12px;
        width: 100%;
        
    }
    
    
`

const LogoContainer = styled.div`
    flex: 1;
`

const Container = styled.div`
    width: 100%;
    height: 90px;
    background: rgb(27,27,27);
background: linear-gradient(180deg, rgba(27,27,27,0.23891625615763545) 0%, rgba(122,122,122,0.20935960591133007) 50%, rgba(255,255,255,0) 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 99;
    
    

`

export default Nav