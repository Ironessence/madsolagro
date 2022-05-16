import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import HomepageProductCard from './HomepageProductCard';
import { motion } from 'framer-motion';

const ProduseNoi = (props) => {

    const {products} = props;
    

  return (
    <Container
    initial={{y: -100, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 1.2, type: 'spring'}}
    >
        <Title>Produse Noi</Title>
        <Break />
        <ProductsContainer>
            {products.map((product) => (<HomepageProductCard key={product.slug} product={product} />))}
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

const Container = styled(motion.div)`
    position: relative;
    margin: 50px 40px;
`

export default ProduseNoi