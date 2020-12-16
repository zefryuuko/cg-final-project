import React, { Component } from 'react';
import Globals from '../../Globals';

class AddBlockButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockCountLimit: null
        }
        this.targetParent = props.targetParent;
    }

    onButtonClicked = () => {
        // Set modal's target component to the passed props
        Globals.addBlockModal.targetParent = this.props.targetParent;
    }

    render = () => {
        return (
            <button 
                className="btnAddBlock" 
                data-toggle="modal"
                data-target="#addBlockModal"
                onClick={this.onButtonClicked}
            >
                +
            </button>
        )
    }
}

export default AddBlockButton
