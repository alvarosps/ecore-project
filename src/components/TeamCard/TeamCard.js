import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
    display: block;
    margin: 5px;
    border: 1px solid black;
    text-align: center;
    height: auto;
    width: 30%;
`;

const TeamCard = ({ teamName }) => {
    return (
        <Card>
            {teamName}
        </Card>
    )
}

TeamCard.propTypes = {
    teamName: PropTypes.string.isRequired
}

export default TeamCard;