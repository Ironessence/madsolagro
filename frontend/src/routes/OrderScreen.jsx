import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import {Store} from '../Store';
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';


function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''};
        case 'FETCH_SUCCESS':
            return {...state, loading: false, order: action.payload, error: ''};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const OrderScreen = () => {

    const {state} = useContext(Store);
    const {userInfo} = state;
    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {

        const fetchOrder = async () => {
            try {
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await Axios.get(`/api/order/${orderId}`, {
                    headers: {authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        };

        if (!userInfo) {
            return navigate('/login');
        }
        if (
            !order._id ||
            (order._id && order._id !== orderId) 
                      
        ) {
            fetchOrder();
        }
    }, [order, userInfo, orderId, navigate])

  return (
    loading ?
    (<div>Loading...</div>)
    :
    error 
    ? 
    (<div>{error}</div>)
    :
    (<Container>
        <Title>Mulțumim! Comanda a fost recepționată!</Title>
        <Heading>Comanda {orderId}</Heading>
        <Nume>Nume: {order.shippingAddress.fullName}</Nume>
        <Address>Adresa de livrare: {order.shippingAddress.address}, {order.shippingAdress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.phoneNumber}</Address>
        <ItemsContainer>Ce ai cumparat: items</ItemsContainer>
    </Container>)
  )
}

const ItemsContainer = styled.div`

`

const Nume = styled.h3`

`

const Address = styled.h3`

`

const Heading = styled.h2`

`

const Title = styled.h1`
    text-align: center;
`

const Container = styled.div`
    display: column;
`

export default OrderScreen