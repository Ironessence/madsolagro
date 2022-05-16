import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';

const HomepageProductCard = (props) => {

      const {product} = props;

      const {state, dispatch: ctxDispatch} = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

      const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${item._id}`);
        if (data.inStoc < quantity) {
            window.alert('Ne pare rau. Produsul nu mai este in stoc');
            return;
        }

        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity }})
    }
      

  return (
    
    <Container>
        <Banner>{product && product.reducere}</Banner>
        <Link to={product && `/${product.categorie}/${product.slug}`}>
        <Image src={product && product.imagine}/>
        </Link>
        <Title>{product && product.name}</Title>
        <Price>{product && product.pret['500g']}</Price>
        {product.inStoc === 0 
        ? <NoStocButton disabled>Stoc epuizat</NoStocButton>
        : <AddToCartButton
        onClick={() => addToCartHandler(product)}
        >Adaugă în coș</AddToCartButton>
    }
        
    </Container>
    
  )
}

const NoStocButton = styled.button`
    width: 100%;
    color: white;
    background-color: gray;
    padding: 6px 0px;
    border-style: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 35px;
    transition: 0.5s ease;
`

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