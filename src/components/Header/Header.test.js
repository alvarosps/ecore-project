import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe("Header", () => {
    it('Should render Header', () => {
        const header = renderer.create(<Header />);
        
        expect(header.toJSON()).toMatchSnapshot()
    })
});