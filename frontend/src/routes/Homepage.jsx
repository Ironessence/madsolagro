import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import DeCeMadsol from '../components/DeCeMadsol';
import ProduseNoi from '../components/ProduseNoi';
import ProduseRecomandate from '../components/ProduseRecomandate';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import axios from 'axios';
import bgtest1 from '../assets/slide2.png';
import rightarrow from '../assets/rightarrow.png';
import { useNavigate } from 'react-router-dom';
import CategoriesList from '../components/CategoriesList';
import TestimonialeClienti from '../components/TestimonialeClienti';
import ParteneriDeIncredere from '../components/ParteneriDeIncredere';


const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}



const Homepage = () => {

  const navigate = useNavigate();

  const [{loading, error, products}, dispatch] = useReducer(reducer, {
    loading: true, 
    error: '',
    products: [],
  });

  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get('/api/products');
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch(err) {
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
                  
      
    };
    fetchData();
    
    
  }, []);

  return (
    <Container>
        <Header>
        <ImageContainer>
          <HeaderTitle>
            Din pasiune pentru calitate
          </HeaderTitle>
          <HeaderSubtitle>
            în mod natural
          </HeaderSubtitle>
          <HeaderButton
          onClick={() => navigate('/search')}>
            Vezi produsele
            <RightArrow src={rightarrow}/>
          </HeaderButton>
          <ImgHeader src={bgtest1}/>
        
        </ImageContainer>
        
        </Header>
        {/* <Slider /> */}
        <DeCeMadsol />
        {/* <ProduseNoi products={products} />
        <ProduseRecomandate products={products} /> */}
        <TestimonialeClienti />
        <ParteneriDeIncredere />
        <Footer />
    </Container>
  )
}

const RightArrow = styled.img`
    color: black;
    transition: 0.5s ease;
  
`

const HeaderButton = styled.button`
    position: absolute;
    right: 15%;
    top: 55%;
    font-size: clamp(0.8rem, 3.5vw, 30px);
    padding: 10px 20px;
    background-color: rgb(64, 117, 19);
    display: flex;
    align-items: center;
    border-style: none;
    border-radius: 18px;
    color: white;
    cursor: pointer;
    transition: 0.5s ease;
    box-shadow: 1px 2px 5px 1px rgb(38, 38, 38);
    &:hover {
      background-color: #2a8507;
      transform: scale(1.02);
      img {
        transform: translateX(20%);
      }
    }
    
`

const HeaderSubtitle = styled.h2`
  position: absolute;
  
  right: 10%;
  top: 40%;
  white-space: nowrap;
  font-size: clamp(1rem, 4vw, 60px);
  color: white;
  text-shadow: 1px 2px 4px black;
  letter-spacing: 0.15rem;
  font-weight: 400;
  z-index: 2;
  
`

const ImgHeader = styled.img`
  width: 100%;
  height: calc(100vh - 90px);
  object-fit: cover;
  
`

const HeaderTitle = styled.h1`
    position: absolute;
    right: 5%;
    
    top: 30%;
    white-space: nowrap;
    font-size: clamp(1.2rem, 5vw, 70px);
    color: white;
    text-shadow: 1px 2px 4px black;
    letter-spacing: 0.15rem;
    font-weight: 400;
    z-index: 2;
    
`





const ImageContainer = styled.div`
    width: 100%;
    
    position: relative;
`

const Header = styled.div`
    width: 100%;
    
    display: flex;
    padding-top: 90px;

`

const Container = styled.div`
    overflow: hidden;
    width: 100%;
    background-color: #f7f3e0;
`

export default Homepage