import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import transactionFetch from '../../../store/fetches/transactionFetches';
import { StockTable } from '../../../styles/components/stockStyles/tableStyles';
import { ShrinkingComponentWrapper } from '../../../styles/globalParts/containerStyles';
import Moment from 'react-moment';
import TablePagination from '@material-ui/core/TablePagination';
import {darkTheme} from '../../../styles/Themes';
// import { FormHelperText } from '@material-ui/core';
import {transactionsAction} from '../../../store/actions/transactionsAction';

const TransactionHistory = (props) => {

    const dispatch = useDispatch();
    const allData = useSelector(state => state.transactionsReducer.transactions);
    const [page, setPage] = useState(0);
    const rowsPerPage = 4;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <ShrinkingComponentWrapper>
            <h3>Transaction History</h3>
            <StockTable id="transaction-history">
                {
                    allData && allData.length !== 0 ?
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    : null
                }
                <tbody>
                    {   
                        allData && allData.length !== 0 ?
                        allData.filter(data => data.type === 'S')
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map( (stockData, index) => 
                            <tr key={"Stock"+ index}>
                                <td>{stockData.symbol}</td>
                                <td><Moment format="DD.MM.YY">{stockData.exec_time}</Moment></td>
                                <td>{stockData.cost}</td>
                                <td>{stockData.buy_sell === "B" ? "BUY" : "SELL"}</td>
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan="4">No transactions in your portfolio</td>
                        </tr>
                    }
                </tbody>
            </StockTable>
            {
                allData && allData.length !== 0 ?
                <TablePagination 
                    component="div"
                    count={allData.filter(data => data.type === 'S').length}
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

export default TransactionHistory;