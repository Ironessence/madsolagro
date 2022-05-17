import React, {useContext, useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bg from '../assets/slide1.png';
import Axios from 'axios';
import {Store} from '../Store';


const SignUp = () => {
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {userInfo} = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Parolele nu se potrivesc!');
            return;
        }
        try {
            const {data} = await Axios.post('/api/users/signup', {
                name,
                email,
                password,
                
            });
            ctxDispatch({type: "USER_SIGNIN",
            payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch(err) {
            alert('E-mail sau parolă incorecte');
        }
    }

    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

  return (
    <Container>
        <Title>Creează un cont</Title>
        <FormWrapper>
            <Form onSubmit={submitHandler}>
                <Label>Nume:</Label>
                <Input 
                type='text' 
                required 
                placeholder='Nume:'
                onChange={(e) => setName(e.target.value)}
                />
                <Label>Adresa de E-Mail:</Label>
                <Input 
                type='email' 
                required 
                placeholder='E-Mail:'
                onChange={(e) => setEmail(e.target.value)}
                />
                <Label>Parola:</Label>
                <Input 
                type='password' 
                required 
                placeholder='Parola:'
                onChange={(e) => setPassword(e.target.value)} 
                />
                <Label>Confirmă parola:</Label>
                <Input 
                type='password' 
                required 
                placeholder='Confirma Parola:'
                onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <SubmitButton type='submit'>Înregistrare</SubmitButton>
            </Form>
            <NewUserDiv>
                <Link to={`/signin?redirect=${redirect}`}>Ai deja un cont? Click aici.</Link>
            </NewUserDiv>
        </FormWrapper>
    </Container>
  )
}

const Label = styled.label`
    font-weight: 600;
`

const NewUserDiv = styled.div`
    text-align_ center;
    padding-bottom: 50px;
    a {
        font-size: 18px;
        font-weight: 500;
        color: blue;
    }
`

const SubmitButton = styled.button`
    width: 50%;
    align-self: center;
    padding: 10px 0px;
    font-size: 18px;
    background-color: green;
    border-style: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
    color: white;
    transition: 0.5s ease;
    &:hover {
        background-color: lightgreen;
        color: black;
    }
`

const Input = styled.input`
    padding: 7px 5px;
`


const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;
    gap: 10px;
    padding: 50px 0px 100px 0px;
`

const FormWrapper = styled.div`
    width: 400px;
    border-radius: 20px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: rgb(255,255,255);
background: linear-gradient(225deg, rgba(255,255,255,0.41555304276315785) 0%, rgba(242,242,242,0.5306846217105263) 53%, rgba(208,208,208,0.5109477796052632) 100%);
    @media only screen and (max-width: 500px) {
        width: 95%;
    }
`

const Title = styled.h1`
    
    padding-top: 12vh;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px black;
    margin-bottom: 5vh;
`

const Container = styled.div`
    
    background-image: url(${bg});
    background-size: cover;
    height: 100vh;
    
`

export default SignUp;