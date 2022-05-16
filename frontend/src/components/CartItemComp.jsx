import React, {useContext} from 'react';
import styled from 'styled-components';
import trashicon from '../assets/trash.png';

import axios from 'axios';
import { Store } from '../Store';

const CartItemComp = ({item}) => {

    const {imagine, nume, quantity, pret} = item;
    const {state, dispatch: ctxDispatch} = useContext(Store);

    const updateCartHandler = async (item, quantity) => {
        const {data} = await axios.get(`/api/produse/${item._id}`);
        if (data.inStoc < quantity) {
            window.alert('Ne pare rau. Produsul nu mai este in stoc');
            return;
        }

        ctxDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity }})
    }

    const removeItemHandler = (item) => {
        ctxDispatch({type: 'CART_REMOVE_ITEM', payload: item});
    }

  return (
    <Container>
        <ImgDiv>
        <ProductImg src={imagine} />
        </ImgDiv>
        <DetailsDiv>
            <ProductTitle>{nume}</ProductTitle>
            <ProductQuantity>
                <Decrement
                disabled={item.quantity === 1}
                onClick={() => updateCartHandler(item, item.quantity - 1)}
                >-</Decrement>
                <Quantity>{quantity}</Quantity>
                <Increment 
                onClick={() => updateCartHandler(item, item.quantity + 1)}
                >+</Increment>
            </ProductQuantity>
        </DetailsDiv>
        <PriceDiv>
            <Price>
                {pret} Lei
            </Price>
        </PriceDiv>
        <RemoveItemDiv>
            <TrashIcon 
            onClick={() => removeItemHandler(item)}
            src={trashicon}/>
        </RemoveItemDiv>
    </Container>
  )
}

const Price = styled.h2`

`

const PriceDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Quantity = styled.span`
    font-size: 18px;
`

const Increment = styled.button`
    cursor: pointer;
    font-size: 25px;
    font-weight: 600;
    padding: 2px 5px;
    border-radius: 50%;
    border-style: none;
    width: 30px;
`

const Decrement = styled.button`
    cursor: pointer;
    font-size: 25px;
    font-weight: 600;
    padding: 2px 5px;
    border-radius: 50%;
    border-style: none;
    width: 30px;
`

const TrashIcon = styled.img`
    cursor: pointer;
`

const RemoveItemDiv = styled.div`
    flex: 1;
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;

    
`

const ProductQuantity = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const ProductTitle = styled.h2`
    text-align: center;
`

const ProductImg = styled.img`
    width: 50%;
    min-width: 100px;
    border-radius: 12px;
    box-shadow: 1px 2px 2px 1px gray;
    
`

const DetailsDiv = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
`

const ImgDiv = styled.div`
    flex: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 0px;
    border-bottom: 1px solid gray;

`

export default CartItemComp