import React from 'react';
import styled from 'styled-components';
import metrologo from '../assets/metrologo.png';
import kauflandlogo from '../assets/kauflandlogo.png';

export default function ParteneriDeIncredere() {
  return (
    <Container>
        
        <Title>Parteneri de încredere ai</Title>
        <Break />
        <Wrapper>
        <MetroLogoImg src={metrologo}/>
        <KauflandLogoImg src={kauflandlogo}/>
        </Wrapper>
    </Container>
  )
}

const KauflandLogoImg = styled.img`
    width: 200px;
`

const MetroLogoImg = styled.img`
    object-fit: contain;
`

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 30px;
    margin-top: 50px;
`

const Break = styled.div`
    width: 10%;
    color: green;
    height: 6px;
    border-radius: 12px;
    background-color: #2a8507;
    margin-top: 5px;
    
`

const Title = styled.h1`
    font-size: clamp(2rem, 4vw, 45px);
    font-weight: 500;
`

const Container = styled.div`
    position: relative;
    padding: 50px 0px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
       
    
`
