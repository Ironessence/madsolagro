import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import styled from 'styled-components';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        case 'UPDATE_REQUEST':
            return {...state, loadingUpdate: true};
        case 'UPDATE_SUCCESS':
            return {...state, loadingUpdate: false};
        case 'UPDATE_FAIL':
            return {...state, loadingUpdate: false};
        case 'UPLOAD_REQUEST':
            return {...state, loadingUpload: true, errorUpload: ''};
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                loadingUpload: false,
                errorUpload: '',
            };
        case 'UPLOAD_FAIL':
            return {...state, loadingUpload: false, errorUpload: action.payload};
        default:
            return state;
    }
};

export default function ProductEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const {id: productId} = params;
    const {state} = useContext(Store);
    const {userInfo} = state;
    const [{loading, error, loadingUpdate, loadingUpload}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/products/${productId}`);
                setName(data.nume);
                setSlug(data.slug);
                setPrice(data.pret);
                setImage(data.imagine);
                setCategory(data.categorie);
                setCountInStock(data.inStoc);
                setDescription(data.descriere);
                setDiscount(data.reducere);
                dispatch({type: 'FETCH_SUCCESS'});
            } catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }
        fetchData();
    }, [productId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({type: 'UPDATE_REQUEST'});
            await axios.put(
                `/api/products/${productId}`,
                {
                    _id: productId,
                    name,
                    slug,
                    price,
                    image,
                    category,
                    countInStock,
                    description,
                    discount,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}`},
                }
            );
            dispatch({type: 'UPDATE_SUCCESS'});
            alert('Produs editat cu succes!');
            navigate('/admin/products');

        } catch(err) {
            alert(err);
            dispatch({type: 'UPDATE_FAIL'});
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            dispatch({type: 'UPLOAD_REQUEST'});
            const {data} = await axios.post('/api/upload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${userInfo.token}`
                },
            });
            dispatch({type: 'UPLOAD_SUCCESS'});
            alert('Imagine încărcată cu succes!');
            setImage(data.secure_url);
        } catch(err) {
            dispatch({type: 'UPLOAD_FAIL', payload: error});
            console.log(error);
        }
    }
  
    return (
    <Container>
        <MainTitle>Editează Produsul {productId}</MainTitle>
        <Wrapper>
        {loading ? (<MessageBox>Se incarca...</MessageBox>)
        : error ? (<MessageBox>{error}</MessageBox>)
    : (
        <Form
        onSubmit={submitHandler}
        >
            <Label>Nume produs:</Label>
            <Input
            type='text' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            
            <Label>Slug produs: </Label>
            <Input
            type='text'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            />
            <Label>Preț produs:</Label>
            <Input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            />
            <Label>Imagine produs:</Label>
            <Input 
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            />
            <Label>Uploadează imagine produs în cloud:</Label>
            <Input
            type='file'
            
            onChange={uploadFileHandler}
            required
            />
            {loadingUpload && <LoadingBox>Încărcare imagine...</LoadingBox>}
            <Label>Categorie produs:</Label>
            <Input
            type='text' 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            />
            <Label>Stoc produs:</Label>
            <Input
            type='number'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
            />
            <Label>Descriere:</Label>
            <DescInput
            type='text'
             
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
            <Label>Reducere:</Label>
            <Input

            type='text'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            />
            <Button type='submit'>Finalizare</Button>
        </Form>
    )}
        </Wrapper>
    </Container>
  )
}

const LoadingBox = styled.span`

`

const DescInput = styled.input`
    height: 10vh;
`

const Button = styled.button`
    margin-top: 20px;
    margin-bottom: 50px;
    width: 200px;
    align-self: center;
    padding: 10px 0px;
    color: white;
    background-color: green;
    border-radius: 12px;
    border-style: none;
    cursor: pointer;
    transition: 0.5s ease;
    font-size: 20px;
    &:hover {
        background-color: lightgreen;
        color: black;
    }
`

const Input = styled.input`
    padding: 10px 5px;
`

const Label = styled.label`
    font-size: 22px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
`

const MessageBox = styled.h2`
    text-align: center;
    font-size: 20px;
`

const Wrapper = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: clamp(1.2rem, 4vw, 45px);
    margin: 30px 0px;
`

const Container = styled.div`
    width: 100%;
    padding-top: 90px;
    display: flex;
    flex-direction: column;
`
