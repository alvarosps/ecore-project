import React, { useState, useEffect } from 'react';

import { CustomInput } from './SearchInput.styles';

const SearchInput = ({ data, dataProperty, onChange, placeholder = 'Search...' }) => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getFilteredData = () => {
            return data.filter((d) => {
                if (d[dataProperty].toLowerCase().includes(searchText)) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        const filteredData = getFilteredData();
        onChange(filteredData);
    }, [searchText]);

    return (
        <CustomInput
            value={searchText}
            placeholder={placeholder}
            onChange={(event) => setSearchText(event.target.value)}
        />
    )
}

export default SearchInput;