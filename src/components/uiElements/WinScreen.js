import React, { Component } from 'react'

class WinScreen extends Component {
    render() {
        return (
            <div className="winScreen">
                <h1>Level Passed!</h1>
                { this.props.children }
                <p>Congratulations! You passed the first level.</p>
                <button className="btn btn-lg btn-success">{this.props.buttonText ? this.props.buttonText : "Next Level"}</button>
            </div>
        )
    }
}

export default WinScreen
