import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class Character extends Component {
    constructor(props) {
        super(props);

        // Character
        this.mesh = undefined;
        this.characterModel = undefined;
        this.characterModelMeshes = undefined;
        this.characterFaceDirection = 0;    // Value represents N E S W
        
        // Object position offset
        this.xOffset = 0;
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

    walk = () => {
        // Determine the move axis and move direction
        const moveAxis = this.characterFaceDirection % 2 === 0 ? "z" : "x";
        const moveDirection = this.characterFaceDirection >=2 ? 1 : -1;

        const walkAnimation = new BABYLON.Animation(
            "characterTurnleft",
            `position.${moveAxis}`,
            Globals.framerate,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const walkKeyframes = [];
        walkKeyframes.push({
            frame: 0,
            value: moveAxis === "x" ? this.mesh.position.x : this.mesh.position.z
        });
        walkKeyframes.push({
            frame: this.animationSpeed * Globals.framerate,
            value: (moveAxis === "x" ? this.mesh.position.x : this.mesh.position.z) + moveDirection
        });

        walkAnimation.setKeys(walkKeyframes);

        // Pop the last animation before adding another one
        if (this.mesh.animations.length > 0)
            this.mesh.animations.pop();
        this.mesh.animations.push(walkAnimation);

        Globals.scene.beginAnimation(this.mesh, 0, this.animationSpeed * Globals.framerate, false);


        // let runningAnimation = Globals.scene.getAnimationGroupByName("Running");
        // runningAnimation.stop();
    }

    turnLeft = () => {
        // Update the direction of the character
        if (this.characterFaceDirection === 0)
            this.characterFaceDirection = 3;
        else
            this.characterFaceDirection = Math.abs((this.characterFaceDirection - 1) % 4);
        console.log(`Rotating player to ${this.characterFaceDirection}`);

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
            value: this.mesh.rotation.y - Math.PI/2
        });

        turnLeftAnimation.setKeys(turnLeftKeyframes);
        
        // Pop the last animation before adding another one
        if (this.mesh.animations.length > 0)
            this.mesh.animations.pop();
        this.mesh.animations.push(turnLeftAnimation);

        Globals.scene.beginAnimation(this.mesh, 0, this.animationSpeed * Globals.framerate, false);
    }

    turnRight = () => {
        // Update the direction of the character
        this.characterFaceDirection = Math.abs((this.characterFaceDirection + 1) % 4);
        console.log(`Rotating player to ${this.characterFaceDirection}`);

        const turnRightAnimation = new BABYLON.Animation(
            "characterTurnleft",
            "rotation.y",
            Globals.framerate,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const turnRightKeyframes = [];
        turnRightKeyframes.push({
            frame: 0,
            value: this.mesh.rotation.y
        });
        turnRightKeyframes.push({
            frame: this.animationSpeed * Globals.framerate,
            value: this.mesh.rotation.y + Math.PI/2
        });

        turnRightAnimation.setKeys(turnRightKeyframes);
        
        // Pop the last animation before adding another one
        if (this.mesh.animations.length > 0)
            this.mesh.animations.pop();
        this.mesh.animations.push(turnRightAnimation);

        Globals.scene.beginAnimation(this.mesh, 0, this.animationSpeed * Globals.framerate, false);
    }
    
    render() {
        return (
            <div>
                <button onClick={this.walk}>PRESS ME DADDY</button>
                <button onClick={this.turnLeft}>Turn Left</button>
                <button onClick={this.turnRight}>Turn Right</button>
            </div>
        )
    }
}

export default Character
