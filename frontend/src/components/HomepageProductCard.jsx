import React from 'react';
import styled from 'styled-components';
import productimg from '../assets/product_placeholder.jpg'

const HomepageProductCard = () => {
  return (
    <Container>
        <Image src={productimg}/>
        <Title>Lucernă</Title>
        <Price>25.00 Lei</Price>
        <AddToCartButton>Adaugă în coș</AddToCartButton>
    </Container>
  )
}

const AddToCartButton = styled.button`
    width: 100%;
    color: white;
    cursor: pointer;
    background-color: green;
    padding: 6px 0px;
    border-style: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 35px;
    transition: 0.5s ease;
    &:hover {
        transform: scale(1.1);
    }
`

const Price = styled.span`

`

const Title = styled.h4`

`

const Image = styled.img`
    width: 10vw;
    min-width: 150px;
    border-radius: 0px 35px 35px 35px;
    transition: 0.6s ease;
    border: 2px solid green;
    &:hover {
        transform: scale(1.05);
        border-radius: 0px 35px 0px 35px;
        
    }
`

const Container = styled.div`
    width: 17%;
    
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`

export default HomepageProductCard