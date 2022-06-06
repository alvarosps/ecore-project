import React, { useState, useEffect } from 'react';

const SearchInput = ({ data, dataProperty, onChange }) => {
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
        <input
            value={searchText}
            placeholder='Search...'
            onChange={(event) => setSearchText(event.target.value)}
        />
    )
}

export default SearchInput;