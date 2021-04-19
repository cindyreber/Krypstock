import React, { useEffect, useState } from 'react';
import CandlestickStockIntraday from "../components/charts/candlesticksStockIntraday";
import CandlestickStockHistorical from "../components/charts/candlesticksStockHistorical";
import NewsStock from "../components/newsFeed/newsStock";
import { AllComponentsWrapper, ShrinkingComponentWrapper } from "../styles/globalParts/containerStyles";
import ChartTimeframeButton from "../components/charts/chartSelectTimeframeButton";
import { FormSelectWrapper, GraphWrapper } from "../styles/components/cryptoStyles/bitCoinStyles";
import StockPageInfoCard from "../components/stockCards/stockPageInfoCard";
import { stockFetcherIntraday } from "../components/charts/helperFunctions/stockFetcherIntraday";
import { stockFetcherHistorical } from "../components/charts/helperFunctions/stockFetcherHistorical";
import NoIntradayInfo from "../components/charts/noIntradayInfo";
import PortfoliosWithStock from "../components/stockCards/portfoliosWithStock";
import StockStats from "../components/stockCards/stockStats";
import { iexSandboxKey } from "../store/constants";
import {PageTitleStyleNoMarginBottom, SubPageTitleStyle} from "../styles/globalParts/titleStyles";
import { NaviWrapper } from '../styles/components/naviStyles/menuStyles';
import Burger from '../components/navi/burger';
import Menu from '../components/navi/menu';

const StockPage = () => {

    const [chartTimeframe, setChartTimeframe] = useState('day');

    const [open, setOpen] = useState(false);

    const [companyName, setCompanyName] = useState('');
    const [companyMarket, setCompanyMarket] = useState('');

    const [intradayData, setIntradayData] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);

    const url = window.location.href;
    const symbol = url.substring(url.lastIndexOf('/') + 1);

    const [keyStats, setKeyStats] = useState('');

    useEffect(() => {
        fetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/stats?token=${iexSandboxKey}`)
            .then(res => res.json())
            .then(data => {
                setKeyStats(data);
                stockFetcherIntraday(symbol, setIntradayData);
            })
    }, []);

    useEffect(() => {
        if (chartTimeframe !== 'day') {
            stockFetcherHistorical(symbol, setHistoricalData, chartTimeframe);
        }
    }, [chartTimeframe]);

    return (
        <>
            {/* <PageTitleStyleNoMarginBottom>{symbol}</PageTitleStyleNoMarginBottom> */}
            <NaviWrapper>
                <div>
                    <Burger open={open} setOpen={setOpen}/> 
                    <Menu open={open} setOpen={setOpen} />  
                </div>  
                <div className="heading">
                <h2>{symbol}</h2>
                </div>
                </NaviWrapper>
            <SubPageTitleStyle>{companyName}</SubPageTitleStyle>
            <AllComponentsWrapper>
                <ShrinkingComponentWrapper>
                    <FormSelectWrapper>

                        <div>
                            <ChartTimeframeButton setChart={setChartTimeframe} />
                        </div>
                    </FormSelectWrapper>
                    <GraphWrapper>
                        {
                            chartTimeframe === 'day' && intradayData ?
                                <CandlestickStockIntraday data={intradayData} market={companyMarket} />
                                :
                                ''
                        }
                        {
                            chartTimeframe === 'day' && intradayData === null ?
                                <NoIntradayInfo companyName={companyName} market={companyMarket} />
                                :
                                ''
                        }
                        {
                            chartTimeframe !== 'day' ?
                                <CandlestickStockHistorical data={historicalData} market={companyMarket} />
                                :
                                ''
                        }
                        
                    </GraphWrapper>
                </ShrinkingComponentWrapper>
                <ShrinkingComponentWrapper>   
                    <StockPageInfoCard symbol={symbol} setCompanyName={setCompanyName} setCompanyMarket={setCompanyMarket} />
                </ShrinkingComponentWrapper>
                <ShrinkingComponentWrapper>
                    <h3>Key stats</h3>
                    <StockStats keyStats={keyStats} />
                </ShrinkingComponentWrapper>
                <ShrinkingComponentWrapper>
                    <PortfoliosWithStock symbol={symbol} />
                </ShrinkingComponentWrapper>
                <ShrinkingComponentWrapper>
                    <NewsStock symbol={symbol} companyName={companyName} />
                </ShrinkingComponentWrapper>
            </AllComponentsWrapper>
        </>
    )
}

export default StockPage;