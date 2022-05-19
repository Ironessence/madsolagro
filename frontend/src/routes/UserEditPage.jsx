import axios from 'axios';
import React, { useContext, useReducer, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
      default:
        return state;
    }
  };

export default function UserEditPage() {

    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
      });

      const { state } = useContext(Store);
      const { userInfo } = state;
      const params = useParams();
        const { id: userId } = params;
        const navigate = useNavigate();
        const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err,
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      alert('User editat cu succes!');
      navigate('/admin/users');
    } catch (error) {
      alert(error.message);
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <Container>
        <MainTitle>Editează User ${userId}</MainTitle>
        
        <Wrapper>
        {loading ? (<MessageBox>Se incarca...</MessageBox>)
        : error ? (<MessageBox>{error}</MessageBox>)
    : (
        <Form onSubmit={submitHandler}>
            <Label>Nume</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
            <Label>E-Mail</Label>
            <Input value={email} type='email' onChange={(e) => setEmail(e.target.value)} required />
            <Input type='checkbox' label='Admin' checked={isAdmin} id='isAdmin' onChange={(e) => setIsAdmin(e.target.checked)} />
            <Button type='submit'>Editează</Button>

        </Form>
    )}
        </Wrapper>
    </Container>
  )
}

const Button = styled.button`

`

const Input = styled.input`

`

const Label = styled.label`

`

const Form = styled.form`

`

const MessageBox = styled.h3`

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
