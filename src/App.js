import React, { Component } from 'react';
import BabylonCanvas from './BabylonCanvas';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
    state = {  }
  
    render() {
        return (
            <div className="App">
                <Navbar/>
                <BabylonCanvas/>
            </div>
        )
    }
}

export default App;
