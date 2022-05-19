import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';



const ToateProduseleMeniu = (props) => {

    const {toateProduseleOpen, setToateProduseleOpen, categories} = props;
    

  return (
    <Container
    initial={{y: -200, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.6, type: 'spring'}}
    >
    {categories.map((category) => (
        <Category key={category}>
        <Link 
        to={`/search?category=${category}`}
        onClick={() => setToateProduseleOpen(false)}
        >{category}</Link>
        </Category>
    ))}
       
    </Container>
  )
}



const Category = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid gray;
    padding: 15px 0px;
    cursor: pointer;
`

const Container = styled(motion.div)`
    width: 500px;
    height: auto;
    background-color: rgba(38, 38, 38, 1);
    position: absolute;
    top: 90px;
    z-index: 99;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    left: 25vw;
    padding: 30px;
    border-radius: 12px;
    @media only screen and (max-width: 800px) {
        position: relative;
        top: 0;
        left: 0;
        padding: 0px 30px;
        width: 100%;
    }
    
    
`

export default ToateProduseleMeniu