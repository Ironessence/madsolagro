import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import {Store} from '../Store';
import {useNavigate} from 'react-router-dom';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, orders: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        case 'DELETE_REQUEST':
            return {...state, loadingDelete: true, successDelete: false};
        case 'DELETE_SUCCESS':
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
        case 'DELETE_FAIL':
            return {...state, loadingDelete: false};
        case 'DELETE_RESET':
            return {...state, loadingDelete: false, successDelete: false};

        default:
            return state;
    }
}

export default function OrderListPage() {

    const navigate = useNavigate();

    const {state} = useContext(Store);
    const {userInfo} = state;

    const [{loading, error, orders, loadingDelete, successDelete}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {

                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/orders`,
                { headers: { Authorization: `Bearer ${userInfo.token}`},
            });
            dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: err});
                
            }
        }
        if(successDelete) {
            dispatch({type: 'DELETE_RESET'});
        } else {
            fetchData();
        }
        
    }, [userInfo, successDelete]);

    const deleteHandler = async (order) => {
        if(window.confirm('Sigur dorești să ștergi comanda?')) {
            try {
                dispatch({type: 'DELETE_REQUEST'});
                await axios.delete(`/api/orders/${order._id}`, { headers: { Authorization: `Bearer ${userInfo.token}`},
            });
            alert('Comanda a fost ștearsă cu succes!');
            dispatch({type: 'DELETE_SUCCESS'});
            } catch(err) {
                alert(err.message);
                dispatch({type: 'DELETE_FAIL'});
            }
        }
    }

  return (
    <Container>
        <MainTitle>Listă Comenzi</MainTitle>
        {loadingDelete && <MessageBox>Se sterge...</MessageBox>}
        <Wrapper>
        {loading ? (<MessageBox>Se incarca...</MessageBox>)
        : error ? (<MessageBox>{error}</MessageBox>)
    : (
        
        <Table>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>USER</Th>
                    <Th>DATA</Th>
                    <Th>TOTAL</Th>
                    <Th>ACTIUNI</Th>
                </Tr>
            </Thead>
            <Tbody>
            {orders && orders.map((order) => (
                <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{order.user ? order.user.name : 'USER STERS'}</Td>
                    <Td>{order.createdAt.substring(0, 10)}</Td>
                    <Td>{order.totalPrice.toFixed(2)}</Td>
                    <Td><Button
                    onClick={() => {
                        navigate(`/order/${order._id}`);
                    }}
                    >Detalii</Button>
                    <DeleteButton
                    onClick={() => deleteHandler(order)}
                    >Șterge</DeleteButton></Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
    )}
        </Wrapper>
    </Container>
  )
}

const DeleteButton = styled.button`
    background-color: coral;
    margin: 0px 5px;
    cursor: pointer;
`

const Td = styled.td`
    border-bottom: 1px solid gray;
    padding: 10px 0px;
`

const Button = styled.button`
    margin: 0px 5px;
    cursor: pointer;
`

const Tbody = styled.tbody`
    text-align: center;
`

const Th = styled.th`
    border: 2px solid gray;
    padding: 5px 0px;
`

const Tr = styled.tr`
    
`

const Thead = styled.thead`
    
`

const Table = styled.table`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
`

const MessageBox = styled.h3`

`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: clamp(1rem, 4vw, 45px);
    margin: 30px 0px;

`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 90px;
`
