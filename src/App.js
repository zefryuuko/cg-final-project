import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'babylonjs-loaders';
import BabylonCanvas from './BabylonCanvas';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Levels
import LevelOne from './components/levels/LevelOne';

// import TestComponent from './TestComponent';


class App extends Component {
    state = {  }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="AppContainer">
                        <BabylonCanvas/>
                        <Link to="/cg-final-project/">Load Main Menu</Link>
                        <Link to="/cg-final-project/level-1">Load Level 1</Link>
                    </div>
                    <Switch className="GameObjectContainer">
                        {/* <Route path="/"> */}
                            {/* Create main menu scene */}
                        {/* </Route> */}
                        <Route path="/cg-final-project/level-1">
                            <LevelOne/>
                        </Route>
                    </Switch>
                    {/* <TestComponent posX="0" posY="0" posZ="0"/> */}
                </div>
            </Router>
        )
    }
}

export default App;
