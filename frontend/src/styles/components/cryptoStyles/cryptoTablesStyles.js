import styled from 'styled-components';
import {darkTheme, lightTheme, allTheme} from "../../Themes";

export const Table = styled.table`
    width: 100%;
    /* background-color: ${({ theme }) => theme === lightTheme ? darkTheme.body : lightTheme.body}; */
    border-collapse: collapse;
    /* border-width: 2px; */
    /* border-style: solid; */
    color: ${({ theme }) => theme === lightTheme ? darkTheme.text : darkTheme.text};;
    
    thead{
        background-color: ${props => props.id === 'crypto' ? allTheme.orange : props.id === "trans-history" ? allTheme.turquoise : allTheme.green};
        /* border-bottom: 1px solid #ffcc00; */
        color: ${({ theme }) => theme === lightTheme ? darkTheme.text : darkTheme.text};
        tr{
            height: 60px;
        }
    }

    tbody tr{
        height: 50px;
        :nth-child(2n) {
            background: ${({ theme }) => theme === lightTheme ? darkTheme.secondBackground : lightTheme.secondBackground};;
        }
    }

    tbody td{
        text-align: center;
        padding: 3px;
    }

    tr:first-child th:first-child {
        border-top-left-radius: 15px;
    }

    tr:first-child th:last-child {
        border-top-right-radius: 15px;
    }

    tr:last-child td:first-child {
    border-bottom-left-radius: 15px;
    }

    tr:last-child td:last-child {
    border-bottom-right-radius: 15px;
    }
`;