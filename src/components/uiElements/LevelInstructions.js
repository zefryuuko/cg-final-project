import React, { Component } from 'react';

class LevelInstructions extends Component {
    render = () => {
        return (
            <div className="instructionsPanel">
                <div className="instructionsHeading">
                    Instructions
                </div>
                <p>{this.props.children}</p>
            </div>
        )
    }
}

export default LevelInstructions
