import React from 'react'
import AddBoxIcon from "@material-ui/icons/AddBox";
import {useHistory} from "react-router-dom";




export const CryptoTable = ({symbol, setSymbolCrypto, setCryptoShowModal}) => {

    const history = useHistory();


    const toSymbolPage = () => {
        history.push(`/crypto/${symbol.symbol}`);
    }


    const addTransaction = () =>{
        // //   console.log(symbol.symbol) 
          setSymbolCrypto(symbol.symbol) 
        //   setShowModal(prev => !prev);
        setCryptoShowModal(true);
        
    }

    return (
        <>
        {
            <tr>
            <td onClick={() => addTransaction()} className="headcol"><AddBoxIcon className="addIcon"/></td>
            <td onClick={() => {
                return (
                    !window.getSelection().toString().length ? toSymbolPage() : ''
                )
            }}>{symbol.symbol}</td>
            <td>{symbol.lastPrice}</td>
            <td>{symbol.priceChange}</td>
            <td>{symbol.priceChangePercent}</td>
            <td>{symbol.volume}</td>
            {/*<td><TrendingUpIcon/> {symbol.highPrice}</td>*/}
            </tr>
        }
    </>
    )
}
