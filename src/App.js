import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'babylonjs-loaders';
import BabylonCanvas from './BabylonCanvas';
import AddBlockModal from './components/uiElements/AddBlockModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Levels
import LevelOne from './components/levels/LevelOne';
import LevelTwo from './components/levels/LevelTwo';

class App extends Component {
    state = {  }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="AppContainer">
                        <BabylonCanvas/>
                        <Switch className="LevelContainer">
                            {/* <Route path="/"> */}
                                {/* Create main menu scene */}
                            {/* </Route> */}
                            <Route path="/cg-final-project/level-1">
                                <LevelOne/>
                            </Route>
                            <Route path="/cg-final-project/level-2">
                                <LevelTwo/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <AddBlockModal></AddBlockModal>
            </Router>
        )
    }
}

export default App;
