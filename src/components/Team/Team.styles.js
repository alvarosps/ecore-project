import styled from 'styled-components';
import ListItemText from '@mui/material/ListItemText';

export const Background = styled.div`
    background-color: #151c25;
    text-align: center;
`;

export const ListContainer = styled.div`
    background-color: rgb(18, 18, 18);
    margin-left: auto;
    margin-right: auto;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 360px;
`;

export const TeamName = styled(ListItemText)`
    span {
        color:#fff;
        font-weight: bold;
        margin-top: 10px;
        font-size: 1.25rem;
    }
`;

export const TeamLead = styled(ListItemText)`
    p {
        color: #fff;
    }
`