import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                loading: false,
            };
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        case 'CREATE_REQUEST':
            return {...state, loadingCreate: true };
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
            };
        case 'CREATE_FAIL':
            return {
                ...state,
                loadingCreate: false,
            }
            case 'DELETE_REQUEST':
            return {...state, loadingDelete: true, successDelete: false, };
            case 'DELETE_SUCCESS':
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
            case 'DELETE_FAIL':
            return {
                ...state,
                loadingDelete: false,
                successDelete: false,
            }
            case 'DELETE_RESET':
            return {
                ...state,
                loadingDelete: false,
                successDelete: false,
            }
        default:
            return state;
    }
}


const ProductListPage = () => {

    const [{loading, error, products, pages, loadingCreate, loadingDelete, successDelete}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const navigate = useNavigate();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);

    const page = sp.get('page') || 1;

    const {state} = useContext(Store);
    const {userInfo} = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`/api/products/admin?page=${page}`, { headers: { Authorization: `Bearer ${userInfo.token}`},
            });
            dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch(err) {
                console.log(err);
            }
        }
        
        if(successDelete) {
            dispatch({type: 'DELETE_RESET'});
        } else {
            fetchData();
        }
    }, [page, userInfo, successDelete]);

    const createHandler = async () => {
        if (window.confirm('Dorești să introduci un produs nou?')) {
            
            try {
                dispatch({type: 'CREATE_REQUEST'});
                const {data} = await axios.post(
                    '/api/products',
                    {},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}`},
                    }
                )
                alert('Produs introdus cu succes!');
                dispatch({type: 'CREATE_SUCCESS'});
                navigate(`/admin/product/${data.product._id}`);
                
            } catch(err) {
                console.log(err, err.message);
                dispatch({type: 'CREATE_FAIL',});
            }
        }
    }

    const deleteHandler = async (product) => {
        if(window.confirm('Sigur dorești să ștergi produsul?')) {
            try {
                await axios.delete(`/api/products/${product._id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token }`},
                });
                alert('Produs șters cu succes!');
                dispatch({type: 'DELETE_SUCCESS'});
            } catch(err) {
                alert(err.message);
                dispatch({type: 'DELETE_FAIL'});
            }
        }
    }

  return (
    <Container>
        <TopDiv>
            <MainTitle>Listă Produse</MainTitle>
            <CreateProductButton
            onClick={createHandler}
            >Adaugă Produs</CreateProductButton>
            </TopDiv>
        
        <Wrapper>
            {loading ? (<MessageText>Se incarca...</MessageText>)
            : error ? (<MessageText>{error}</MessageText>)
        : (
            <>
            {loadingCreate && <MessageText>Se incarca...</MessageText>}
            {loadingDelete && <MessageText>Se incarca...</MessageText>}
            <Table>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>NUME</Th>
                    <Th>PRET</Th>
                    <Th>CAT</Th>
                    <Th>EDIT</Th>
                    
                </Tr>
            </Thead>
            <Tbody>
            {products && products.map((product) => (
                <Tr key={product._id}>
                    <Td>{product._id}</Td>
                    <Td>{product.nume}</Td>
                    <Td>{product.pret} Lei</Td>
                    <Td>{product.categorie}</Td>
                    <Td><EditButton
                    onClick={() => navigate(`/admin/product/${product._id}`)}
                    >Edit</EditButton>
                    <DeleteButton
                    onClick={() => deleteHandler(product)}
                    >
                    Șterge
                    </DeleteButton>
                    </Td>
                    
                </Tr>
            ))}
            </Tbody>
            </Table>
            </>
        )}
        </Wrapper>
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <Link
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
                >{x + 1}</Link>
            ))}
        </Pagination>
    </Container>
  )
}

const DeleteButton = styled.button`
    padding: 5px;
    margin: 0px 5px;
    cursor: pointer;
    background-color: coral;
    
`

const EditButton = styled.button`
    padding: 5px;
    margin: 0px 5px;
    cursor: pointer;

`

const CreateProductButton = styled.button`
    
    width: 200px;
    padding: 10px 0px;
    margin: 30px;
    cursor: pointer;
    border-radius: 12px;
    border-style: none;
    color: white;
    font-size: 18px;
    font-weight: 600;
    background-color: green;
    transition: 0.5s ease;
    &:hover {
        color: black;
        background-color: lightgreen;
    }
    
`

const TopDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
`

const Pagination = styled.div`
    
    align-self: end;
    
    margin-right: 10%;
    display: flex;
    gap: 20px;
    a {
        background-color: lightgray;
        width: 20px;
        text-align: center;
        border: 1px solid gray;
        cursor: pointer;
        text-decoration: none;
    }

`

const Td = styled.td`
    border: 1px solid gray;
    padding: 5px 0px;
    text-align: center;
`

const Tbody = styled.tbody`
    
`

const Th = styled.th`
    border: 2px solid gray;
    padding: 10px 0px;
`

const Tr = styled.tr`
    
`

const Thead = styled.thead`
    
`

const Table = styled.table`
    width: 100%;
`

const MessageText = styled.h2`
    text-align: center;
    font-size: 30px;
`

const Wrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: 70vh;

`

const MainTitle = styled.h1`
    font-size: clamp(1.2rem, 4vw, 50px);
    
    margin: 30px;
    flex: 1;
`

const Container = styled.div`
    width: 100%;
    padding-top: 90px;
    display: flex;
    flex-direction: column;
`

export default ProductListPage