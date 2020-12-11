import React, { Component } from 'react';
import BabylonCanvas from './BabylonCanvas';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TestComponent from './TestComponent';


class App extends Component {
    state = {  }

    render() {
        return (
            <div className="App">
                <Navbar/>
                <div class="AppContainer">
                    <BabylonCanvas/>
                </div>
                <TestComponent posX="0" posY="0" posZ="0"/>
            </div>
        )
    }
}

export default App;
