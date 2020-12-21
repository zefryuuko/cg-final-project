import React, { Component } from 'react';
import DeleteBlockButton from '../uiElements/DeleteBlockButton';

class WalkBlock extends Component {
    render = () => {
        return (
            <div className="block function" index={this.props.index}>
                <DeleteBlockButton index={this.props.index} parentIndex={this.props.parentIndex}/>
                <p>Walk</p>
            </div>
        )
    }
}

export default WalkBlock
