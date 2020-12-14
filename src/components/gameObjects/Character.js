import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class Character extends Component {
    constructor(props) {
        super(props);
        this.object = undefined;
        this.meshes = undefined;
        
        this.xOffset = 0.25;
        this.yOffset = -0.5;
        this.zOffset = 0;

        this.animationSpeed = 0.5;  // Speed in seconds

        Globals.character = this;
    }
    
    componentDidMount = () => {
        this.createMesh();
        // this.initializeAnimations();
    }

    componentWillUnmount = () => {
        this.meshes.forEach(mesh => {
            mesh.dispose();
        });
    }

    createMesh = () => {
        // Read values from component props. Load default value if not defined.
        const posX = this.props.posX ? this.props.posX : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const posZ = this.props.posZ ? this.props.posZ : 0;

        // Load mesh
        this.object = BABYLON.SceneLoader.ImportMesh(
            "",
            "/assets/obj/",
            "character.glb",
            Globals.scene,
            (meshes) => {
                // Expose the meshes to the outside world
                this.meshes = meshes;

                // Modify mesh properties
                meshes.forEach(mesh => {
                    console.log(this.yOffset)
                    mesh.position = new BABYLON.Vector3(
                        posX + this.xOffset,
                        posY + this.yOffset,
                        posZ + this.zOffset
                    );
                    mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                });
            }
        );
    }

    moveCharacter = () => {
        this.meshes.forEach(mesh => {
            mesh.position.x += 1;
        });
    }
    
    render() {
        return (
            <div>
                <button onClick={this.moveCharacter}>PRESS ME DADDY</button>
            </div>
        )
    }
}

export default Character
