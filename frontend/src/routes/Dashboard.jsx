import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import {Store} from '../Store';
import axios from 'axios';
import Chart from 'react-google-charts';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                summary: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

const Dashboard = () => {

    const [{loading, summary, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const {state} = useContext(Store);
    const {userInfo} = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    '/api/orders/summary', {
                        headers: { Authorization: `Bearer ${userInfo.token}`},
                    }
                );
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }
        fetchData();
    }, [userInfo])

  return (
    <Container>
        <MainTitle>Admin Dashboard</MainTitle>
        {loading ? (<LoadingText>Se incarca...</LoadingText>)
        : error ? (<ErrorText>{error}</ErrorText>)
        :
        (<Wrapper>
            <TopContainer>
            <TopContCard>
            <CardTitle>{summary.users && summary.users[0] ?summary.users[0].numUsers : 0}</CardTitle>
            <CardText>Utilizatori</CardText>
            </TopContCard>
            <TopContCard>
            <CardTitle>{summary.orders && summary.orders[0] ?summary.orders[0].numOrders : 0}</CardTitle>
            <CardText>Număr comenzi</CardText>
            </TopContCard>
            <TopContCard>
            <CardTitle>{summary.orders && summary.orders[0] ?summary.orders[0].totalSales.toFixed(2) : 0} Lei</CardTitle>
            <CardText>Valoare comenzi</CardText>
            </TopContCard>
            </TopContainer>
            <SecondTitle>Grafic Vânzări</SecondTitle>
            <GraphContainer>
            {summary.dailyOrders.length === 0 
            ? (<LoadingText>0 Vânzări</LoadingText>)
            : (
                <Chart
                width='100%'
                height='400px'
                chartType='AreaChart'
                loader={<div>Se incarca...</div>}
                data={[['Data', 'Vânzări'],
            ...summary.dailyOrders.map((x) => [x._id, x.sales]) ]}
                >

                </Chart>
            )
        }
            </GraphContainer>
        </Wrapper>)
        }
        
    </Container>
  )
}

const GraphContainer = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 0px;
`

const SecondTitle = styled.h1`
    text-align: center;
    font-size: clamp(1rem, 4vw, 55px);
    margin: 30px 0px;
`

const CardText = styled.h3`
    font-size: clamp(0.8rem, 3.5vw, 40px);
    text-align: center;
`

const CardTitle = styled.h2`
    font-size: clamp(1rem, 4vw, 45px);
    text-align: center;
`

const TopContCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    flex: 0.75;
    border: 1px solid black;
`

const TopContainer = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-evenly;
    gap: 30px;
`

const ErrorText = styled.h3`
    text-align: center;
`

const LoadingText = styled.h3`
    text-align: center;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const MainTitle = styled.h1`
    text-align: center;
    font-size: clamp(1rem, 4vw, 55px);
    margin: 30px 0px;
`

const Container = styled.div`
    padding-top: 90px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

`

export default Dashboard