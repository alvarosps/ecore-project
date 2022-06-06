import React from 'react';
import { usePagination, DOTS } from '../../utils/usePagination';
import styled from 'styled-components';

const PaginationContainer = styled.ul`
    display: flex;
    list-style-type: none;
`;

const PaginationItem = styled.li`
    padding: 0 12px;
    height: 32px;
    text-alígn: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    pointer-events: ${props => props.isDisabled ? 'none' : 'default'}
    backgroundColor: ${props => props.isSelected ? 'rgba(0, 0, 0, 0.04)' : ''}

    .selected {
        background-color: rgba(0, 0, 0, 0.08);
    }

    .dots:hover {
        background-color: transparent;
        cursor: default;
    }

    :hover {
        background-color: ${props => props.isDisabled ? 'transparent' : 'rgba(0, 0, 0, 0.04)'};
        cursor: ${props => props.isDisabled ? 'default' : 'cursor'};
    }
`;

const Arrow = styled.div`
    ::before {
        position: relative;
        content: '';
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: ${props => props.isDisabled ? '0.12em solid rgba(0, 0, 0, 0.43)' : '0.12em solid rgba(0, 0, 0, 0.87)'};
        border-top: ${props => props.isDisabled ? '0.12em solid rgba(0, 0, 0, 0.43)' : '0.12em solid rgba(0, 0, 0, 0.87)'};
    }

    transform: ${props => props.isLeftArrow ? 'rotate(-135deg) translate(-50%)' : 'rotate(45deg)'}
`;

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className = ''
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        onPageChange(currentPage -1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <PaginationContainer className={className}>
            <PaginationItem
                isDisabled={currentPage === 1}
                isSelected={false}
                onClick={onPrevious}
            >
                <Arrow
                    isDisabled={currentPage === 1}
                    isLeftArrow={true}
                />
            </PaginationItem>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <PaginationItem
                        className='dots'
                        isDisabled={false}
                        isSelected={false}
                        key={index}
                    >
                        &#8230;
                    </PaginationItem>;
                }

                return (
                    <PaginationItem
                        isDisabled={false}
                        isSelected={pageNumber === currentPage}
                        onClick={() => onPageChange(pageNumber)}
                        key={index}
                    >
                        {pageNumber}
                    </PaginationItem>
                );
            })}
            <PaginationItem
                isDisabled={currentPage === lastPage}
                isSelected={false}
                onClick={onNext}
            >
                <Arrow
                    isDisabled={currentPage === lastPage}
                    isLeftArrow={false}
                />
            </PaginationItem>
        </PaginationContainer>
    );
}

export default Pagination;