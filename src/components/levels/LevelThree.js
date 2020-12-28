import React, { Component } from 'react';
import ENVIRONMENT from '../gameObjects/_ENVIRONMENT';
import Globals from '../../Globals';

// Babylon Objects
import StoneBlock from '../gameObjects/StoneBlock';
import GrassBlock from '../gameObjects/GrassBlock';
import PathBlock from '../gameObjects/PathBlock';
import TreeOne from '../gameObjects/TreeOne';
import TreeTwo from '../gameObjects/TreeTwo';
import RockOne from '../gameObjects/RockOne';
import RockTwo from '../gameObjects/RockTwo';
import Campfire from '../gameObjects/Campfire';
import Tent from '../gameObjects/Tent';
import Fence from '../gameObjects/Fence';
import Character from '../gameObjects/Character';

// UI and Code Engine
import CodeEngine from '../codeEngine/CodeEngine';
import LevelTitle from '../uiElements/LevelTitle';
import LevelInstructions from '../uiElements/LevelInstructions';
import ObjectivePoint from '../gameObjects/ObjectivePoint';

class LevelThree extends Component {
    constructor(props){
        super(props);
        this.state = {
            environmentSpawned: false
        }

        // Update allowed functions
        this.allowedBlocks = ["WALK", "TURN", "LOOP"];
        this.blockCountLimit = 4;

        // level[y][x][z]
        this.level = [ 
            [   // First Layer
                [0, 0, 1, 0, 0],
                [0, 1, 1, 1, 0],
                [1, 1, 1, 1, 1],
                [0, 1, 1, 1, 0],
                [0, 0, 1, 0, 0],
            ],
            [   // Second Layer
                [0, 1, 1, 1, 0],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [0, 1, 1, 1, 0],
            ],
            [   // ...
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
            ],
            [
                [1, 1, 1, 1, 1],
                [3, 3, 3, 1, 1],
                [2, 2, 3, 2, 1],
                [3, 3, 3, 2, 2],
                [2, 2, 2, 2, 2],
            ],
            [
                [2, 2, 1, 1, 1],
                [0, 0, 0, 2, 1],
                [10, 13, 0, 0, 2],
                [99, 0, 0, 19, 17],
                [0, 11, 0, 0, 0],
            ],
            [
                [0, 0, 2, 2, 2],
                [0, 0, 0, 12, 2],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ]

        ]
        this.yOffset = 3;
        Globals.currentLevel = this;
    }

    componentDidMount() {
        Globals.babylonCanvas.enableCameraControl();
    }

    spawnEnvironmentItem(x, y, z, type) {
        // Apply y spawn offset
        y -= this.yOffset;

        switch(type) {
            case ENVIRONMENT.NONE:
                return <div></div>
            case ENVIRONMENT.STONE:
                return <StoneBlock posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.GRASS:
                return <GrassBlock posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.PATH:
                return <PathBlock posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.OBJECTIVE:
                return <ObjectivePoint posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.TREE_1:
                return <TreeOne posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.TREE_2:
                return <TreeTwo posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.ROCK_1:
                return <RockOne posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.ROCK_2:
                return <RockTwo posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.CAMPFIRE:
                return <Campfire posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.TENT:
                return <Tent posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            case ENVIRONMENT.FENCE:
                return <Fence posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            default:
                return <div></div>;
        }
    }

    render() {
        return (
            <div>
                {/* Level Details */}
                <div className="levelPanel">
                    <LevelTitle heading="Level Three" subheading="Nested Loops"/>
                    <CodeEngine yOffset={this.yOffset} blockCountLimit={this.blockCountLimit} nextLevel="/cg-final-project/level-4"/>
                    <LevelInstructions>
                        <b>A loop inside of a loop</b><br/>
                        The loop function allows you to run any functions multiple times, 
                        including the loop function itself. It allows you to create complex
                        tasks using less functions. 
                        In this level, you are only allowed to use four functions.
                    </LevelInstructions>
                </div>

                {/* Spawn map environment */}
                {
                    // Spawn the map according to this.level
                    this.level.map((yData, yIndex) => {
                        return <div className={`env_y_${yIndex}`} key={yIndex}> {
                            yData.map((xData, xIndex) => {
                                return <div className={`env_x_${xIndex}`} key={xIndex}> {
                                    xData.map((zData, zIndex) => {
                                        return <div className={`env_z_${zIndex}`} key={zIndex}> {
                                            this.spawnEnvironmentItem(
                                                xIndex, yIndex, zIndex, zData
                                            )
                                        } </div>
                                    })
                                } </div>
                            })
                        } </div>
                    })
                }

                {/* Spawn player object */}
                <Character posX={1} posY={1} posZ={0} yOffset={this.yOffset} faceDirection={2}/>
            </div>
        )
    }
}

export default LevelThree
