import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function CategoriesList() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await axios.get(`/api/products/categories`);
                setCategories(data);
                
            } catch(err) {
                console.log(err, err.message);
            }
        };
        fetchCategories();
        
    }, []);

  return (
    <Container>
        <MainTitle>Categorii produse</MainTitle>
        <Break></Break>
        <Wrapper>
        {categories && categories.map((category) => (
            <Link to={`/search?/${category}`}>{category}</Link>
        ))}
        </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
`

const Break = styled.div`
    width: 10%;
    color: green;
    height: 6px;
    border-radius: 12px;
    background-color: #2a8507;
    margin-top: 5px;
    
`

const MainTitle = styled.h1`
    font-size: clamp(2rem, 4vw, 45px);
    font-weight: 500;
`

const Container = styled.div`

`
