import React, { Component } from 'react'
import Globals from '../../Globals';
import _ENVIRONMENT from '../gameObjects/_ENVIRONMENT';

import AddBlockButton from '../uiElements/AddBlockButton';
import WalkBlock from '../uiElements/WalkBlock';
import LoopBlock from '../uiElements/LoopBlock';

class CodeEngine extends Component {
    constructor(props) {
        super(props);
        // const { allowedFunctions, level } = props;
        this.state = {
            functions: [],
            hasBlockCountLimit: false,
            blockCountLimit: -1,
            isRunning: false
        }

        // Block types enum
        this.CODE_BLOCK_TYPE = Object.freeze({
            WALK: 0,
            TURN: 1,
            IF: 2,
            LOOP: 3
        });

        // Reference current CodeEngine instance to globals
        Globals.codeEngine = this;
    }

    componentDidMount = () => {

    }

    startSimulation = (functions) => {
        this.simulate(this.state.functions).then((runSuccessfuly) => {
            if (!runSuccessfuly) {
                // Reset to its original state
                console.error("Simulation failed");
            } else {
                console.log("Simulation ran successfuly.");
                // Transition to the next scene
            }
        });
    }

    simulate = async (parent) => {
        // Run actions based on the user input
        for (let block of parent) {
            switch(block.type) {
                case "WALK":
                    if (!await this.walk()) return false;
                    break;
                case "TURN":
                    if (!await this.turn(block.direction)) return false;
                    break;
                case "LOOP":
                    if (!await this.loop(block)) return false;
                    break;
                default:
                    console.error(`Invalid block type. Received ${block.type}`);
                    return false;
            }

            // Do not add any execution delay if the current block is loop
            if (block.type !== "LOOP") await this.delayAction(1000);
            
            // Check if the player has reached the final position
        }

        // Check if the player has reached the final position
        return true;
    }

    delayAction(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    hasReachedGoal = () => {
        // Check if the player has reached the final position
    }

    walk = async () => {
        // Va;odate if the player can move forward
        let targetX = Globals.character.mesh.position.x;
        let targetZ = Globals.character.mesh.position.z;

        switch(Globals.character.characterFaceDirection) {
            case 0: // Z-
                targetZ -= 1;
                break;
            case 1:  // X-
                targetX -= 1;
                break;
            case 2: // Z+
                console.log("case 2")
                targetZ += 1;
                break;
            case 3: // X+
                console.log("case 3")
                targetX += 1;
                break;
            default:
                break;
        }

        if (targetX < 0 || targetX > 4) return false;
        if (targetZ < 0 || targetZ > 4) return false;
        const targetBlockType = Globals.currentLevel.level[Globals.currentLevel.yOffset][targetX][targetZ];
        if (!_ENVIRONMENT.WALKABLE_BLOCKS.includes(targetBlockType)) return false;

        // Send the command to move forward.
        // Return true tells the recursive funciton to contunue running.
        Globals.character.walk();
        return true;
    }

    turn = async (direction) => {
        switch(direction) {
            case 1: // Turn right
                Globals.character.turnRight();
                break;
            case 2: // Turn left
                Globals.character.turnLeft();
                break;
            default:
                console.error(`Invalid turn direction. Received ${direction}`);
                break;
        }
    }

    loop = async (parentBlock) => {
        for(let i = 0; i < parentBlock.loopCycles; i++) {
            if (!await this.simulate(parentBlock.children)) return false;
        }
        return true;
    }

    getParentRef = (functionsArray, parentIndexString) => {
        const indexes = parentIndexString.split(" ").map(i => +i);
        let currentParentRef = undefined;
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] === -1) {
                currentParentRef = functionsArray;
            } else {
                currentParentRef = currentParentRef[indexes[i]].children;
            }
        }
        return currentParentRef;
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

                // Get the reference to the parent block
                // Determines where the new objecrt is placed
                let blockParentRef = this.getParentRef(newFunctions, parentIndex);

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
                            loopCycles: 2,
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
    }

    updateBlock = (parentIndex, blockIndex, newState) => {
        console.log(`Removing index ${blockIndex} from ${parentIndex}`);
        this.setState(
            prevState => {
                // Duplicate the state to another variable
                // Stringify and reparse JSON to do deep copy of nested objects
                let newFunctions = JSON.parse(
                    JSON.stringify(prevState.functions)
                );

                let blockParentRef = this.getParentRef(newFunctions, parentIndex);
                
                // Update block with the passed key value pair(s)
                Object.keys(newState).forEach((key) => {
                    blockParentRef[blockIndex][key] = newState[key];
                });
                
                // Return the new functions array
                return {
                    functions: newFunctions
                }
            },
            () => {
                this.forceUpdate();
            }
        )
    }

    deleteBlock = (parentIndex, blockIndex) => {
        console.log(`Removing index ${blockIndex} from ${parentIndex}`);
        this.setState(
            prevState => {
                // Duplicate the state to another variable
                // Stringify and reparse JSON to do deep copy of nested objects
                let newFunctions = JSON.parse(
                    JSON.stringify(prevState.functions)
                );

                let blockParentRef = this.getParentRef(newFunctions, parentIndex);
                
                blockParentRef.splice(blockIndex, 1);

                // Return the new functions array
                return {
                    functions: newFunctions
                }
            },
            () => {
                this.forceUpdate();
            }
        )
    }

    renderBlock = (blockMetadata, key, parentIndex) => {
        switch(blockMetadata.type) {
            case "WALK":
                return (
                    <WalkBlock key={key} index={key} parentIndex={parentIndex}/>
                );
            case "LOOP":
                return (
                    <LoopBlock 
                        key={key}
                        index={key}
                        parentIndex={parentIndex}
                        loopCycles={blockMetadata.loopCycles}
                    />
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
