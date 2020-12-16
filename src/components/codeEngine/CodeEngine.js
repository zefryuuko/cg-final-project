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
        // Create block 
        switch(blockType) {
            case "WALK":
                this.setState(prevState => {
                    return {
                        functions: prevState.functions.concat({
                            type: "WALK"
                        })
                    }
                });
                break;
            case "TURN":
                this.setState(prevState => {
                    return {
                        functions: prevState.functions.concat({
                            type: "TURN",
                            direction: "RIGHT"
                        })
                    }
                });
                break;
            default:
                console.error(`Unknown code block type: ${blockType}`);
                break;
        }
    }

    renderBlock = (blockMetadata, key) => {
        switch(blockMetadata.type) {
            case "WALK":
                return (
                    <div className="block function" key={key}>
                        Walk
                    </div>
                );
            default:
                return <div>Invalid data. Received {JSON.stringify(blockMetadata)}</div>;
        }
    }

    render = () => {
        return (
            <div className="codeEngine">
                {console.log(this.state.functions)}
                {
                    this.state.functions.map((data, index) => {
                        return this.renderBlock(data, index);
                    })
                }
                {/* <div className="block function">
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
                </div> */}
                <AddBlockButton targetParent={this}></AddBlockButton>
            </div>
        );
    }
}

export default CodeEngine;
