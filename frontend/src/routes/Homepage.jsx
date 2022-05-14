import React from 'react';
import styled from 'styled-components';
import DeCeMadsol from '../components/DeCeMadsol';
import ProduseNoi from '../components/ProduseNoi';
import ProduseRecomandate from '../components/ProduseRecomandate';
import Slider from '../components/Slider';
import Footer from '../components/Footer';



const Homepage = () => {
  return (
    <Container>
        <Slider />
        <DeCeMadsol />
        <ProduseNoi />
        <ProduseRecomandate />
        <Footer />
    </Container>
  )
}

const Container = styled.div`
    
    overflow: hidden;
`

export default Homepage