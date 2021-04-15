import React, {useEffect, useState} from 'react';
import { AllComponentsWrapper, ShrinkingComponentWrapper } from '../styles/globalParts/containerStyles';
import {HeadlineFont, CakeChartContainer, PortfolioHeadline, LegendContainer, ColorSquare, LegendWrapper} from '../styles/components/portfolioStyles';
import { PieChart } from 'react-minimal-pie-chart';
import PortfolioChart from '../components/charts/portfolioChart';
import AllInvestments from '../components/portfolioComponents/allInvestments';
import Overview from '../components/portfolioComponents/overview';
import {specificPortfolioFetch} from "../store/fetches/portfoliosFetches";
import {specificPortfolioAction} from "../store/actions/specificPortfolioAction";
import {useDispatch, useSelector} from "react-redux";
import { allCryptosAction } from '../store/actions/cryptoActions';
import {allTheme} from '../styles/Themes';
import {iexSandboxKey} from "../store/constants";

const Portfolio = (props) => {

    const [portfolioId, setPortfolioId] = useState('');

    const [realtimeDataStock, setRealtimeDataStock] = useState([]);
    const [realtimeDataCrypto, setRealtimeDataCrypto] = useState([]);

    const [realtimeDataCombined, setRealtimeDataCombined] = useState([]);

    const [stockSymbols, setStockSymbols] = useState([]);
    const [cryptoSymbols, setCryptoSymbols] = useState([]);

    const allCryptoInfo = useSelector(state => state.cryptoReducer.allCryptos);

    useEffect(() => {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        setPortfolioId(id);

        specificPortfolioFetch(id)
        .then(data => {
            dispatch(specificPortfolioAction(data))
            const pieValues = [];
            const legend = [];
            const colors = [allTheme.vibrantturquoise, allTheme.darkblue, allTheme.yellow, allTheme.vibrantorange, allTheme.green, allTheme.purple, allTheme.blue];
            let colorIndex = 0;
            data.calculations.sort((a, b) => parseFloat(b.invested) - parseFloat(a.invested));
    
            data.calculations.forEach((calculation) => {
               
                if (calculation.invested > 0 && colorIndex < 6) {

                    pieValues.push( {
                        title: calculation.symbol,
                        value: calculation.invested,
                        color: colors[colorIndex]
                    })

                    colorIndex++;
                    
                }
            })
            console.log(data.calculations)

            if (data.calculations.length >= 7){
            const other = data.calculations.filter((value, index) => index > 5);
            console.log(other)
            //data.calculations.splice(6)

            let otherValues = [];

            for (let i=0; i<other.length -1;i++){
                let value = other[i].invested;
                otherValues.push(value);
            }

            const sum = otherValues.reduce((a, b) => a + b, 0)
<<<<<<< HEAD
            console.log(sum)
            console.log(colorIndex)
=======

>>>>>>> dev
            pieValues.push( {
                title: "Other",
                value: sum,
                color: colors[colorIndex]
            })
            }

            for (let i=0; i<pieValues.length;i++){
                legend.push({
                    title: pieValues[i].title,
                    color: pieValues[i].color});
                }

            setPieData(pieValues);
            setLegend(legend);
            

            data.calculations.forEach(symbol => {
                if (symbol.type === 'S') {
                    // setStockSymbols([...stockSymbols, symbol.symbol])
                    stockSymbols.push(symbol.symbol);
                } else if (symbol.type === 'C') {
                    // setCryptoSymbols([...cryptoSymbols, symbol.symbol])
                    cryptoSymbols.push(symbol.symbol);
                }
            })

            let stocksString = '';

             stockSymbols.forEach((symbol, index) => {

                stocksString += symbol;
                if (index !== stockSymbols.length-1) {
                    stocksString += ',';
                }
            })
            if (stocksString !== '') {
                fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?types=price&symbols=${stocksString}&token=${iexSandboxKey}`)
                    .then(res => res.json())
                    .then(data => {
                        const fetchedData = Object.entries(data).map(entry => {
                                return {
                                    symbol: entry[0],
                                    price: parseFloat(entry[1].price)
                                }
                            }
                        )
                        setRealtimeDataStock(fetchedData);
                    })
            }
        })
    }, [])

    useEffect(() => {
        if (allCryptoInfo.length) {
            setRealtimeDataCrypto(allCryptoInfo.filter(crypto => cryptoSymbols.includes(crypto.symbol)));
        }
    }, [allCryptoInfo]);

    useEffect(() => {
        if (stockSymbols && cryptoSymbols) {
            setRealtimeDataCombined(realtimeDataStock.concat(realtimeDataCrypto));
        } else if (stockSymbols) {
            setRealtimeDataCombined(realtimeDataStock);
        } else {
            setRealtimeDataCombined(realtimeDataCrypto);
        }
    }, [realtimeDataStock, realtimeDataCrypto, stockSymbols, cryptoSymbols]);

    const [pieData, setPieData] = useState([]);
    const [legend, setLegend] = useState([])

    useEffect(() => {
        fetch('https://api.binance.com/api/v3/ticker/24hr')
            .then(res => res.json())
            .then(data => {
                const usdtFiltered = data.filter(item => item.symbol.includes("USDT"));
                const action = allCryptosAction(usdtFiltered);
                dispatch(action);
            })
    }, [])

    const dispatch = useDispatch()
    const portfolioInfo = useSelector(state => state.specificPortfolioReducer.portfolioInfo)

    return (
        <>
            <PortfolioHeadline>{portfolioInfo.name}</PortfolioHeadline>
            <AllComponentsWrapper>
                {
                    portfolioInfo.calculations ? <AllInvestments realtimeData={realtimeDataCombined} calculations={portfolioInfo.calculations}/> : ''
                }
                {
                    portfolioInfo.calculations ? <Overview calculations={portfolioInfo.calculations} transactions={portfolioInfo.transactions}/> : ''
                }

                <ShrinkingComponentWrapper>
                    <CakeChartContainer>
                        <HeadlineFont>My Investments</HeadlineFont>
                        {
                            pieData.length > 0 ? <PieChart
                            /* label={props => { return props.dataEntry.title;}}
                            labelStyle={{
                                fontSize: "7px",
                                textColor: "white"
                              }} */
                            data={pieData}
                            labelPosition={70}
                        />  : ''
                        }
                        <LegendWrapper>
                        {legend.map((legend, index) =>
                            <LegendContainer key={index}>
                                <ColorSquare style={{backgroundColor: legend.color}}></ColorSquare>
                                <p>{legend.title}</p>
                            </LegendContainer>
                        )}
                        </LegendWrapper>
                    </CakeChartContainer>
                </ShrinkingComponentWrapper>
                <ShrinkingComponentWrapper>
                    <HeadlineFont>Total value over time</HeadlineFont>
                    {
                        portfolioInfo.transactions ? <PortfolioChart data={portfolioInfo.transactions}/> : ''
                    }
                </ShrinkingComponentWrapper>
                {/* <ShrinkingComponentWrapper>
                    <HeadlineFont>Comparison</HeadlineFont>
                    <img src={Graph}></img>     
                </ShrinkingComponentWrapper> */}
            </AllComponentsWrapper>
        </>
    )
}

export default Portfolio