/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import SearchInput from './SearchInput';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const mockData = [
    {
        'name': 'alvaro',
        'age': 28
    }, 
    {
        'name': 'chuck',
        'age': 2
    }
];

describe("SearchInput", () => {
    it("Should search on change", () => {
        const onChange = jest.fn((value) => {});

        const searchInput = render(<SearchInput
            data={mockData}
            dataProperty='name'
            onChange={onChange}
            placeholder='Search...'
        />);

        const { queryByPlaceholderText } = searchInput;
        const input = queryByPlaceholderText('Search...');

        fireEvent.change(input, { target: { value: 'test' } });

        expect(input.value).toBe('test');
    })
});