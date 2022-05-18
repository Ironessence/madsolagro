import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';



const ShippingAddressPage = () => {
 
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
        navigate('/finish-order');
    }

    useEffect(() => {
        if (!userInfo) {
          navigate('/signin?redirect=/shipping');
        }
      }, [userInfo, navigate]);
 
 
 
 
    return (
    <Container>
        <DeliveryContainer>
        <DeliveryTitle>Adresa de livrare</DeliveryTitle>
        
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
        <SubmitButton
        type='submit'
        
        
        >Pasul următor</SubmitButton>
        </Form>
        </DeliveryContainer>
    </Container>
  )
}

const SubmitButton = styled.button`
    width: 50%;
    font-size: 18px;
    padding: 10px 0px;
    background-color: green;
    border-style: none;
    color: white;
    align-self: center;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.5s ease;
    margin-top: 30px;
    
    &:hover {
        background-color: lightgreen;
        color: black;
    }
    @media only screen and (max-width: 600px) {
        width: 70%;
        margin-top: 50px;
        margin-bottom: 50px;

    }
`

const DeliveryContainer = styled.div`

`

const Input = styled.input`
    padding: 7px 0px;
    width: 85%;
    align-self: center;
    border-radius: 5px;
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
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
    
    
`

const DeliveryTitle = styled.h1`
    font-size: 35px;
    
    padding-bottom: 20px;
    text-align: center;
    
    
`

const Container = styled.div`
    width: 100%;
    padding-top: 90px;
`

export default ShippingAddressPage