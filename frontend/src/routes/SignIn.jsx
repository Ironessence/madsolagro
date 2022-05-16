import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import bg from '../assets/slide1.png';

const SignIn = () => {

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <Container>
        <Title>Intră în cont</Title>
        <FormWrapper>
            <Form>
                
                <Input type='email' required placeholder='E-Mail:'/>
                <Input type='password' required placeholder='Parola:' />
                <SubmitButton type='submit'>Logare</SubmitButton>
            </Form>
            <NewUserDiv>
                <Link to={`/signup?redirect=${redirect}`}>Nu ai cont?</Link>
            </NewUserDiv>
        </FormWrapper>
    </Container>
  )
}

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
    gap: 30px;
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
`

const Title = styled.h1`
    margin: 30px 0px;
    text-align: center;
`

const Container = styled.div`
    padding-top: 90px;
    background-image: url(${bg});
    background-size: cover;
    height: 100vh;
    
`

export default SignIn