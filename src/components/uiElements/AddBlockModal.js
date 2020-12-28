import React, { Component } from 'react';
import Globals from '../../Globals';

class AddBlockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBlockType: null,
            allowedBlockTypes: []
        }
        this.parentBlockIndex = -1;

        Globals.addBlockModal = this;

        // Bind functions
        this.onChangeSelection = this.onChangeSelection.bind(this);
    }

    onChangeSelection = (event) => {
        this.setState({
            selectedBlockType: event.target.id
        }, () => { this.forceUpdate() });
    }

    resetSelectedBlockType = (event) => {
        this.setState({
            selectedBlockType: null
        });
    }

    onAddButtonClicked = () => {
        console.log(`Adding ${this.state.selectedBlockType} block`);
        Globals.codeEngine.addBlock(this.state.selectedBlockType, this.parentBlockIndex);
        this.resetSelectedBlockType();
    }

    updateAllowedBlockTypes(blockTypesArray) {
        this.setState({
            allowedBlockTypes: blockTypesArray
        });
    }

    render() { 
        return (
            <div id="addBlockModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Add Function</h4>                        </div>
                        <div className="modal-body">
                            <form>
                                <ul className="list-group">
                                    {
                                        this.state.allowedBlockTypes.includes("WALK") ?
                                        <li className={`list-group-item list-group-item-primary ${this.state.selectedBlockType === "WALK" ? "active" : null}`} 
                                            id="WALK" 
                                            onClick={this.onChangeSelection}
                                        >
                                        <b>Walk</b><br/>
                                        Move the character one block towards the direction its facing
                                        </li>
                                        : null
                                    }
                                    {
                                        this.state.allowedBlockTypes.includes("TURN") ?
                                        <li className={`list-group-item list-group-item-primary ${this.state.selectedBlockType === "TURN" ? "active" : null}`} 
                                            id="TURN" 
                                            onClick={this.onChangeSelection}
                                        >
                                        <b>Turn</b><br/>
                                        Rotate the character to the left or right
                                        </li>
                                        : null
                                    }
                                    {                    
                                        this.state.allowedBlockTypes.includes("LOOP") ?                
                                        <li className={`list-group-item list-group-item-warning ${this.state.selectedBlockType === "LOOP" ? "active" : null}`} 
                                            id="LOOP" 
                                            onClick={this.onChangeSelection}
                                        >
                                        <b>Loop</b><br/>
                                        Run a set of functions in a loop
                                        </li>
                                        : null
                                    }
                                    {
                                        this.state.allowedBlockTypes.includes("IF") ?
                                        <li className={`list-group-item list-group-item-danger ${this.state.selectedBlockType === "IF" ? "active" : null}`} 
                                            id="IF" 
                                            onClick={this.onChangeSelection}
                                        >
                                        <b>If</b><br/>
                                        Run a set of functions if a certain condition is met
                                        </li> 
                                        : null
                                    }
                                </ul>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" className="btn btn-success" 
                                data-dismiss="modal"
                                disabled={this.state.selectedBlockType === null}
                                onClick={this.onAddButtonClicked}
                            >
                                Add
                            </button>
                            <button 
                                type="button" className="btn btn-light" data-dismiss="modal" 
                                onClick={this.resetSelectedBlockType}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBlockModal
