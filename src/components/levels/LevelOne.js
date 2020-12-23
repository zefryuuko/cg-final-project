import React, { Component } from 'react';
import ENVIRONMENT from '../gameObjects/_ENVIRONMENT';
import Globals from '../../Globals';

// Babylon Objects
import StoneBlock from '../gameObjects/StoneBlock';
import GrassBlock from '../gameObjects/GrassBlock';
import Character from '../gameObjects/Character';

// UI and Code Engine
import CodeEngine from '../codeEngine/CodeEngine';
import LevelTitle from '../uiElements/LevelTitle';
import LevelInstructions from '../uiElements/LevelInstructions';
import ObjectivePoint from '../gameObjects/ObjectivePoint';

class LevelOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            environmentSpawned: false
        }

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
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 99],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ]
        ]
        this.yOffset = 3;
        Globals.currentLevel = this;
    }

    componentDidMount() {
        
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
            case ENVIRONMENT.OBJECTIVE:
                return <ObjectivePoint posX={x} posY={y} posZ={z} yOffset={this.yOffset}/>;
            default:
                return <div></div>;
        }
    }

    render() {
        return (
            <div>
                {/* Level Details */}
                <div className="levelPanel">
                    <LevelTitle heading="Level One" subheading="The Basics"/>
                    <CodeEngine yOffset={this.yOffset}/>
                    <LevelInstructions>
                        <b>Welcome to your first level!</b><br/>
                        To complete this level, you need to walk the
                        character to the finish line using functions. 
                        To add a function, press the plus button above.
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
                <Character posX={0} posY={1} posZ={0} yOffset={this.yOffset} faceDirection={2}/>
                <button data-toggle="modal" data-target="#addBlockModal" className="btn btn-sm text-white btn-success mr-2">TEST ADD BLOCK MODAL</button>
            </div>
        )
    }
}

export default LevelOne
