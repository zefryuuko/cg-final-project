import React, { Component } from 'react'
import ENVIRONMENT from '../gameObjects/_ENVIRONMENT';
import TestComponent from '../../TestComponent';
import StoneBlock from '../gameObjects/StoneBlock';
import GrassBlock from '../gameObjects/GrassBlock';

class LevelOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            environmentSpawned: false
        }

        // level[y][x][z]
        this.level = [ 
            [   // First Layer
                [0, 1, 1, 1, 0],
                [1, 1, 1, 1, 1],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1],
                [0, 1, 1, 1, 0],
            ],
            [   // Second
                [0, 0, 2, 0, 0],
                [0, 2, 0, 2, 0],
                [2, 0, 0, 0, 2],
                [0, 2, 0, 2, 0],
                [0, 0, 2, 0, 0],
            ]
        ]
        this.yOffset = 1;
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
            default:
                return <div></div>;
        }
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default LevelOne
