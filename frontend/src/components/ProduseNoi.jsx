import React from 'react';
import styled from 'styled-components';
import HomepageProductCard from './HomepageProductCard';

const ProduseNoi = () => {
  return (
    <Container>
        <Title>Produse Noi</Title>
        <Break />
        <ProductsContainer>
            <HomepageProductCard />
            <HomepageProductCard />
            <HomepageProductCard />
            <HomepageProductCard />
            <HomepageProductCard />
        </ProductsContainer>
    </Container>
  )
}

const ProductsContainer = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 30px;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
`

const Break = styled.div`
    width: 10%;
    color: green;
    height: 6px;
    border-radius: 12px;
    background-color: lightgreen;
    margin-top: 5px;
`

const Title = styled.h1`
    font-size: 48px;
    font-weight: 500;
`

const Container = styled.div`
    position: relative;
    margin: 50px 40px;
`

export default ProduseNoi