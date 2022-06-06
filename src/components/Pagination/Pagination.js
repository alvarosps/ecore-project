import React from 'react';
import { usePagination, DOTS } from '../../utils/usePagination';

import { PaginationContainer, PaginationItem, Arrow } from './Pagination.styles';

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
                        className={pageNumber === currentPage ? 'selected' : ''}
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