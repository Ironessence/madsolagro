import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import DeCeMadsol from '../components/DeCeMadsol';
import ProduseNoi from '../components/ProduseNoi';
import ProduseRecomandate from '../components/ProduseRecomandate';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import axios from 'axios';

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
        <Slider />
        <DeCeMadsol />
        <ProduseNoi products={products} />
        <ProduseRecomandate products={products} />
        <Footer />
    </Container>
  )
}



const Container = styled.div`
    
    overflow: hidden;
`

export default Homepage