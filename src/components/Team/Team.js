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

import { Background, ListContainer, TeamName } from './Team.styles';

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
        <Background>
            <CssBaseline />
            <Container max-width='lg'>
                <Box sx={{ bgcolor: '#1a2027', height: '100vh', flexGrow: 1}}>
                    {teamMembers.length > 0 &&
                        <SearchInput
                            data={teamMembers}
                            dataProperty='displayName'
                            onChange={updateTeamMembers}
                            placeholder='Search for Member'
                        />
                    }
                    {team &&
                        <>
                            <TeamName>Team: {team.name}</TeamName>
                            <ListContainer>
                                <List sx={{ width: '100%', maxWidth: 360 }}>
                                    {teamMembersToShow.map((member, index) => {
                                        if (member.displayName === teamLead) {
                                            return (
                                                <ListItem key={index} disablePadding>
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <AssignmentIndIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={member.displayName} secondary={null} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        } else {
                                            return (
                                                <ListItem key={index} disablePadding>
                                                    <ListItemButton>
                                                        <ListItemText primary={member.displayName} secondary={null} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        }
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