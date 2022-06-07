import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../../app';
import Team from '../Team/Team';

const RoutesTree = () => {

    return (
        <Routes>
            <Route path={'/'} element={<App />} />
            <Route path='/teams/:id' element={<Team />} />
        </Routes>
    )
}

export default RoutesTree;