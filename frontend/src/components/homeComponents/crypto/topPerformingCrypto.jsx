import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ShrinkingComponentWrapper } from '../../../styles/globalParts/containerStyles';
import {Table} from '../../../styles/components/cryptoStyles/cryptoTablesStyles'
import TablePagination from '@material-ui/core/TablePagination';
import {darkTheme} from '../../../styles/Themes';

const TopPerformingCrypto = () => {

    let allCryptos = useSelector(state => state.cryptoReducer.allCryptos)
    const [topCryptos, setTopCryptos] = useState([]);

    //Pagination
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect( () => {
        const top10Cryptos = [];

        if (allCryptos.length > 0) {
            allCryptos.sort( (a,b) => b.priceChangePercent - a.priceChangePercent ) // sort in descending order
            for (let i = 0; i < 10; i++) {
                top10Cryptos.push(allCryptos[i]);
            }
        }
        
        setTopCryptos(top10Cryptos)
        console.log('allCryptos', allCryptos)
    }, [allCryptos] )

    const cutUSDT = (currency) => {
        let onlyCurrency = currency.split('');
        onlyCurrency.splice(-4, 4);
        onlyCurrency.join('');
        return onlyCurrency;
    }

    return (
        <ShrinkingComponentWrapper> 
            <h3>Top 10 Gainers</h3>
            <Table id="crypto">
                {
                    topCryptos !== [] && topCryptos.length === 10 ?
                    <thead>
                        <tr>
                        <th colSpan='2'>Currency</th>
                        <th>Price</th>
                        <th>Change %</th>
                        </tr>
                    </thead>
                    :
                    null
                }
                <tbody>
                    {topCryptos !== [] && topCryptos.length === 10 ? 
                        topCryptos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map( (crypto, index) => 
                        <tr key={index}>
                            <td>{topCryptos.indexOf(crypto) + 1}</td>
                            <td>{cutUSDT(crypto.symbol)}</td>
                            <td>{Number(crypto.lastPrice).toFixed(2)}</td>
                            <td>{crypto.priceChangePercent > 0 ? <i className="fas fa-angle-double-up" style={{color: 'green'}}></i> : <i className="fas fa-angle-double-down" style={{color: 'red'}}></i>} {Number(crypto.priceChangePercent).toFixed(2)}%</td>
                        </tr>)
                        :
                        <tr>
                            <td colSpan='3'>No information available</td>
                        </tr>
                    }
                </tbody>
            </Table>
            {
                topCryptos && topCryptos.length !== 0 ?
                <TablePagination 
                    component="div"
                    count={topCryptos.length}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    style={{color: darkTheme.text}}
                />
                : null
            }
        </ShrinkingComponentWrapper>
    )
}

export default TopPerformingCrypto;