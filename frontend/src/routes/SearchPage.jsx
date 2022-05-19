import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import HomepageProductCard from '../components/HomepageProductCard';

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false,
            };
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

const prices = [
    {
        name: '1 - 50 Lei',
        value: '1-50',
    },
    {
        name: '51 - 200 Lei',
        value: '51-200',
    },
    {
        name: '> 200 Lei',
        value: '200-2000'
    }
];


const SearchPage = () => {

    const navigate = useNavigate();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    //atentie! la category
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [categories, setCategories] = useState([]);

    const [{loading, error, products, pages, countProducts}, dispatch] = useReducer(reducer,
        {
            loading: true,
            error: '',
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&order=${order}`
                )
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: data
                })
            } catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: err});
                
            }
        }
        fetchData();
    }, [category, error, order, page, price, query]);

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await axios.get(`/api/products/categories`);
                setCategories(data);
            } catch(err) {
                console.log(err, err.message);
            }
        }
        fetchCategories();
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;
        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`;
    };



  return (
    <Container>
        <MainTitle>Rezultat căutare</MainTitle>
        <Wrapper>
        
        <Sidebar>
            <FilterBasedOnCat>
            <Ul>
                <Li>
                    <Link
                    to={getFilterUrl({category: 'all'})}
                    >Oricare</Link>
                </Li>
                {categories.map((c) => (
                    <Li key={c}>
                        <Link
                        to={getFilterUrl({category: c})}
                        >{c}</Link>
                    </Li>
                ))}
            </Ul>
            </FilterBasedOnCat>
            <FilterBasedOnPrice>
                    <Ul>
                        <Li>
                            <Link
                            to={getFilterUrl({price: 'all'})}
                            >Oricare</Link>
                        </Li>
                        {prices.map((p) => (
                            <Li key={p.value}>
                                <Link
                                to={getFilterUrl({price: p.value})}
                                >{p.name}</Link>
                            </Li>
                        ))}
                    </Ul>
            </FilterBasedOnPrice>
        </Sidebar>
        <MainDisplay>
            {loading ? (<LoadingText>Se incarca...</LoadingText>)
            : error ? (<ErrorText>{error}</ErrorText>)
            : (
            <MainDisplayHeader>
                <LeftHeader>
                {countProducts === 0 ? 'Nu' : countProducts} Rezultate
                {query !== 'all' && ' : ' + query}
                {category !== 'all' && ' : ' + category}
                {price !== 'all' && ' : Pret ' + price}
                {query !== 'all' ||
                category !== 'all' ||
                price !== 'all' 
                ? (
                <Button onClick={() => navigate('/search')}>O</Button>
                ) : null}
                </LeftHeader>
                <RightHeader>
                    Sortează după {' '}
                    <Select value={order}
                    onChange={(e) => {
                        navigate(getFilterUrl({order: e.target.value}))
                    }}>
                        <Option value='newest'>Cele mai noi</Option>
                        <Option value='lowest'>Preț: ascendent</Option>
                        <Option value='highest'>Preț: descendent</Option>
                    </Select>
                </RightHeader>
            </MainDisplayHeader>
            )}
            {products && <ProductsDisplay>
                    {products.length === 0 && (<MessageBox>Niciun produs găsit</MessageBox>)}
                    {products.map((product) => (
                        <HomepageProductCard key={product._id} product={product}/>
                    ))}
                    
            </ProductsDisplay>}
            
            
            <div>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                    key={x + 1}
                    to={getFilterUrl({page: x + 1})}
                    >
                    <Button>{x + 1}</Button>
                    </Link>
                ))}
            </div>
        </MainDisplay>
        </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
    display: flex;
`

const Button = styled.button`

`

const MessageBox = styled.h2`
    text-align: center;
    margin-top: 20px;
`


const ProductsDisplay = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 50px;
    
    gap: 50px;
`

const Option = styled.option`

`

const Select = styled.select`

`

const RightHeader = styled.div`

`

const LeftHeader = styled.div`

`

const MainDisplayHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`

const ErrorText = styled.h3`
    text-align: center;
    padding-top: 100px;
`

const LoadingText = styled.h3`
    text-align: center;
    padding-top: 100px;
`

const MainDisplay = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
`

const FilterBasedOnPrice = styled.div`
    display: flex;
    flex-direction: column;
`

const Li = styled.li`
    margin-bottom: 20px;
`

const Ul = styled.ul`
    margin-bottom: 20px;
`

const FilterBasedOnCat = styled.div`
    display: flex;
    flex-direction: column;
`

const Sidebar = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
    height: 50vh;
    padding: 10px;
`

const MainTitle = styled.h1`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 50px;
    
`

const Container = styled.div`
    display: flex;
    padding-top: 90px;
    flex-direction: column;
`

export default SearchPage