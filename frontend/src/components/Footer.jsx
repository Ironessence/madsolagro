import React from 'react';
import styled from 'styled-components';
import tiktok from '../assets/tik-tok.svg';
import fb from '../assets/facebook.svg';
import insta from '../assets/instagram.svg';
import logo from '../assets/logo.svg';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
        <ContactDiv>
            <Contact>03374 991 903</Contact>
            <Contact>0720 004 905</Contact>
            <Contact>MADSOLAGRO@GMAIL.COM</Contact>
            <Contact>CONTACT@MADSOLAGRO.RO</Contact>
        </ContactDiv>
        <LogoAndSocials>
            <SocialsDiv>
                <SocialImg src={tiktok}/>
                <SocialImg src={fb}/>
                <SocialImg src={insta}/>
            </SocialsDiv>
            <Logo src={logo}/>
        </LogoAndSocials>
        <UsefulLinks>
            <Link to='/'>Termeni și Condiții</Link>
            <Link to='/'>Politică de confidențialitate</Link>
            <Link to='/'>©MadSol 2022. All rights reserved.</Link>
        </UsefulLinks>
    </Container>
  )
}

const Logo = styled.img`
    width: 400px;
`

const SocialImg = styled.img`
    width: 40px;
    cursor: pointer;
    
`

const SocialsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;
    align-self: center;
`

const Contact = styled.h4`
    color: lightgray;
    cursor: pointer;
    transition: 0.4s ease;
    &:hover {
        color: white;
    }
`

const UsefulLinks = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    gap: 10px;
    a {
        text-decoration: none;
        color: lightgray;
        &:hover {
            color: white;
        }
    }
`

const LogoAndSocials = styled.div`
    display: flex;
    flex-direction: column;
`

const ContactDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    gap: 10px;
`

const Container = styled.div`
    width: 100%;
    position: relative;
    height: 35vh;
    background-color: #40403e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`

export default Footer