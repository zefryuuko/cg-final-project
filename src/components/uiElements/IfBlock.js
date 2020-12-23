import React, { Component } from 'react';
import Globals from '../../Globals';
import AddBlockButton from './AddBlockButton';
import DeleteBlockButton from './DeleteBlockButton';

class IfBlock extends Component {
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

    onOperatorChange = (event) => {
        const { value } = event.target;

        // Update value on CodeEngine
        Globals.codeEngine.updateBlock(
            this.props.parentIndex,
            this.props.index,
            { operator: value }
        );        
    }

    onLeftOperandChange = (event) => {
        const { value } = event.target;

        // Update value on CodeEngine
        Globals.codeEngine.updateBlock(
            this.props.parentIndex,
            this.props.index,
            { leftOperand: value }
        );        
    }

    onRightOperandChange = (event) => {
        const { value } = event.target;

        // Update value on CodeEngine
        Globals.codeEngine.updateBlock(
            this.props.parentIndex,
            this.props.index,
            { rightOperand: value }
        );        
    }

    render = () => {
        return (
            <div className="block if" index={this.props.index}>
                <DeleteBlockButton index={this.props.index} parentIndex={this.props.parentIndex} disabled={this.props.disabled}/>
                <p>If</p>
                <div className="options">
                    <select className="form-control operand" name="leftOperand" value={this.props.leftOperand} onChange={this.onLeftOperandChange} disabled={this.props.disabled}>
                        {
                            Globals.codeEngine.ifBlockLeftOperandSelection.map((option, idx) => {
                                return (
                                    <option value={option.id} key={idx}>{option.uiText}</option>
                                );
                            })
                        }
                    </select>
                    <select className="form-control operator" name="operator" value={this.props.operator} onChange={this.onOperatorChange} disabled={this.props.disabled}>
                        <option value="EQUALS">=</option>
                        <option value="NOT_EQUALS">!=</option>
                    </select>
                    <select className="form-control operand" name="rightOperand" value={this.props.rightOperand} onChange={this.onRightOperandChange} disabled={this.props.disabled}>
                        {
                            Globals.codeEngine.ifBlockRightOperandSelection.map((option, idx) => {
                                return (
                                    <option value={option.id} key={idx}>{option.uiText}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="children">
                    {
                        this.currentBlockChildren.map((data, key) => {
                            return Globals.codeEngine.renderBlock(data, key, `${this.props.parentIndex} ${this.props.index}`);
                        })
                    }
                </div>
                <AddBlockButton parentBlockIndex={`${this.props.parentIndex} ${this.props.index}`} disabled={this.props.disabled}/>
            </div>
        )
    }
}

export default IfBlock;
