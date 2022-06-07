/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 import { render, waitFor } from '@testing-library/react';
 import Team from './Team';
 import '@babel/polyfill';
 import { MemoryRouter } from 'react-router-dom';
 
 const teamMock = {
    "id": "7cf0d32d-036f-40b6-86ea-2473d4ccaecd",
    "name": "Surrounding Gold Pheasant",
    "teamLeadId": "51d8b058-8dbf-4b83-8a13-4fb0af125e08",
    "teamMemberIds": [
      "4e1e0fee-ccbc-4674-b346-4f66e2316779",
      "eb8a5b61-a9d4-4458-bb41-04f35b2295c8",
      "0720504a-1861-4671-ae52-6e011b15b858",
      "bf3f8f9c-487d-4021-ae9e-030349b3f17a",
      "456f439d-638d-40e8-86fe-d8a7c76404fb",
      "285617a2-39f1-44fd-9b8a-975795e48b8f",
      "0b3eacf7-4e40-4b2e-b98c-eab2e4d93505"
    ]
};
 
 describe("Team", () => {
     let originFetch;
 
     beforeEach(() => {
         originFetch = (global).fetch;
     });
 
     afterEach(() => {
         global.fetch = originFetch;
     });
 
     it("Should call api mock", async () => {
         const mockedResponse = { json: jest.fn().mockResolvedValueOnce(teamMock) };
         const mockedFetch = jest.fn().mockResolvedValueOnce(mockedResponse);
         global.fetch = mockedFetch;
         
         const { getByTestId } = render(<MemoryRouter><Team /></MemoryRouter>);
         
         await waitFor(() => {
             expect(getByTestId('team')).toBeInTheDocument();
         })
     })
 });