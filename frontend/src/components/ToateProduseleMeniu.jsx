import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const ToateProduseleMeniu = (props) => {

    const {toateProduseleOpen, setToateProduseleOpen} = props;

    const toateProduseleToggle = () => {
        setToateProduseleOpen(!toateProduseleOpen);
    }


  return (
    <Container
    initial={{y: -200, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.6, type: 'spring'}}
    >
        <Category>
            <CategoryTitle>Semințe de legume</CategoryTitle>
        </Category>
        <Category>
            <CategoryTitle>Îngrășăminte</CategoryTitle>
        </Category>
        <Category>
            <CategoryTitle>Pesticide și protecția plantelor</CategoryTitle>
        </Category>
        <Category>
            <CategoryTitle>Hobby</CategoryTitle>
        </Category>
        <Category>
            <CategoryTitle>Folie profesională - sere și solarii</CategoryTitle>
        </Category>
        <Category>
            <CategoryTitle>Sisteme și accesorii irigații</CategoryTitle>
        </Category>
        
        <CloseMenu
        whileHover={{rotate: 180}}
        transition={{duration: 0.6}}
        onClick={toateProduseleToggle}
        >X</CloseMenu>
    </Container>
  )
}

const CloseMenu = styled(motion.span)`
    position: absolute;
    right: 5%;
    top: 5%;
    font-size: 35px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    @media only screen and (max-width: 800px) {
        display: none;
    }
`



const CategoryTitle = styled.h4`
    color: white;
    font-size: 22px;
`

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