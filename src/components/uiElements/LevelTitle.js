import React, { Component } from 'react';

class LevelTitle extends Component {
    render() {
        return (
            <div className="titlePanel">
                <h1>{this.props.heading}</h1>
                <p>{this.props.subheading}</p>
            </div>
        )
    }
}

export default LevelTitle
