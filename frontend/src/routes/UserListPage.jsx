import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'DELETE_REQUEST':
        return { ...state, loadingDelete: true, successDelete: false };
        case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
        case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
        case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
};

export default function UserListPage() {

    const [{loading, error, users, loadingDelete, successDelete}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const navigate = useNavigate();
    const {state} = useContext(Store);
    const {userInfo} = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/users`, { headers: { Authorization: `Bearer ${userInfo.token}`}});
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: err})
            }
        };
        
        if(successDelete) {
            dispatch({type: 'DELETE_RESET'})
        } else {
            fetchData();
        }
    }, [userInfo, successDelete]);

    const deleteHandler = async (user) => {
        if (window.confirm('Sigur dorești să ștergi utilizatorul?')) {
            try {
                dispatch({type: 'DELETE_REQUEST'});
                await axios.delete(`/api/users/${user._id}`, { headers: { Authorization: `Bearer ${userInfo.token}`}, 
            });
            alert('Utilizator șters cu succes!');
            dispatch({type: 'DELETE_SUCCESS'})
            } catch(err) {
                dispatch({type: 'DELETE_FAIL'})
            }
        }
    }

  return (
    <Container>
        <MainTitle>Listă utilizatori</MainTitle>
        <Wrapper>
        {loading ? (<MessageBox>Se incarca...</MessageBox>)
        : error ? (<MessageBox>{error}</MessageBox>)
    : (
        <Table>
            <Thead>
            <Tr>
                <Th>ID</Th>
                <Th>NUME</Th>
                <Th>EMAIL</Th>
                <Th>ADMIN</Th>
                <Th>ACȚIUNI</Th>
            </Tr>
            </Thead>
            <Tbody>
            {users && users.map((user) => (
                <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.isAdmin ? 'DA' : 'NU'}</Td>
                    <Td><Button
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                    >EDIT</Button>
                    <DelButton
                    type='button'
                    onClick={() => deleteHandler(user)}
                    >Șterge</DelButton>
                    </Td>
                </Tr>
            ))}
            </Tbody>
        </Table>
    )}
        </Wrapper>
    </Container>
  )
}

const DelButton = styled.button`
    background-color: coral;
`

const Button = styled.button`

`

const Td = styled.td`

`

const Tbody = styled.tbody`

`

const Th = styled.th`

`

const Tr = styled.tr`

`

const Thead = styled.thead`

`

const Table = styled.table`

`

const MessageBox = styled.h3`
    text-align: center;
`

const Wrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: clamp(1rem, 4vw, 45px);
`

const Container = styled.div`
    width: 100%;
    padding-top: 90px;
    display: flex;
    flex-direction: column;
`
