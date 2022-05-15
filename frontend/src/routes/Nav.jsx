import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo-white.svg';
import search from '../assets/loupe.svg';
import user from '../assets/user.svg';
import cart from '../assets/shopping-cart.svg';
import { Link, Outlet } from 'react-router-dom';


const Nav = () => {
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
            <Link to='/'>Toate Produsele</Link>
            <Link to='/'>Promoții</Link>
            <Link to='/'>Contact</Link>
        </Menu>
        <EndContainer>
            <SearchImg src={search} />
            <UserImg src={user}/>
            <CartImg src={cart}/>
            <TotalCartValue>124 Lei</TotalCartValue>
        </EndContainer>
    </Container>
    <Outlet />
    </>

  )
}

const TotalCartValue = styled.p`
    color: white;
    
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