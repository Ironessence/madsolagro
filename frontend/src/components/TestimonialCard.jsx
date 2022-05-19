import React from 'react';
import styled from 'styled-components';

export default function TestimonialCard({test}) {
  
    const {nume, testimonial} = test;
  
    return (
    <Container>
        <Text>{testimonial}</Text>
        <Signature>{nume}</Signature>
    </Container>
  )
}

const Signature = styled.span`
    align-self: end;
    font-weight: 600;
`

const Text = styled.span`

`

const Container = styled.div`
    width: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 15px;
    background: rgb(255,255,255);
background: linear-gradient(225deg, rgba(255,255,255,0.6362479641693811) 0%, rgba(242,242,242,0.6818505700325732) 96%, rgba(208,208,208,0.38869096091205213) 100%);
    box-shadow: 1px 1px 4px 1px rgb(38, 38, 38);
    transition: 0.5s ease;
    &:hover {
        padding: 20px;
        
    }
    
`
