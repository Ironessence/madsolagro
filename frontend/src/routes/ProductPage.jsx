import React, {useState, useEffect, useReducer} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import checked from '../assets/checked.png';
import notavailable from '../assets/notavailable.png';
import rightarrow from '../assets/rightarrow.png';
import leftarrow from '../assets/leftarrow.png';
import Footer from '../components/Footer';

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
            const result = await axios.get(`/api/produse/slug/${slug}`);
            dispatch({type: 'FETCH_SUCCESS', payload: result.data})
          } catch(err) {
            dispatch({type: 'FETCH_FAIL', payload: err.message});
          }
                      
          
        };
        fetchData();
        
        
      }, [slug]);

  return (
   
        loading ? <div>Încărcare...</div>
        : error ? <div>{error}</div>
        :
        <>
    <Container>
        <ImageAndDetailsDiv>
        <ImageContainer>
            <ProductImage src={product.imagine}/>
        </ImageContainer>
        <InfoContainer>
            <ProductName>{product.nume}</ProductName>
            <Break></Break>
            <ProductPrice>De la x lei</ProductPrice>
            
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
                </Availability>
                
            }

            <QuantitySelector>
                <QuantitySelectorText>
                    Alege cantitatea
                </QuantitySelectorText>
                <QuantityInput name='cantitate'>
                    <Optiune value='300g'>300g</Optiune>
                    <Optiune value='500g'>500g</Optiune>
                    <Optiune value='1000g'>1000g</Optiune>
                </QuantityInput>
            </QuantitySelector>
            <TotalPriceAndQuantity>
                <TotalPrice>Total: 25.00 Lei</TotalPrice>
                <QuantityDiv>
                <Decrement src={leftarrow}/>
                <Cantitate>1</Cantitate>
                <Increment src={rightarrow}/>
                </QuantityDiv>
            </TotalPriceAndQuantity>
            <AddToCartButton>
                Adaugă în coș
            </AddToCartButton>
            
            
        </InfoContainer>
        </ImageAndDetailsDiv>
        <DescriptionDiv>
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
    }
`

const Increment = styled.img`
    width: 20px;
    background-color: gray;
    padding: 5px;
    cursor: pointer;
`

const Cantitate = styled.h3`

`

const Decrement = styled.img`
    width: 20px;
    background-color: gray;
    padding: 5px;
    cursor: pointer;
    
`

const QuantityDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const TotalPrice = styled.h2`

`

const TotalPriceAndQuantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    margin-bottom: 30px;
`

const Optiune = styled.option`
    width: 100px;
    padding: 10px;

`

const QuantityInput = styled.select`
    width: 100px;
    padding: 10px;
    background-color: lightgray;
    border-radius: 12px;
`

const QuantitySelectorText = styled.h3`
    margin-bottom: 10px;
`

const QuantitySelector = styled.div`
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
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
    border-bottom: 1px solid gray;
    
`

const ProductPrice = styled.h3`
    font-weight: 400;
`

const Break = styled.div`
    width: 15%;
    height: 3px;
    background-color: green;
    border-radius: 12px;
    margin-bottom: 10px;
`

const ProductName = styled.h1`
    font-weight: 700;
    font-size: clamp(15px, 8vw, 40px);
    
`

const DescriptionDiv = styled.div`
    margin-top: 80px;
    width: 90%;
`

const ImageAndDetailsDiv = styled.div`
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 800px) {
        flex-direction: column;
    }
    
`

const InfoContainer = styled.div`
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

const ImageContainer = styled.div`
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
    
    
`

export default ProductPage