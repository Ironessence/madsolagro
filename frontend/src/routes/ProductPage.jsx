import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import checked from '../assets/checked.png';
import notavailable from '../assets/notavailable.png';
import increment from '../assets/increment.png';
import decrement from '../assets/decrement.png';
import {motion} from 'framer-motion';
import Footer from '../components/Footer';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { Store } from '../Store';






const reducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_REQUEST':
        return {...state, loading: true};
      case 'FETCH_SUCCESS':
        return {...state, product: action.payload, loading: false};
      case 'FETCH_FAIL':
        return {...state, loading: false, error: action.payload};
      default:
        return state;
    }
  }


const ProductPage = () => {
//PARAMS AND GET PRODUCT---------------------------------
            
    const params = useParams();
    const {slug} = params;

    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        loading: true, 
        error: '',
        product: [],
      });
     
      useEffect(() => {
        const fetchData = async () => {
          dispatch({type: 'FETCH_REQUEST'});
          try {
            const result = await axios.get(`/api/products/slug/${slug}`);
            dispatch({type: 'FETCH_SUCCESS', payload: result.data})
          } catch(err) {
            dispatch({type: 'FETCH_FAIL', payload: err.message});
          }
                      
          
        };
        fetchData();
        
        
        
      }, [slug]);

      
//-------------------------------------------------------- 
      
      const {state, dispatch: ctxDispatch} = useContext(Store);
      const {cart} = state;

     const addToCartHandler = async () => {

        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`)
        if (data.inStoc < quantity) {
            window.alert('Ne pare rau. Produsul nu mai este in stoc');
            return;
        }

        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }})
     }

  return (
   
        loading ? <LoadingBox />
        : error ? <ErrorBox />
        :
        <>
    <Container>
        <ImageAndDetailsDiv>
        <ImageContainer
        initial={{x: -200, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 0.8, type:'spring'}}
        >
            <ProductImage src={product.imagine}/>
        </ImageContainer>
        <InfoContainer
        initial={{x: 200, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 0.8, type:'spring', delay: 0.2}}
        >
            <ProductName>{product.nume}</ProductName>
            <Break></Break>
            
            
                {product.inStoc > 0 
                ?
                <Availability>
                <Icon src={checked}/>
                <AvailabilityText>În stoc</AvailabilityText>
                </Availability>
                :
                <Availability>
                <Icon src={notavailable}/>
                <AvailabilityText>Stoc epuizat</AvailabilityText>
                </Availability>}

            <PriceAndReducere>
                    <Price>
                        {product.pret} Lei
                    </Price>
                    {product.reducere &&
                    <Salvezi>Reducere {product.reducere} !</Salvezi>
                    }
            </PriceAndReducere>
            <QtyDiv>
                
                <QuantityDiv>
                <Decrement src={decrement}/>
                <Cantitate>1</Cantitate>
                <Increment src={increment}/>
                </QuantityDiv>
                <AlegeCantitatea>Cantitate</AlegeCantitatea>
            </QtyDiv>
            <AddToCartButton onClick={addToCartHandler}>
                Adaugă în coș
            </AddToCartButton>
            
            
        </InfoContainer>
        </ImageAndDetailsDiv>
        <DescriptionDiv
        initial={{y: -200, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.8, type:'spring', delay: 0.4}}
        >
            <DescriptionDivTitle>
                Despre produs:
            </DescriptionDivTitle>
            <ActualDescription>
                {product.descriere}
            </ActualDescription>
        </DescriptionDiv>
        
    </Container>
    <Footer />
    </>
  )
}

//STYLED COMPONENTS-----------------------------------------

const AlegeCantitatea = styled.span`

`

const Salvezi = styled.h3`
    color: green;
`

const Price = styled.h2`
    
    background-color: lightgreen;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 1px 1px 2px 1px gray;
    margin-bottom: 30px;

`

const PriceAndReducere = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    @media only screen and (max-width: 800px) {
        justify-content: center;
    }
    
`

const ActualDescription = styled.p`
    margin-top: 30px;
    text-align: center;
`

const DescriptionDivTitle = styled.h2`
    font-size: clamp(15px, 8vw, 40px);
    text-align: center;
`

const AddToCartButton = styled.button`
    font-size: 25px;
    color: white;
    background-color: green;
    padding: 10px;
    border-style: none;
    border-radius: 35px;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
        transform: scale(1.1);
        background-color: lightgreen;
        color: black;
    }
`

const Increment = styled.img`
    width: 30px;
    padding: 5px;
    cursor: pointer;
`

const Cantitate = styled.h3`

`

const Decrement = styled.img`
    width: 30px;
    
    padding: 5px;
    cursor: pointer;
    
`

const QuantityDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`



const QtyDiv = styled.div`
    display: flex;
    align-items: center;
    
    width: 60%;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    margin-bottom: 30px;
    @media only screen and (max-width: 800px) {
        margin-left: auto;
        margin-right: auto;
    }
`

const AvailabilityText = styled.h4`
    
`

const Icon = styled.img`
    margin-right: 10px;
`

const Availability = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    @media only screen and (max-width: 800px) {
        justify-content: center;
    }
    
`



const Break = styled.div`
    width: 15%;
    height: 3px;
    background-color: green;
    border-radius: 12px;
    margin-bottom: 10px;
    @media only screen and (max-width: 800px) {
        margin-left: auto;
        margin-right: auto;
    }
`

const ProductName = styled.h1`
    font-weight: 700;
    font-size: clamp(15px, 8vw, 40px);
    font-family: 'Roboto', sans-serif;
    @media only screen and (max-width: 800px) {
        margin-top: 30px;
    }
    
`

const DescriptionDiv = styled(motion.div)`
    margin-top: 80px;
    width: 90%;
`

const ImageAndDetailsDiv = styled.div`
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        
    }
    
`

const InfoContainer = styled(motion.div)`
    flex: 1;
    flex-direction: column;
    @media only screen and (max-width: 800px) {
        order: 2;
        
    }
    
`

const ProductImage = styled.img`
    width: 350px;
    border-radius: 0px 35px 35px 35px;
    border: 2px solid green;
`

const ImageContainer = styled(motion.div)`
    flex: 1;
    align-items: center;
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 800px) {
        order: 1;
    }
`

const Container = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    
    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 100px;
    padding: 20px;
    margin-bottom: 500px;
    @media only screen and (max-width: 800px) {
        align-items: center;
        text-align: center;
        gap: 20px;
    }
    
    
    
`

export default ProductPage