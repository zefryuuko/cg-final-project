import React, { Component } from 'react';
import Globals from '../../Globals';

class AddBlockButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockCountLimit: null
        }
    }

    onButtonClicked = () => {
        // Set the modal's parent index reference
        Globals.addBlockModal.parentBlockIndex = this.props.parentBlockIndex;
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
