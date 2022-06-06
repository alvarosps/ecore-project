import React, { useContext, useEffect, useMemo, useState } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import styled from 'styled-components';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';
import SearchInput from '../SearchInput/SearchInput';
import { Link } from 'react-router-dom';
import { AppContext } from '../RoutesTree/RoutesTree';

const TeamsList = styled.div`
    display: flex;
    flex-direction: column;
`

let pageSize = 10;
const teamsApiUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/';
const usersApiUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/';

const Home = () => {
    const { state, setState } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [teams, setTeams] = useState([]);
    const [teamsFromApi, setTeamsFromApi] = useState([]);
    const [users, setUsers] = useState([]);

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
            const response = await axios.get(teamsApiUrl);
            
            setState((prevState) => ({
                teams: response.data,
                users: prevState.users
            }));
            setTeams(response.data);
            setTeamsFromApi(response.data);
        }

        const getUsers = async () => {
            const response = await axios.get(usersApiUrl);

            setState((prevState) => ({
                teams: prevState.teams,
                users: response.data
            }));
            setUsers(response.data);
        }

        getTeams();
        getUsers();
    }, [])
 
    return (
        <>
            <SearchInput
                data={teamsFromApi}
                dataProperty='name'
                onChange={updateTeams}
            />
            <TeamsList>
                {currentTeams.map((team, index) => {
                    return (
                        <Link
                            key={index}
                            to={`/teams/${team.id}`}
                        >
                            <TeamCard
                                teamName={team.name}
                            />
                        </Link>
                    )
                })}
            </TeamsList>
            <Pagination
                className='pagination-bar'
                currentPage={currentPage}
                totalCount={teams.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    )
}

export default Home;