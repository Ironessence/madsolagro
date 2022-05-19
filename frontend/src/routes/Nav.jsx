import React from 'react';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo-white.svg';
import searchiconnav from '../assets/loupe.svg';
import usericonnav from '../assets/user.svg';
import carticonnav from '../assets/shopping-cart.svg';
import { Link, Outlet } from 'react-router-dom';
import ToateProduseleMeniu from '../components/ToateProduseleMeniu';
import UserMenuDropdown from '../components/UserMenuDropdown';
import hamburger from '../assets/hamburger.png';
import closemenu from '../assets/closemenuicon.png';
import { Store } from '../Store';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import AdminDropdown from '../components/AdminDropdown';




const Nav = () => {

    const [toateProduseleOpen, setToateProduseleOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchOpen, isSearchOpen] = useState(false);
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await axios.get(`/api/products/categories`);
                setCategories(data);
                
            } catch(err) {
                console.log(err, err.message);
            }
        };
        fetchCategories();
        
    }, []);

    

    const toateProduseleToggle = (e) => {
        setToateProduseleOpen(!toateProduseleOpen);
        e.preventDefault();
    }

    const menuOpenToggle = () => {
        setMenuOpen(!menuOpen);
        
    }

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
        
               
    }

    const toggleAdminMenu = () => {
        setAdminMenuOpen(!adminMenuOpen);
    }

    const {state} = useContext(Store);
    const {cart, userInfo} = state;

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
        categories={categories}
        />}
            
            <Link to='/contact'>Contact</Link>
        </Menu>
        <EndContainer>
            
            <SearchIconDiv onClick={() => isSearchOpen(!searchOpen)}>
            <SearchIcon src={searchiconnav}/>
            </SearchIconDiv>
            {searchOpen &&  <SearchBox />}
             
            
            
                {userInfo 
                ?
                <UserDiv>
                <UserImg 
                src={usericonnav}
                onClick={toggleUserMenu} />
                {userMenuOpen && 
                <UserMenuDropdown userInfo={userInfo} />}
                </UserDiv>
                :
                <UserDiv>
                <Link to='/signin'>
                <UserImg src={usericonnav}/>
                </Link>
                </UserDiv>
                }
                {userInfo && userInfo.isAdmin && 
                (
                    <AdminDiv>
                        <AdminSpan
                        onClick={toggleAdminMenu}
                        >A</AdminSpan>
                        {adminMenuOpen && <AdminDropdown userInfo={userInfo}/>}
                    </AdminDiv>
                    
                )}
            
            
            <CartDiv>
                <Link to='/cart'>
            <CartImg src={carticonnav}/>
                </Link>
            {cart.cartItems.length > 0 && 
            (<CartBadge>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </CartBadge>)}
            
            </CartDiv>
            
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

const AdminSpan = styled.span`
    font-size: 32px;
    font-weight: 400;
    color: white;
    cursor: pointer;
`

const AdminDiv = styled.div`
    display: flex;
    position: relative;
`

const SearchIconDiv = styled.div`
    display: flex;
    position: relative;
`

const SearchIcon = styled.img`
    width: 25px;
    cursor: pointer;
`

const UserDiv = styled.div`
    display: flex;
    position: relative;
`

const CartBadge = styled.span`
    position: absolute;
    bottom: -10px;
    right: -10px;
    background-color: green;
    color: white;
    width: 20px;
    text-align: center;
    border-radius: 50%;
`

const CartDiv = styled.div`
    display: flex;
    position: relative;
`

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


const CartImg = styled.img`
    width: 25px;
    cursor: pointer;
`

const UserImg = styled.img`
    width: 25px;
    cursor: pointer;
`



const LogoImg = styled.img`
    width: 200px;
    margin-left: 40px;
    margin-top: 10px;
    @media only screen and (max-width: 800px) {
        width: 170px;
        margin-top: 10px;
    }
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
    @media only screen and (max-width: 800px) {
        
    }
`

const Container = styled.div`
    width: 100%;
    height: 90px;
 // background: rgb(27,27,27);
 // background: linear-gradient(180deg, rgba(27,27,27,0.23891625615763545) 0%, rgba(122,122,122,0.20935960591133007) 50%, rgba(255,255,255,0) 100%);
    background-color: rgba(108, 138, 99, 0.4);
    box-shadow: 1px 2px 4px 3px rgba(38, 38, 38, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 99;
    
    

`

export default Nav