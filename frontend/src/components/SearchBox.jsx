import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import searchicon from '../assets/loupe.svg';
import { motion } from 'framer-motion';

const SearchBox = () => {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    }

  return (
      <Container
      initial={{y: -100, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.4, type:'spring'}}
      >
    <Form onSubmit={submitHandler}>
        <Input
        type='text'
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Caută produs'
        >
        </Input>
        <Button type='submit'>
            <SearchIcon src={searchicon} />
        </Button>
    </Form>
    </Container>
  )
}

const SearchIcon = styled.img`
    width: 80%;
    margin-left: 10px;
`

const Button = styled.button`
    width: 30px;
    background-color: transparent;
    border-style: none;
    border-radius: 0px 12px 12px 0px;
    cursor: pointer;
`

const Input = styled.input`
    height: 30px;
    border-radius: 12px 0px 0px 12px;
    border-style: none;
    padding-left: 15px;
    background-color: transparent;
    width: clamp(250px, 40vw, 60%);
    align-self: center;
    color: white;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 2px gray;
    }
    
`

const Form = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
`

const Container = styled(motion.div)`
    width: 100%;
    background-color: rgba(38, 38, 38, 0.7);
    position: absolute;
    top: 90px;
    display: flex;
    height: 60px;
    right: 0;
    justify-content: center;
`

export default SearchBox