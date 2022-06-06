import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../RoutesTree/RoutesTree';
import SearchInput from '../SearchInput/SearchInput';

const teamsApiUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/';

const Team = () => {
    const { id } = useParams();
    const { state, setState } = useContext(AppContext);
    const [team, setTeam] = useState(undefined)

    const [teamLead, setTeamLead] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamMembersToShow, setTeamMembersToShow] = useState([]);

    useEffect(() => {
        const getTeam = async () => {
            const response = await axios.get(`${teamsApiUrl}/${id}`);
            setTeam(response.data);
        };

        getTeam();
    }, []);

    useEffect(() => {
        if (team) {
            const lead = state.users.find((user) => user.id === team.teamLeadId);
            setTeamLead(lead.displayName);
            const members = state.users.filter((user) => team.teamMemberIds.includes(user.id));
            setTeamMembers([lead, ...members]);
            setTeamMembersToShow([lead, ...members]);
        }
    }, [team]);

    const updateTeamMembers = (newTeamMembers) => {
        setTeamMembersToShow(newTeamMembers);
    }

    return (
        <>
            {teamMembers.length > 0 &&
                <SearchInput
                    data={teamMembers}
                    dataProperty='displayName'
                    onChange={updateTeamMembers}
                />
            }
            {team && <div>
                <div>Team: {team.name}</div>
                <div>
                    <span>Members:</span>
                    {teamMembersToShow.map((member, index) => {
                        if (member.displayName === teamLead) {
                            return (
                                <div key={index}>Team Lead: {member.displayName}</div>
                            );
                        } else {
                            return (
                                <div key={index}>{member.displayName}</div>
                            );
                        }
                    })}
                </div>
            </div>}
            <Link to='/'>Teams List</Link>
        </>
    );

}

export default Team;