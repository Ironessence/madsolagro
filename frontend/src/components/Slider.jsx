import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import slideimg1 from '../assets/slide1.png';
import slideimg2 from '../assets/slide2.png';
import slideimg3 from '../assets/slide3.png';
import slideimg4 from '../assets/slide4.png';
import leftarrow from '../assets/leftarrow.png';
import rightarrow from '../assets/rightarrow.png';

const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
      if(direction === 'left') {
        setSlideIndex(slideIndex > 0 ? slideIndex -1 : 3)
      } else {
        setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0)
      }
  }

  return (
    <Container>
        <Arrow direction='left' onClick={() => handleClick('left')}>
          <ArrowImg src={leftarrow}/>
        </Arrow>
        <Arrow direction='right' onClick={() => handleClick('right')}>
          <ArrowImg src={rightarrow}/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          <Slide>
            <SlideImg src={slideimg1}/>
            <SlideTitle>
              O GAMĂ LARGĂ DE AGRONUTRIENȚI BIO
            </SlideTitle>
          </Slide>
          <Slide>
            <SlideImg src={slideimg2}/>
            <SlideTitle>
              SISTEME DE IRIGARE PRIN BANDĂ ȘI TUB
            </SlideTitle>
          </Slide>
          <Slide>
            <SlideImg src={slideimg3}/>
            <SlideTitle>
              SEMINȚE PENTRU ORICE GRĂDINĂ
            </SlideTitle>
          </Slide>
          <Slide>
            <SlideImg src={slideimg4}/>
            <SlideTitle>
              GAMĂ VARIATĂ DE ÎNGRĂȘĂMINTE
            </SlideTitle>
          </Slide>
        </Wrapper>

        
        
    </Container>
  )
}

const SlideTitle = styled.h1`
  position: absolute;
  width: 50%;
  font-size: 70px;
  color: white;
  text-shadow: 2px 2px 2px gray;
  left: 7%;
`

const SlideImg = styled.img`
  height: 100vh;
  width: 100%;
  object-fit: cover;
  
`

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  transform: translateX(0vw);
`

const Wrapper = styled.div`
    height: 100%;
    transition: all 1.3s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
    display: flex;
    
    
    
`

const ArrowImg = styled.img`

`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${props => props.direction === 'left' && '10px'};
  right: ${props => props.direction === 'right' && '10px'};
  cursor: pointer;
  z-index: 5;
  
  
`

const Container = styled.div`
    height: 100vh;
    display: flex;
    width: 100%;
    overflow: hidden;
    position: relative;  
    
`


export default Slider