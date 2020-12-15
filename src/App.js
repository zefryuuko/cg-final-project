import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'babylonjs-loaders';
import BabylonCanvas from './BabylonCanvas';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Levels
import LevelOne from './components/levels/LevelOne';

class App extends Component {
    state = {  }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <ul style={{color: "white"}}>
                        <li>Show Debugger: [</li>
                        <li>Hide Debugger: ]</li>
                        <li><Link to="/cg-final-project/">Load Main Menu</Link></li>
                        <li><Link to="/cg-final-project/level-1">Load Level 1</Link></li>
                    </ul>
                    <div className="AppContainer">
                        <BabylonCanvas/>
                        <Switch className="LevelContainer">
                            {/* <Route path="/"> */}
                                {/* Create main menu scene */}
                            {/* </Route> */}
                            <Route path="/cg-final-project/level-1">
                                <LevelOne/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
