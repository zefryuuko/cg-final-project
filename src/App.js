import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BabylonCanvas from './BabylonCanvas';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TestComponent from './TestComponent';


class App extends Component {
    state = {  }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="AppContainer">
                        <BabylonCanvas/>
                        <Link to="/level-1">Load Level 1</Link>
                    </div>
                    <Switch className="GameObjectContainer">
                        <Route path="/level-1">
                            <TestComponent/>
                        </Route>
                    </Switch>
                    {/* <TestComponent posX="0" posY="0" posZ="0"/> */}
                </div>
            </Router>
        )
    }
}

export default App;
