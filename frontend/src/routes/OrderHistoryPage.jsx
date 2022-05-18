import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Store } from '../Store';
import Axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, orders: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

const OrderHistoryPage = () => {

    const {state} = useContext(Store);
    const {userInfo} = state;
    const navigate = useNavigate();
    
    const [{loading, error, orders}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST' });
            try {
                const {data} = await Axios.get(
                    `/api/orders/mine`,
                    {headers: { Authorization: `Bearer ${userInfo.token}`}}
                );
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch(err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: err
                });
            }
        }
        fetchData();
    }, [userInfo])


  return (
    <Container>
        <MainTitle>Istoric Comenzi</MainTitle>
        <MainWrapper>
            {loading
            ?
        (<LoadingText>Se incarca...</LoadingText>)
            : error ? (
                <ErrorText>{error}</ErrorText>
            ) 
            : (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>DATA</Th>
                            <Th>TOTAL</Th>
                            <Th>VIZ.</Th>
                                                       
                            
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order._id}>
                                <Td>{order._id}</Td>
                                <Td>{order.createdAt.substring(0, 10)}</Td>
                                <Td>{order.totalPrice.toFixed(2)} Lei</Td>
                                <Td>
                                    <Button
                                    onClick={() => navigate(`/order/${order._id}`)}
                                    >
                                        Vezi comanda
                                    </Button>
                                </Td>
                                
                                
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </MainWrapper>
    </Container>
  )
}

const Button = styled.button`

`

const Td = styled.td`
    border: 1px solid gray;
    padding: 5px 0px;
    
`

const Tbody = styled.tbody`

`

const Th = styled.th`
    border: 2px solid gray;
    padding: 10px 0px;
    
    
`

const Tr = styled.tr`
    text-align: center;
    
    
`

const Thead = styled.thead`
    
`

const Table = styled.table`
    
`

const ErrorText = styled.h2`
    text-align: center;
    padding: 50px 0px;
    color: red;
`

const LoadingText = styled.h2`
    text-align: center;
    padding: 50px 0px;
`

const MainWrapper = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 50px 0px;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 800px) {
        width: 95%;
    }
`

const MainTitle = styled.h1`
    text-align: center;
    margin-top: 50px;
`

const Container = styled.div`
    padding-top: 90px;
`

export default OrderHistoryPage