import React, { Component } from 'react';
import Globals from '../../Globals';

class AddBlockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBlockType: null
        }
        this.targetParent = undefined;

        Globals.addBlockModal = this;
    }

    onChangeSelection = (event) => {
        this.setState({
            selectedBlockType: event.target.value
        });
    }

    onCancelClicked = (event) => {
        this.setState({
            selectedBlockType: null
        });
    }

    onAddButtonClicked = () => {
        console.log(`Adding ${this.state.selectedBlockType} block`);
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
                                <input 
                                    type="radio"
                                    value="WALK"
                                    checked={this.state.selectedBlockType === "WALK"}
                                    onChange={this.onChangeSelection}
                                />
                                <label>Walk</label>
                                <input 
                                    type="radio"
                                    value="TURN"
                                    checked={this.state.selectedBlockType === "TURN"}
                                    onChange={this.onChangeSelection}
                                />
                                <label>Turn</label>
                                <input
                                    type="radio"
                                    value="LOOP"
                                    checked={this.state.selectedBlockType === "LOOP"}
                                    onChange={this.onChangeSelection}
                                />
                                <label>Loop</label>
                                <input 
                                    type="radio"
                                    value="IF"
                                    checked={this.state.selectedBlockType === "IF"}
                                    onChange={this.onChangeSelection}
                                />
                                <label>If</label>
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
                                onClick={this.onCancelClicked}
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
