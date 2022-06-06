import React from 'react';
import PropTypes from 'prop-types';

import { Card } from './TeamCard.styles';

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