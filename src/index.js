import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesTree from "./components/RoutesTree/RoutesTree";
import Header from "./components/Header/Header";
 
 ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />
            <RoutesTree />
        </Router>
    </React.StrictMode>,
    document.getElementById('app')
);