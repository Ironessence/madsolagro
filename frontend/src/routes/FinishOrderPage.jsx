import React, {useContext, useEffect, useReducer, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styled from 'styled-components';
import { Store } from '../Store';
import Axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_REQUEST':
        return { ...state, loading: true };
      case 'CREATE_SUCCESS':
        return { ...state, loading: false };
      case 'CREATE_FAIL':
        return { ...state, loading: false };
      default:
        return state;
    }
  };



const FinishOrderPage = () => {

    const navigate = useNavigate();
    const [{loading}, dispatch] = useReducer(reducer, {
        loading: false,
        
    });
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo,
        cart,
        
    } = state;
    const {cartItems} = cart;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.pret, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 200 ? round2(0) : round2(25);

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({type: 'CREATE_REQUEST'});

            const {data} = await Axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                }
            }
            );
            ctxDispatch({type: "CART_CLEAR"});
            dispatch({type: 'CREATE_SUCCESS'});
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
       
        } catch(err) {
            dispatch({type: 'CREATE_FAIL'});
            console.log(err, err.message);
        }
    }

  return (
    <Container>
        <MainTitle>Finalizează comanda</MainTitle>
        <MainWrapper>
        <LeftWrapper>
        <ProductsContainer>
            <ProductsTitle>Produse</ProductsTitle>
        {cart.cartItems.map((item) => (
            <ProdCard key={item._id}>
                <ImgDiv>
                <ProdImg src={item.imagine} alt={item.nume}/>
                </ImgDiv>
                <ProdInfo>
                <Link to={`/product/${item.slug}`}>{item.nume}</Link>
                <Qty>Cantitate: {item.quantity}</Qty>
                <Price>Preț/buc: {item.pret} Lei</Price>
                </ProdInfo>
            </ProdCard>
        ))}
        <Link to='/cart'>Editează coș</Link>
        </ProductsContainer>
        
        <PaymentContainer>
        <PaymentTitle>Metoda de plată</PaymentTitle>
        <RambursContainer>
        <InputRamburs type='checkbox' name='Plata ramburs(la curier)' value='Ramburs' defaultChecked/>
        <LabelRamburs>Plata ramburs</LabelRamburs>
        </RambursContainer>
        
        </PaymentContainer>
        </LeftWrapper>
        
        
        <RightWrapper>
            
            <DetailsOrderDiv>
            <RightWrapperTitle>Sumar comandă</RightWrapperTitle>
            <Subtotal>
            Subtotal: {cart.itemsPrice} Lei
            </Subtotal>
            <CostLivrare>Cost livrare: {cart.shippingPrice} Lei </CostLivrare>
            <Total>Total: {cart.totalPrice} Lei</Total>
            </DetailsOrderDiv>
            


        <SubmitButton
        type='button'
        onClick={placeOrderHandler}
        
        >Finalizează comanda</SubmitButton>
        {loading && <LoadingBox>Trimitere comandă</LoadingBox>}
        </RightWrapper>
            
        </MainWrapper>
        
        
    </Container>
  )
}

const LoadingBox = styled.span`

`

const DetailsOrderDiv = styled.div`
    display: Flex;
    flex-direction: column;
    gap: 20px;
`

const Total = styled.h2`
    align-self: end;
    margin-right: 10px;
`

const CostLivrare = styled.h3`
    align-self: end;
    margin-right: 10px;
`

const Subtotal = styled.h3`
    align-self: end;
    margin-right: 10px;
`

const RightWrapperTitle = styled.h2`
    text-align: center;
    margin-bottom: 50px;
`

const ProductsTitle = styled.h1`
    align-self: start;
`

const Price = styled.h4`

`

const Qty = styled.span`

`

const ProdInfo = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    a {
        color: black;
        font-size: 1.5rem;
        @media only screen and (max-width: 800px) {
              font-size: 1rem;
              white-space: wrap;    
        }
    }
    
    
`

const ImgDiv = styled.div`
    flex: 1;
    width: 10%;
    
`

const ProdImg = styled.img`
    width: 60%;
    min-width: 100px;
    border-radius: 12px;
    object-fit: contain;
`

const ProdCard = styled.div`
    display: flex;
    width: 100%;
    padding: 5px;
    
    justify-content: space-around;
    
    border-bottom: 1px solid gray;
`

const LabelRamburs = styled.label`
    white-space: no-wrap;
    font-weight: 600;
    font-size: 20px;
`

const InputRamburs = styled.input`
    width: 50px;
`

const RambursContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    
`

const PaymentTitle = styled.h1`
    margin-bottom: 30px;
`

const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`

const ProductsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0px;
    
`

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: lightgray;
    padding: 20px 10px;
    margin-top: 50px;
    height: 500px;
    border-radius: 12px;
    justify-content: space-around;
    @media only screen and (max-width: 800px) {
        height: auto;
    }
`

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    padding: 20px 10px;
    
    @media only screen and (max-width: 800px) {
     width: 100%;
    }
    
    
    
    
`

const MainWrapper = styled.div`
    display: flex;
    
    width: 100%;
    @media only screen and (max-width: 800px) {
        flex-direction: column;
        
    }
`

const MainTitle = styled.h1`
    white-space: nowrap;
    text-align: center;
    font-size: clamp(1.5rem, 7vw, 60px);
    padding: 30px 0px;
`



const SubmitButton = styled.button`
    width: 95%;
    font-size: 18px;
    padding: 10px 0px;
    background-color: green;
    border-style: none;
    color: white;
    align-self: center;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.5s ease;
    
    &:hover {
        background-color: lightgreen;
        color: black;
    }
    @media only screen and (max-width: 600px) {
        width: 70%;
        margin-top: 50px;
        margin-bottom: 50px;

    }
`


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    @media only screen and (max-width: 800px) {
        overflow: hidden;
        width: 100%;
        
    }
    
    
    
`

export default FinishOrderPage