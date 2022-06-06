import React, { useState, useMemo, createContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../../app';
import Team from '../Team/Team';

const DEFAULT_STATE = {
    state: {
        users: [],
        teams: []
    },
    setState: () => {}
};

export const AppContext = createContext(DEFAULT_STATE);

const RoutesTree = () => {
    const [state, setState] = useState(DEFAULT_STATE);
    const value = useMemo(
      () => ({ state, setState }),
      [state]
    );

    return (
        <AppContext.Provider value={value} >
            <Routes>
                <Route path={'/'} element={<App />} />
                <Route path='/teams/:id' element={<Team />} />
            </Routes>
        </AppContext.Provider>
    )
}

export default RoutesTree;