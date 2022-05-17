import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { Store } from '../Store';


const Shipping = () => {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo,
        cart: {shippingAddress},
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');

    useEffect(() => {
        if(!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                phoneNumber,
            },
        });
        localStorage.setItem('shippingAddress',
        JSON.stringify({
            fullName,
                address,
                city,
                postalCode,
                phoneNumber,
        })
        );
        navigate('/payment');
    };

  return (
    <Container>
        <MainTitle>Revizuiește comanda</MainTitle>
        
        <DeliveryContainer>
        <Title>Adresa de livrare</Title>
        
        <Form
        onSubmit={submitHandler}
        id='address-form'
        >
        <Label>Nume și Prenume</Label>
        <Input 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        />
        <Label>Adresa completă</Label>
        <Input 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />
        <Label>Oraș / Localitate</Label>
        <Input 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        />
        <Label>Cod Poștal</Label>
        <Input 
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        required
        />
        <Label>Număr de telefon</Label>
        <Input 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        />
        
        </Form>
        </DeliveryContainer>
        

        <SubmitButton
        type='submit'
        form='address-form'
        >Către plată</SubmitButton>
    </Container>
  )
}

const MainTitle = styled.h1`

`

const DeliveryContainer = styled.div`

`

const SubmitButton = styled.button`
    width: 150px;
    font-size: 18px;
    padding: 5px 0px;
    background-color: green;
    border-style: none;
    color: white;
    align-self: center;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.5s ease;
    margin-top: 50px;
    &:hover {
        background-color: lightgreen;
        color: black;
    }
`

const Input = styled.input`
    padding: 7px 0px;
    width: 75%;
    align-self: center;
`

const Label = styled.label`
    font-weight: 600;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 500px;
    text-align: center;
    
    margin-left: auto;
    margin-right: auto;
    padding: 30px 0px;
    border-radius: 12px;
    
`

const Title = styled.h1`
    font-size: 35px;
    text-align: center;
    padding-bottom: 50px;
    
    
`

const Container = styled.div`
    display: flex;
    
    
    
    
    
`

export default Shipping