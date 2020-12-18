import React, { Component } from 'react'
import Globals from '../../Globals';

import AddBlockButton from '../uiElements/AddBlockButton';
import WalkBlock from '../uiElements/WalkBlock';
import LoopBlock from '../uiElements/LoopBlock';

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

        // Reference current CodeEngine instance to global
        Globals.codeEngine = this;
    }

    componentDidMount = () => {

    }

    startSimulation = (functions) => {
        // Use root functions array parameter is not passed
        functions = functions ? functions : this.state.functions;

        for (let i = 0; i < functions.length; i++) {
            setTimeout(
                () => {
                    console.log(`Calling action: ${functions[i].type}`)
                    switch(functions[i].type) {
                        case "WALK":
                            Globals.character.walk();
                            break;
                        default:
                            break;
                    }
                },
                1000 * i
            );
        }
    }

    addBlock = (blockType, parentIndex) => {
        console.log(`Adding ${blockType} to ${parentIndex}`);
        this.setState(
            prevState => {
                // Duplicate the state to another variable
                // Stringify and reparse JSON to do deep copy of nested objects
                let newFunctions = JSON.parse(
                    JSON.stringify(prevState.functions)
                );
                console.log(parentIndex)

                const indexes = parentIndex.split(" ").map(i => +i);
                let currentParentRef = undefined;
                for (let i = 0; i < indexes.length; i++) {
                    if (indexes[i] === -1) {
                        currentParentRef = newFunctions;
                    } else {
                        currentParentRef = currentParentRef[indexes[i]].children;
                    }
                }
        
                let blockParentRef = currentParentRef;
                
                // Reference the parent of the new block. Use root functions array if -1 is passed
                // let blockParentRef = parentIndex === -1 ? newFunctions : newFunctions[parentIndex].children;

                // Add the new block to the parent block
                switch(blockType) {
                    case "WALK":
                        blockParentRef.push({
                            type: "WALK"
                        });
                        break;
                    case "TURN":
                        blockParentRef.push({
                            type: "TURN",
                            direction: 1    // 1: left, -1: right
                        });
                        break;
                    case "LOOP":
                        blockParentRef.push({
                            type: "LOOP",
                            loopCycles: 1,
                            children: []
                        });
                        break;
                    default:
                        console.error(`Unknown code block type: ${blockType}`);
                        break; 
                }

                // Return the new functions array
                return {
                    functions: newFunctions
                }
            },
            () => {
                this.forceUpdate();
            }
        )

        // Create block 
        // switch(blockType) {
        //     case "WALK":
        //         this.setState(prevState => {
        //             return {
        //                 functions: prevState.functions.concat({
        //                     type: "WALK"
        //                 })
        //             }
        //         });
        //         break;
        //     case "TURN":
        //         this.setState(prevState => {
        //             return {
        //                 functions: prevState.functions.concat({
        //                     type: "TURN",
        //                     direction: "LEFT"
        //                 })
        //             }
        //         });
        //         break;
        //     case "LOOP":
        //         this.setState(prevState => {
        //             return {
        //                 functions: prevState.functions.concat({
        //                     type: "LOOP",
        //                     loopCycles: 1,
        //                     children: []
        //                 })
        //             }
        //         });
        //         break;
        //     default:
        //         console.error(`Unknown code block type: ${blockType}`);
        //         break;
        // }
    }

    renderBlock = (blockMetadata, key, parentIndex) => {
        switch(blockMetadata.type) {
            case "WALK":
                return (
                    <WalkBlock key={key} index={key} parentIndex={parentIndex}/>
                );
            case "LOOP":
                return (
                    <LoopBlock key={key} index={key} parentIndex={parentIndex}/>
                );
            default:
                return <div>Invalid data. Received {JSON.stringify(blockMetadata)}</div>;
        }
    }

    render = () => {
        console.log(this.state.functions);
        return (
            <div className="codeEngine">
                {
                    this.state.functions.map((data, key) => {
                        return this.renderBlock(data, key, "-1");
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
                <AddBlockButton parentBlockIndex="-1"/>
                <button onClick={() => {this.startSimulation()}}>Start Simulation</button>
            </div>
        );
    }
}

export default CodeEngine;
