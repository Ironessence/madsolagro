import React from 'react';
import styled from 'styled-components';
import TestimonialCard from './TestimonialCard';

export default function TestimonialeClienti() {

    const testimoniale = [
        {
        nume: 'Adrian C.',
        testimonial: 'Îmi pare rău că nu i-am descoperit pe cei de la Madsolagro mai devreme! Produse excepționale la prețuri foarte bune.'
        },
        {
        nume: 'Elena S.',
        testimonial: 'Foarte mulțumită de produsele pe care le-am achiziționat. Livrare rapidă și comunicare excelentă.'
        },
        {
        nume: 'Ionuț A.',
        testimonial: 'Serviciul clienți foarte prompt și amabil, cu siguranță voi comanda din nou!'
        },
        {
        nume: 'Virgil M.',
        testimonial: 'De fiecare dată aceeași calitate excelentă!'
        },
        {
        nume: 'Mihaela D.',
        testimonial: 'Soțul a dezvoltat deja o pasiune pentru a cultiva propriile legume în grădină. Nota 10 Madsolagro!'
        },
        {
        nume: 'Pavel A.',
        testimonial: 'Produse foarte bune, primite rapid prin curier. Recomand!'
        },

    ]

  return (
    <Container>
        
        <Title>Ce spun clienții</Title>
        <Break />
        
        <Wrapper>
        {testimoniale.map((test) => (
            <TestimonialCard key={test.nume} test={test} />
        ))}
        </Wrapper>
    </Container>
  )
}



const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 30px;
    margin-top: 50px;
`

const Break = styled.div`
    width: 10%;
    color: green;
    height: 6px;
    border-radius: 12px;
    background-color: #2a8507;
    margin-top: 5px;
    
`

const Title = styled.h1`
    font-size: clamp(2rem, 4vw, 45px);
    font-weight: 500;
`

const Container = styled.div`
    position: relative;
    padding: 50px 0px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
       
    
`
