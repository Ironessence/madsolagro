import React from 'react';
import styled from 'styled-components';

const ErrorBox = () => {

  return (
    <Container>
        <ErrorText>
        Produsul căutat nu există.
        </ErrorText>
    </Container>
  )
}

const ErrorText = styled.h3`
    color: white;
    
`

const Container = styled.div`
    background-color: red;
    text-align: center;
    
    display: flex;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    padding: 50px;

`

export default ErrorBox