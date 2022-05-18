import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { Store } from '../Store';
import Axios from 'axios';

function reducer(state, action) {
    switch(action.type) {
      case 'FETCH_REQUEST':
        return {...state, loading: true, error: ''};
      case 'FETCH_SUCCESS':
        return {...state, loading: false, order: action.payload, error: ''};
      case 'FETCH_FAIL':
        return {...state, loading: false, error: action.payload};
      default:
        return state;
    }
}

const OrderTestPage = () => {

  const navigate = useNavigate();

  const {state} = useContext(Store);
  const {userInfo} = state;
  const params = useParams();
  const {id: orderId} = params;

  const [{loading, error, order}, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({type: 'FETCH_REQUEST'});
        const {data} = await Axios.get(`/api/orders/${orderId}`, {
          headers: {authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: 'FETCH_SUCCESS', payload: data});
      } catch (err) {
        dispatch({type: 'FETCH_FAIL', payload: err});
      }
    };

    if(!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
    }
  },[order, userInfo, orderId, navigate])

  return (
    loading ? (<LoadingBox>Se incarca...</LoadingBox>)
    : error ? (<ErrorBox>{error}</ErrorBox>)
    :
    <Container>
        <Title>Comanda a fost plasată cu succes! Mulțumim!</Title>
        <Title2>ID Comandă: {orderId}</Title2>
        <MainWrapper>
        <LeftWrapper>
        <AddressWrapper>
        <AddressTitle>Adresa de livrare:</AddressTitle>
        <AddressText>Nume: {order.shippingAddress.fullName}
        <br />
        Adresa: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.phoneNumber}
        </AddressText>
        </AddressWrapper>
        <PaymentWrapper>
        
        <PaymentText>Metoda de plată: RAMBURS</PaymentText>
        </PaymentWrapper>
        <ItemsWrapper>
          <ItemsText>Produse:</ItemsText>
        {order.orderItems.map((item) => (
          <ItemCard>
            <ItemImgContainer>
            <ItemImg src={item.imagine}/>
            </ItemImgContainer>
            <ItemDetailsContainer>
            <Link to={`/product/${item.slug}`}>{item.nume}</Link>
            <Qty>Cantitate: {item.quantity}</Qty>
            <Price>Preț/buc: {item.pret} Lei</Price>
            </ItemDetailsContainer>
            
          </ItemCard>
        ))}
        </ItemsWrapper>
        </LeftWrapper>
        <RightWrapper>
          <RightTitle>Sumar comandă:</RightTitle>
          <ProduseText>Valoare produse: {order.itemsPrice.toFixed(2)} Lei</ProduseText>
          <ShippingText>Cost livrare: {order.shippingPrice.toFixed(2)} Lei</ShippingText>
          <TotalCostText>Total: {order.totalPrice.toFixed(2)} Lei</TotalCostText>
        </RightWrapper>
        </MainWrapper>
        <BackButton
        onClick={() => navigate('/')}
        >Înapoi la site</BackButton>
        
    </Container>
  )
}

const BackButton = styled.button`
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
    width: 200px;
    padding: 10px 0px;
    background-color: green;
    border-radius: 12px;
    border-style: none;
    cursor: pointer;
    transition: 0.5s ease;
    font-size: 1rem;
    color: white;
    &:hover {
      color: black;
      background-color: lightgreen;
    }
`

const TotalCostText = styled.h3`
  font-size: clamp(0.65rem, 4vw, 35px);
  text-align: end;
`

const ShippingText = styled.h4`
  font-size: clamp(0.5rem, 3vw, 25px);
  text-align: end;
`

const ProduseText = styled.h4`
   font-size: clamp(0.5rem, 3vw, 25px);
   text-align: end;
`

const RightTitle = styled.h3`
  text-align: center;
  font-size: clamp(0.5rem, 4vw, 30px);
  margin-bottom: 30px;
`

const ItemsText = styled.h3`
  text-align: center;
  font-size: clamp(0.5rem, 4vw, 30px);
  margin-bottom: 30px;
`

const ItemDetailsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 4;
  a {
    color: black;
    flex: 2;
    @media only screen and (max-width: 800px) {
      flex: 1;
      margin-left: 3%;
    }
  }
`

const Price = styled.h4`
  flex: 1;
  @media only screen and (max-width: 800px) {
      flex: 0.7;
  }
`

const Qty = styled.span`
  flex: 1;
  @media only screen and (max-width: 800px) {
      flex: 0.7;
  }
`

const ItemImg = styled.img`
  width: 20%;
  border-radius: 12px;
  min-width: 80px;
`

const ItemImgContainer = styled.div`
  flex: 1;
  
  
  
`

const ItemCard = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid gray;
  padding: 5px 0px;
`

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1px solid gray;
  gap: 20px;
  padding: 10px 0px;
`

const PaymentText = styled.h3`
  text-align: center;
  font-size: clamp(0.5rem, 4vw, 30px);
  margin-bottom: 30px;
  
`

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
  padding: 10px 0px;
`

const AddressText = styled.h4`
  font-size: clamp(0.4rem, 3vw, 25px);
  font-weight: 400;
`

const AddressTitle = styled.h3`
  text-align: center;
  font-size: clamp(0.5rem, 4vw, 30px);
  margin-bottom: 30px;
`

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
  padding: 10px 0px;
`

const RightWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 50vh;
    padding: 20px;
    background-color: rgb(158, 158, 158);
    justify-content: space-evenly;
    
`

const LeftWrapper = styled.div`
    flex: 3;
    
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: lightgray;
`

const MainWrapper = styled.div`
    width: 90%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }
`

const ErrorBox = styled.div`

`

const LoadingBox = styled.div`

`

const Title2 = styled.h2`
  text-align: center;
  margin-top: 50px;
  font-size: clamp(0.7rem, 4vw, 40px);
  
  
`

const Title = styled.h1`
    text-align: center;
    font-size: clamp(1rem, 6vw, 50px);
    
    
    
`

const Container = styled.div`
    width: 100%;
    
    padding: 50px 0px;
    
`

export default OrderTestPage