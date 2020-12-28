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
        Globals.addBlockModal.updateAllowedBlockTypes(Globals.currentLevel.allowedBlocks);
    }

    render = () => {
        let parentAddBlock = this.props.parent ? "parentAddBlock" : null;
        let isBlockLimitReached = this.props.blockCount >= this.props.blockCountLimit
        return (
            <button 
                className={`btnAddBlock ${parentAddBlock} ${this.props.className}`}
                data-toggle="modal"
                data-target="#addBlockModal"
                onClick={this.onButtonClicked}
                disabled={this.props.disabled || isBlockLimitReached }
            >
                +
                {
                    this.props.blockCountLimit > 0 ? ` (${this.props.blockCountLimit - this.props.blockCount} left)` : null
                }
            </button>
        )
    }
}

export default AddBlockButton
