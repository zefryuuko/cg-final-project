import React, { Component } from 'react'
import AddBlockButton from '../uiElements/AddBlockButton';

class CodeEngine extends Component {
    constructor(props) {
        super(props);
        // const { allowedFunctions, level } = props;
        this.state = {
            functions: [],
            isRunning: false
        }

        // Block types enum
        this.CODE_BLOCK_TYPE = Object.freeze({
            WALK: 0,
            TURN: 1,
            IF: 2,
            LOOP: 3
        });
    }

    componentDidMount = () => {

    }

    startSimulation = () => {

    }

    addBlock = (blockType) => {

    }

    render = () => {
        return (
            <div className="codeEngine">
                <div className="block function">
                    function
                </div>
                <div className="block if">
                    if
                    <AddBlockButton></AddBlockButton>
                </div>
                <div className="block loop">
                    loop
                    <div className="block function">
                        function
                    </div>
                    <AddBlockButton></AddBlockButton>
                </div>
                <div className="block if">
                    if
                    <div className="block loop">
                        loop
                        <div className="block function">
                            function
                        </div>
                        <AddBlockButton></AddBlockButton>
                    </div>
                    <AddBlockButton></AddBlockButton>
                </div>
                <AddBlockButton></AddBlockButton>
            </div>
        );
    }
}

export default CodeEngine;
