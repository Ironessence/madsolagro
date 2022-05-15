import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomepageProductCard = (props) => {

      const {product} = props;
      

  return (
    
    <Container>
        <Banner>{product && product.reducere}</Banner>
        <Link to={product && `/${product.categorie}/${product.slug}`}>
        <Image src={product && product.imagine}/>
        </Link>
        <Title>{product && product.name}</Title>
        <Price>{product && product.pret['500g']}</Price>
        <AddToCartButton>Adaugă în coș</AddToCartButton>
    </Container>
    
  )
}

const Banner = styled.span`
    font-size: 20px;
    position: absolute;
    top: 0;
    left: 50%;
    width: 20%;
    background-color: green;
    z-index: 99;
    transform: translateX(-50%);
    padding: 5px;
    color: white;
    text-shadow: 2px 2px 2px gray;
    
`

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
    width: 20%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    
    @media only screen and (max-width: 800px) {
        width: 50%;
    }
`

export default HomepageProductCard