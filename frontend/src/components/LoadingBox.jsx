import React from 'react';
import styled from 'styled-components';

const LoadingBox = () => {
  return (
    <Container>
        <LoadingText>Se încarcă...</LoadingText>
    </Container>
  )
}

const LoadingText = styled.h3`

`

const Container = styled.div`
    display: flex;
    width: 50%;
    height: 10vh;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
`

export default LoadingBox