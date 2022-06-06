import styled from 'styled-components';

export const PaginationContainer = styled.ul`
    display: flex;
    list-style-type: none;
    justify-content: center;
`;

export const PaginationItem = styled.li`
    padding: 0 12px;
    height: 32px;
    text-alígn: center;
    margin: auto 4px;
    color: #fff;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    pointer-events: ${props => props.isDisabled ? 'none' : 'default'};
    background-color: ${props => props.isSelected ? 'rgb(60, 80, 89)' : ''};

    .dots:hover {
        background-color: transparent;
        cursor: default;
    }

    :hover {
        background-color: ${props => props.isDisabled ? 'transparent' : 'rgb(73, 80, 89)'};
        cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
    }
`;

export const Arrow = styled.div`
    ::before {
        position: relative;
        content: '';
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: ${props => props.isDisabled ? '0.12em solid #fff' : '0.12em solid #fff'};
        border-top: ${props => props.isDisabled ? '0.12em solid #fff' : '0.12em solid #fff'};
    }

    transform: ${props => props.isLeftArrow ? 'rotate(-135deg) translate(-50%)' : 'rotate(45deg)'}
`;