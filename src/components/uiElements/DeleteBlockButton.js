import React, { Component } from 'react';
import Globals from '../../Globals';

class DeleteBlockButton extends Component {
    onButtonClicked = () => {
        const deleteConfirmed = window.confirm("Are you sure you want to delete this function?");
        if (deleteConfirmed) Globals.codeEngine.deleteBlock(this.props.parentIndex, this.props.index);
    }

    render = () => {
        return (
            <button 
                className="btnDeleteBlock"
                onClick={this.onButtonClicked}
            >
                -
            </button>
        )
    }
}

export default DeleteBlockButton
