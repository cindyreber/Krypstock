import React, {useEffect} from 'react'
import { BitCoin } from './bitCoin'
import { AllComponentsWrapper} from '../../../styles/globalParts/containerStyles';
import { PriceToday } from './priceToday';
import {TransactionHistory} from './transactionHistory'
import { CryptoNews } from './cryptoNews';
import { CryptoQuickTrade } from './quickTrade';
import {allCryptosAction} from "../../../store/actions/cryptoActions";
import {useDispatch} from "react-redux";
import TopPerformingCrypto from './topPerformingCrypto';

export const Crypto = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://api.binance.com/api/v3/ticker/24hr')
            .then(res => res.json())
            .then(data => {
                const usdtFiltered = data.filter(item => item.symbol.includes("USDT"));
                const action = allCryptosAction(usdtFiltered);
                dispatch(action);
            })
    }, [])


    return (
        <AllComponentsWrapper>
            <BitCoin/>
            <TopPerformingCrypto />
            <TransactionHistory/>
            <CryptoNews/>
            <CryptoQuickTrade fromPage='HomePage' />
        </AllComponentsWrapper>
    )
}
