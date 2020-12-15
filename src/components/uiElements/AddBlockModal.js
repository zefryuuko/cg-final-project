import React, { Component } from 'react';

class AddBlockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBlockType: null
        }
    }

    render() { 
        return (
            <div id="addBlockModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Add Function</h4>
                            <button type="button" className="close" data-dismiss="modal"aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            lmao modal content here
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBlockModal
