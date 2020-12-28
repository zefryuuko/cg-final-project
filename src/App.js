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
import LevelThree from './components/levels/LevelThree';
import LevelFour from './components/levels/LevelFour';

// Menus
import MainMenu from './components/levels/MainMenu';
import VictoryMenu from './components/levels/VictoryMenu';

class App extends Component {
    state = {  }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="AppContainer">
                        <BabylonCanvas/>
                        <Switch className="LevelContainer">
                            <Route path="/cg-final-project/" exact>
                                <MainMenu/>
                            </Route>
                            <Route path="/cg-final-project/level-1">
                                <LevelOne/>
                            </Route>
                            <Route path="/cg-final-project/level-2">
                                <LevelTwo/>
                            </Route>
                            <Route path="/cg-final-project/level-3">
                                <LevelThree/>
                            </Route>
                            <Route path="/cg-final-project/level-4">
                                <LevelFour/>
                            </Route>
                            <Route path="/cg-final-project/win">
                                <VictoryMenu/>
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
