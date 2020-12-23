import React, { Component } from 'react';
import Globals from '../../Globals';
import DeleteBlockButton from '../uiElements/DeleteBlockButton';

class TurnBlock extends Component {
    onSelectionChange = (event) => {
        const { value } = event.target;
        Globals.codeEngine.updateBlock(
            this.props.parentIndex,
            this.props.index,
            { direction: value }
        );
    }

    render = () => {
        return (
            <div className="block function" index={this.props.index}>
                <DeleteBlockButton index={this.props.index} parentIndex={this.props.parentIndex}/>
                <p>Turn</p>
                <select className="form-control" value={this.props.direction} onChange={this.onSelectionChange}>
                    <option value="-1">Left</option>
                    <option value="1">Right</option>
                </select>
            </div>
        )
    }
}

export default TurnBlock
