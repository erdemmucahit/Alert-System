import React from 'react';

import './App.css';
import Myform from './components/myform';
import GetAlerts from './components/getAlerts';
import GetGraphic from "./components/getGraphic";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Router>
                <Route exact path="/" component={
                    Myform
                }/>
                <Route exact path="/" component={
                    GetAlerts
                }/>
                <Route path="/alertlist/:id" component={
                    GetGraphic
                }/>
            </Router>
        </div>
    );
}


export default App;
