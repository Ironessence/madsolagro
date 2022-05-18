import React from 'react';
import styled from 'styled-components';
import vegetables from '../assets/seeds.svg';
import watering from '../assets/watering-plants.svg';
import heart from '../assets/green-love.svg';
import house from '../assets/green-house.svg';
import { motion } from 'framer-motion';

const DeCeMadsol = () => {
  return (
    <Container
    initial={{y: -100, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 1.2, type: 'spring'}}
    >
        <Title>De ce Madsol?2223</Title>
        <Break />
        <FeaturesContainer>
        <Feature>
            <Image src={vegetables}/>
            <Details>
                <DetailsTitle>Varietate</DetailsTitle>
                <DetailsDescription>
                Pe site-ul nostru puteți găsi mereu o gamă largă de semințe pe tot parcursul anului.
                </DetailsDescription>
            </Details>
        </Feature>
        <Feature>
            <Image src={watering}/>
            <Details>
                <DetailsTitle>Apa este esențială</DetailsTitle>
                <DetailsDescription>
                Magazinul nostru oferă atât soluții de irigare prin picurare cu tub,cât și prin picurare cu bandă.
                </DetailsDescription>
            </Details>
        </Feature>
        
        <Feature>
            <Image src={heart}/>
            <Details>
                <DetailsTitle>Din dragoste</DetailsTitle>
                <DetailsDescription>
                Indiferent dacă e un hobby sau un business, produsele de pe site sunt ambalate și livrate cu pasiune tuturor clienților.
                </DetailsDescription>
            </Details>
        </Feature>
        <Feature>
            <Image src={house}/>
            <Details>
                <DetailsTitle>Echipamente și accesorii</DetailsTitle>
                <DetailsDescription>
                De la folii speciale pentru sere și solarii până la accesorii esențiale, toate pot fi găsite în același magazin.
                </DetailsDescription>
            </Details>
        </Feature>
        </FeaturesContainer>
    </Container>
  )
}

const FeaturesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    width: 90%;
    
    margin-left: auto;
    margin-right: auto;
    @media only screen and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
`

const DetailsDescription = styled.p`

`

const DetailsTitle = styled.h4`
    font-size: 22px;
    margin-bottom: 7px;
`

const Details = styled.div`

`

const Image = styled.img`
    width: 120px;
`

const Feature = styled.div`
    display: flex;
    align-items: center;
    flex-basis: 50%;
`

const Break = styled.div`
    width: 10%;
    color: green;
    height: 6px;
    border-radius: 12px;
    background-color: lightgreen;
    margin-top: 5px;
    
`

const Title = styled.h1`
    font-size: 48px;
    font-weight: 500;
`

const Container = styled(motion.div)`
    position: relative;
    margin: 50px 40px;
    
`

export default DeCeMadsol