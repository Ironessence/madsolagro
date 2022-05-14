import React from 'react';
import styled from 'styled-components';
import slideimg1 from '../assets/slide1.png';
import slideimg2 from '../assets/slide2.png';
import slideimg3 from '../assets/slide3.png';
import slideimg4 from '../assets/slide4.png';

const Slider = () => {
  return (
    <Container>
        
        <SlideImg4 src={slideimg4}/>
    </Container>
  )
}



const SlideImg4 = styled.img`
    object-fit: cover;
    width: 100%;
`

const Container = styled.div`
    height: 100vh;
    display: flex;
    width: 100%;
    
`


export default Slider