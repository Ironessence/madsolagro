import React, {useContext, useEffect, useReducer, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styled from 'styled-components';
import { Store } from '../Store';
import Axios from 'axios';


const reducer = (state, action) => {
    switch(action.type) {
        case 'CREATE_REQUEST':
            return {...state, loading: true};
        case 'CREATE_SUCCESS':
            return {...state, loading: false};
        case 'CREATE_FAIL':
            return {...state, loading: false};
        default:
            return state;
    }
}

const Shipping = () => {

    const navigate = useNavigate();
    const [{loading, error}, dispatch] = useReducer(reducer, {
        loading: false,
        error: '',
    });
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo,
        cart,
        
    } = state;
    const {shippingAddress, cartItems} = cart;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.pret, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 200 ? round2(0) : round2(25);

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    
    

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
        navigate('/comanda-plasata-cu-succes');
    };
  

    const placeOrderHandler = async () => {
        try {
            dispatch({type: 'CREATE_REQUEST'});

            const {data} = await Axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                }
            }
            );
            ctxDispatch({type: "CART_CLEAR"});
            dispatch({type: 'CREATE_SUCCESS'});
            localStorage.removeItem('cartItems');
            navigate(`/comanda-plasata-cu-succes`);
       
        } catch(err) {
            dispatch({type: 'CREATE_FAIL'});
            alert(err.message);
        }
    }

    

  return (
    <Container>
        <MainTitle>Finalizează comanda</MainTitle>
        <MainWrapper>
        <LeftWrapper>
        <ProductsContainer>
            <ProductsTitle>Produse</ProductsTitle>
        {cart.cartItems.map((item) => (
            <ProdCard key={item._id}>
                <ImgDiv>
                <ProdImg src={item.imagine} alt={item.nume}/>
                </ImgDiv>
                <ProdInfo>
                <Link to={`/product/${item.slug}`}>{item.nume}</Link>
                <Qty>Cantitate: {item.quantity}</Qty>
                <Price>Preț/buc: {item.pret} Lei</Price>
                </ProdInfo>
            </ProdCard>
        ))}
        <Link to='/cart'>Editează coș</Link>
        </ProductsContainer>
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
        
        </Form>
        </DeliveryContainer>
        <PaymentContainer>
        <PaymentTitle>Metoda de plată</PaymentTitle>
        <RambursContainer>
        <InputRamburs type='checkbox' name='Plata ramburs(la curier)' value='Ramburs' defaultChecked/>
        <LabelRamburs>Plata ramburs</LabelRamburs>
        </RambursContainer>
        
        </PaymentContainer>
        </LeftWrapper>
        
        
        <RightWrapper>
            
            <DetailsOrderDiv>
            <RightWrapperTitle>Sumar comandă</RightWrapperTitle>
            <Subtotal>
            Subtotal: {cart.itemsPrice} Lei
            </Subtotal>
            <CostLivrare>Cost livrare: {cart.shippingPrice} Lei </CostLivrare>
            <Total>Total: {cart.totalPrice} Lei</Total>
            </DetailsOrderDiv>
            


        <SubmitButton
        type='submit'
        form='address-form'
        onClick={placeOrderHandler}
        >Finalizează comanda</SubmitButton>
        {loading && <LoadingBox>Trimitere comandă</LoadingBox>}
        </RightWrapper>
            
        </MainWrapper>
        
        
    </Container>
  )
}

const LoadingBox = styled.span`

`

const DetailsOrderDiv = styled.div`
    display: Flex;
    flex-direction: column;
    gap: 20px;
`

const Total = styled.h2`
    align-self: end;
`

const CostLivrare = styled.h3`
    align-self: end;
`

const Subtotal = styled.h3`
    align-self: end;
`

const RightWrapperTitle = styled.h2`
    text-align: center;
    margin-bottom: 50px;
`

const ProductsTitle = styled.h1`
    align-self: start;
`

const Price = styled.h4`

`

const Qty = styled.span`

`

const ProdInfo = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    a {
        color: black;
        font-size: 1.5rem;
    }
    
`

const ImgDiv = styled.div`
    flex: 1;
    width: 10%;
    
`

const ProdImg = styled.img`
    width: 60%;
    min-width: 100px;
    border-radius: 12px;
    object-fit: contain;
`

const ProdCard = styled.div`
    display: flex;
    width: 100%;
    padding: 5px;
    
    justify-content: space-around;
    
    border-bottom: 1px solid gray;
`

const LabelRamburs = styled.label`
    white-space: no-wrap;
    font-weight: 600;
    font-size: 20px;
`

const InputRamburs = styled.input`
    width: 50px;
`

const RambursContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    
`

const PaymentTitle = styled.h1`
    margin-bottom: 30px;
`

const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`

const ProductsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0px;
    
`

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: lightgray;
    padding: 20px 10px;
    margin-top: 50px;
    height: 500px;
    justify-content: space-around;
    @media only screen and (max-width: 800px) {
        height: auto;
    }
`

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
    padding: 20px 10px;
    
    
`

const MainWrapper = styled.div`
    display: flex;
    
    width: 100%;
    @media only screen and (max-width: 800px) {
        flex-direction: column;
        
    }
`

const MainTitle = styled.h1`
    white-space: nowrap;
    text-align: center;
    font-size: clamp(1.5rem, 7vw, 60px);
    padding: 30px 0px;
`

const DeliveryContainer = styled.div`

`

const SubmitButton = styled.button`
    width: 95%;
    font-size: 18px;
    padding: 10px 0px;
    background-color: green;
    border-style: none;
    color: white;
    align-self: center;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.5s ease;
    
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
    
    
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
        overflow: hidden;
        
    }
    
    
    
`

export default Shipping