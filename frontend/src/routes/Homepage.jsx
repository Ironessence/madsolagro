import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeCeMadsol from '../components/DeCeMadsol';
import ProduseNoi from '../components/ProduseNoi';
import ProduseRecomandate from '../components/ProduseRecomandate';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import axios from 'axios';



const Homepage = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/produse');
      setProducts(result.data);
      
      
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