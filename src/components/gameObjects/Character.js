import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class Character extends Component {
    constructor(props) {
        super(props);
        this.mesh = undefined;
        this.characterModel = undefined;
        this.characterModelMeshes = undefined;
        
        // Object position offset
        this.xOffset = 0.25;
        this.yOffset = -0.5;
        this.zOffset = 0;

        // Animations
        this.animationSpeed = 0.5;
        this.turnLeftAnimation = undefined;

        // Put a global reference to this object
        Globals.character = this;
    }
    
    componentDidMount = () => {
        this.createMesh();
    }
    
    componentWillUnmount = () => {
        Globals.character = undefined;
        this.mesh.dispose();
    }
    
    createMesh = () => {
        // Read values from component props. Load default value if not defined.
        const posX = this.props.posX ? this.props.posX : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const posZ = this.props.posZ ? this.props.posZ : 0;
        
        // Create parent mesh
        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "character",
            { height: 1, width: 1, depth: 1 },
            Globals.scene
        );

        // Create parent material for transparency
        const characterParentMaterial = new BABYLON.Material("characterParentMaterial");
        characterParentMaterial.alpha = 0;
            
        // Modify parent object properties
        this.mesh.position = new BABYLON.Vector3(posX, posY, posZ);
        this.mesh.material = characterParentMaterial;
        

        // Load mesh
        this.characterModel = BABYLON.SceneLoader.ImportMesh(
            "",
            "/assets/obj/",
            "character_running.glb",
            Globals.scene,
            (meshes) => {               
                // Expose the meshes to the outside world
                this.characterModelMeshes = meshes;
                
                // Modify mesh properties
                meshes.forEach(mesh => {
                    mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                    mesh.position = new BABYLON.Vector3(
                        posX + this.xOffset,
                        posY + this.yOffset,
                        posZ + this.zOffset
                    );
                    mesh.setParent(this.mesh);
                });
            }
        );
    }

    moveCharacter = () => {
        this.mesh.position.x += 1;
        // let runningAnimation = Globals.scene.getAnimationGroupByName("Running");
        // runningAnimation.stop();
    }

    turnLeft = () => {
        console.log(this.mesh);

        const turnLeftAnimation = new BABYLON.Animation(
            "characterTurnleft",
            "rotation.y",
            Globals.framerate,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const turnLeftKeyframes = [];
        turnLeftKeyframes.push({
            frame: 0,
            value: this.mesh.rotation.y
        });
        turnLeftKeyframes.push({
            frame: this.animationSpeed * Globals.framerate,
            value: this.mesh.rotation.y + Math.PI/2
        });

        turnLeftAnimation.setKeys(turnLeftKeyframes);
        
        // Pop the last animation before adding another one
        if (this.mesh.animations.length > 0)
            this.mesh.animations.pop();
        this.mesh.animations.push(turnLeftAnimation);

        Globals.scene.beginAnimation(this.mesh, 0, this.animationSpeed * Globals.framerate, false);
    }
    
    render() {
        return (
            <div>
                <button onClick={this.moveCharacter}>PRESS ME DADDY</button>
                <button onClick={this.turnLeft}>Turn Left</button>
            </div>
        )
    }
}

export default Character
