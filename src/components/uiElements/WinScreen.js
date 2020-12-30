import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WinScreen extends Component {
    render() {
        return (
            <div className="winScreen">
                <h1>Level Passed!</h1>
                { this.props.children}
                <p>Congratulations! You passed the level.</p>
                <Link to={this.props.nextLevel} className="btn btn-lg btn-success">{this.props.buttonText ? this.props.buttonText : "Next Level"}</Link>
            </div>
        )
    }
}

export default WinScreen
