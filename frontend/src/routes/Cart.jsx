import React, { useContext } from 'react';
import styled from 'styled-components';
import {Store} from '../Store';
import {Link, useNavigate, Navigate} from 'react-router-dom';
import CartItemComp from '../components/CartItemComp';

const Cart = () => {
  
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
    
  };

  return (
    <Container>
      <Title>Coș de cumpărături</Title>
      {cartItems.length === 0 
      ?
      <EmptyCart>Coșul de cumpărături este gol. <Link to='/'>Mergi la magazin</Link></EmptyCart>
      :
      <CartWrapper>
        <ActualCart>
          {cartItems.map((item) => (
            <CartItemComp key={item._id} item={item} />
          ))}
        </ActualCart>
        <SummaryCart>
          <Details>
          <SummaryCartTitle>
            Detaliile coșului
          </SummaryCartTitle>
            <ProduseInCos>
              {cartItems.reduce((a, c) => a + c.quantity, 0)} produse în coș
            </ProduseInCos>
            <Subtotal>
              Subtotal: {cartItems.reduce((a, c) => a + c.pret * c.quantity, 0)} Lei
            </Subtotal>
          </Details>
          
            <GoToCheckoutButton
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            >
              Finalizează comanda
            </GoToCheckoutButton>
        </SummaryCart>
      </CartWrapper>}
    </Container>
  )


}

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const GoToCheckoutButton = styled.button`
  width: 80%;
  min-width: 200px;
  align-self: center;
  margin-bottom: 50px;
  margin-left: 30px;
  padding: 10px 0px;
  border-style: none;
  background-color: green;
  color: white;
  font-size: 20px;
  border-radius: 12px;
  transition: 0.5s ease;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
    color: black;
  }
  @media only screen and (max-width: 800px) {
    width: 50%;
    min-width: 250px;
  }
  
`

const Subtotal = styled.h2`
  text-align: end;
  border-bottom: 1px solid gray;
  width: 60%;
  align-self: flex-end;
`

const SummaryCartTitle = styled.h3`
  text-align: center;
`

const ProduseInCos = styled.h4`
  text-align: center;
`

const EmptyCart = styled.h3`
  text-align: center;
  margin-top: 50px;
`

const SummaryCart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin-top: 30px;
  padding-right: 30px;
  gap: 20px;
  background: rgba(222, 222, 222, 0.4);
  justify-content: space-between;
  
`

const ActualCart = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin: 30px;
`

const CartWrapper = styled.div`
  width: 100%;
  display: flex;
  @media only screen and (max-width: 800px) {
      flex-direction: column;
  }
`

const Title = styled.h1`
  text-align: center;
  margin-top: 50px;
`

const Container = styled.div`
  position: relative;
  padding-top: 90px;
  width: 100%;
`

export default Cart