import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesTree from "./components/RoutesTree/RoutesTree";
import Header from "./components/Header/Header";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <RoutesTree />
        </Router>
    </React.StrictMode>
);