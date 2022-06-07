/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import Home from './Home';
import '@babel/polyfill';

const teamsMock = [
    {
    "id": "7676a4bf-adfe-415c-941b-1739af07039b",
    "name": "Ordinary Coral Lynx"
    },
    {
    "id": "5071b4fc-43f2-47a2-8403-e934dc270606",
    "name": "Weekly Peach Wildebeest"
    },
    {
    "id": "7cf0d32d-036f-40b6-86ea-2473d4ccaecd",
    "name": "Surrounding Gold Pheasant"
    },
    {
    "id": "de01d852-c519-4c54-b95a-80c5b6fa0157",
    "name": "Feminist Maroon Gorilla"
    },
    {
    "id": "89a50743-f60b-4345-a772-9d3c68021408",
    "name": "Resident Scarlet Hare"
    }
];

describe("Home", () => {
    let originFetch;

    beforeEach(() => {
        originFetch = (global).fetch;
    });

    afterEach(() => {
        global.fetch = originFetch;
    });

    it("Should call api mock", async () => {
        const mockedResponse = { json: jest.fn().mockResolvedValueOnce(teamsMock) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mockedResponse);
        global.fetch = mockedFetch;
        
        const { getByTestId } = render(<Home />);
        
        await waitFor(() => {
            expect(getByTestId('home')).toBeInTheDocument();
        })
    })
});