import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../RoutesTree/RoutesTree';
import SearchInput from '../SearchInput/SearchInput';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';

import { Background, ListContainer, TeamLead, TeamName } from './Team.styles';

const teamsApiUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/';
const usersApiUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/';

const Team = () => {
    const { id } = useParams();
    const [team, setTeam] = useState(undefined)

    const [teamLead, setTeamLead] = useState('');
    const [teamMembersToShow, setTeamMembersToShow] = useState([]);
    const [teamMembersData, setTeamMemberData] = useState([]);

    useEffect(() => {
        const getTeam = async () => {
            const response = await axios.get(`${teamsApiUrl}/${id}`);
            setTeam(response.data);
        };

        getTeam();
    }, []);

    useEffect(() => {
        const getUsersData = async () => {
            const teamMemberIds = [team.teamLeadId, ...team.teamMemberIds];
            const apiUrlsForTeamMembers = teamMemberIds.map((id) => usersApiUrl + id);

            const results = await Promise.all(apiUrlsForTeamMembers.map(async (apiUrl) => {
                const result = await axios.get(apiUrl);

                return result.data;
            }));

            setTeamMemberData(results);
            setTeamMembersToShow(results);
            const lead = results.find((user) => user.id === team.teamLeadId);
            setTeamLead(lead.displayName);
        }
        if (team) getUsersData();
    }, [team]);

    const updateTeamMembers = (newTeamMembers) => {
        setTeamMembersToShow(newTeamMembers);
    }

    return (
        <Background>
            <CssBaseline />
            <Container max-width='lg'>
                <Box sx={{ bgcolor: '#1a2027', height: '100vh', flexGrow: 1}}>
                    {teamMembersData.length > 0 &&
                        <SearchInput
                            data={teamMembersData}
                            dataProperty='displayName'
                            onChange={updateTeamMembers}
                            placeholder='Search for Member'
                        />
                    }
                    {team &&
                        <>
                            <ListContainer>
                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    <ListItem>
                                        <TeamName primary={`Team: ${team.name}`} />
                                    </ListItem>
                                    {teamMembersToShow.map((member, index) => {
                                        return (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={`${member.firstName} ${member.lastName}`}
                                                            src={member.avatarUrl}
                                                            sx={{ bgcolor: '#808080', color: '#000' }}
                                                        >
                                                            <AssignmentIndIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    {member.displayName === teamLead && <TeamLead primary={`${member.firstName} ${member.lastName}`} secondary='Team Lead' />}
                                                    {member.displayName !== teamLead && <ListItemText primary={`${member.firstName} ${member.lastName}`} secondary={null} />}
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </ListContainer>
                        </>
                    }
                    <Button component={Link} to='/' variant="outlined">Teams List</Button>
                </Box>
            </Container>
        </Background>
    );

}

export default Team;