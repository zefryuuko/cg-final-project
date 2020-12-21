import React, { Component } from 'react';
import Globals from '../../Globals';
import AddBlockButton from './AddBlockButton';
import DeleteBlockButton from './DeleteBlockButton';

class LoopBlock extends Component {
    constructor(props) {
        super(props);
        this.updateChildReference();
    }
    
    componentDidUpdate = () => {
        this.updateChildReference();
    }
    
    updateChildReference = () => {
        // Retrieve functions array reference from index props
        const indexes = this.props.parentIndex.split(" ").map(i => +i);
        let currentParentRef = undefined;
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] === -1) {
                currentParentRef = Globals.codeEngine.state.functions;
            } else {
                if (!currentParentRef[indexes[i]]) return;
                currentParentRef = currentParentRef[indexes[i]].children;
            }
        }

        if (!currentParentRef[this.props.index]) return;
        this.currentBlockChildren = currentParentRef[this.props.index].children;
    }

    render = () => {
        return (
            <div className="block loop" index={this.props.index}>
                <DeleteBlockButton index={this.props.index} parentIndex={this.props.parentIndex}/>
                <p>Loop [n] times</p>
                <div className="children">
                    {
                        this.currentBlockChildren.map((data, key) => {
                            return Globals.codeEngine.renderBlock(data, key, `${this.props.parentIndex} ${this.props.index}`);
                        })
                    }
                </div>
                <AddBlockButton parentBlockIndex={`${this.props.parentIndex} ${this.props.index}`}/>
            </div>
        )
    }
}

export default LoopBlock
