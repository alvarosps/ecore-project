import React from 'react';
import renderer from 'react-test-renderer';
import TeamCard from './TeamCard';

describe("TeamCard", () => {
    it('Should render a TeamCard', () => {
        const teamCard = renderer.create(<TeamCard teamName='test' />);
        
        expect(teamCard.toJSON()).toMatchSnapshot()
        expect(teamCard.toJSON().children[0]).toEqual('test');
    })
});