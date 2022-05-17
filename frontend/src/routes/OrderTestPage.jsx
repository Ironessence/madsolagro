import React from 'react';
import styled from 'styled-components'

const OrderTestPage = () => {
  return (
    <Container>
        <Title>Comanda a fost plasata cu succes! Multumim!</Title>
    </Container>
  )
}

const Title = styled.h1`
    text-align: center;
    font-size: 70px;
    margin-top: 20vh;
    
`

const Container = styled.div`

`

export default OrderTestPage