import React, { useEffect, useMemo, useState } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';
import SearchInput from '../SearchInput/SearchInput';
import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Background, TeamsGrid } from './Home.styles';

let pageSize = 18;
const teamsApiUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [teams, setTeams] = useState([]);
    const [teamsFromApi, setTeamsFromApi] = useState([]);

    const currentTeams = useMemo(() => {
        const firstPageIndex = (currentPage - 1)*pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return teams.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, teams]);

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }

    useEffect(() => {
        const getTeams = async () => {
            const teamsResponse = await axios.get(teamsApiUrl);

            setTeams(teamsResponse.data);
            setTeamsFromApi(teamsResponse.data);
        }

        getTeams();
    }, []);
 
    return (
        <Background>
            <CssBaseline />
            <Container max-width='lg'>
                <Box sx={{ bgcolor: '#1a2027;', height: '100vh', flexGrow: 1 }}>
                    <SearchInput
                        data={teamsFromApi}
                        dataProperty='name'
                        onChange={updateTeams}
                        placeholder='Search for Teams...'
                    />
                    <TeamsGrid
                        data-testid='home'
                        container spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {currentTeams.map((team, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Link
                                    key={index}
                                    to={`/teams/${team.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <TeamCard
                                        teamName={team.name}
                                    />
                                </Link>
                            </Grid>
                        ))}
                    </TeamsGrid>
                    <Pagination
                        className='pagination-bar'
                        currentPage={currentPage}
                        totalCount={teams.length}
                        pageSize={pageSize}
                        onPageChange={(page) => { setCurrentPage(page); }}
                    />
                </Box>
            </Container>
        </Background>
    )
}

export default Home;