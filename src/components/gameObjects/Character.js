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
        this.characterFaceDirection = props.faceDirection;    // Value represents N E S W
        
        // Object position offset
        this.xOffset = 0;
        this.yOffset = -0.5;
        this.zOffset = 0;

        // Animations
        this.animationSpeed = 0.5;
        this.turnLeftAnimation = undefined;
        this.idleAnimation = undefined;
        this.walkingAnimation = undefined;

        // Put a global reference to this object
        Globals.character = this;
    }
    
    componentDidMount = () => {
        this.createMesh();
    }
    
    componentWillUnmount = () => {
        Globals.character = undefined;
        this.mesh.dispose();
        this.idleAnimation = this.walkingAnimation = null;
    }
    
    createMesh = () => {
        // Read values from component props. Load default value if not defined.
        const posX = this.props.posX ? this.props.posX : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const posZ = this.props.posZ ? this.props.posZ : 0;
        const faceDirection = this.props.faceDirection ? this.props.faceDirection : 0;
        
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
            "assets/obj/",
            "character_running.glb",
            Globals.scene,
            (meshes, particleSystem, skeleton, animationGroups) => {               
                // Expose the meshes and animations to the outside world
                this.characterModelMeshes = meshes;
                this.idleAnimation = animationGroups[0];
                this.walkingAnimation = animationGroups[1];
                
                
                // Modify mesh properties
                meshes.forEach(mesh => {
                    mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                    mesh.position = new BABYLON.Vector3(
                        posX + this.xOffset,
                        posY + this.yOffset,
                        posZ + this.zOffset
                    );
                    const meshMaterial = new BABYLON.StandardMaterial("characterMaterial");
                    meshMaterial.specularColor = new BABYLON.Color3(1 ,1 ,1);
                    meshMaterial.diffuseColor = new BABYLON.Color3(1, 0.6, 0);
                    meshMaterial.backFaceCulling = false;
                    meshMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

                    mesh.material = meshMaterial;
                    mesh.setParent(this.mesh);
                });

                // Use rotation data from component properties
                this.characterFaceDirection = faceDirection;
                this.mesh.rotation.y += Math.PI * 0.5 * faceDirection;

                // Start spawn animation after loading mesh
                this.startSpawnAnimation();
            }
        );
    }

    startSpawnAnimation = () => {
        const yOffset = this.props.yOffset ? this.props.yOffset : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const animationDelaySeconds = (yOffset + posY) * 0.2 + 1;
        
        const spawnAnimation = new BABYLON.Animation(
            "spawnAnimation", 
            "position", 
            Globals.framerate, 
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        
        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: new BABYLON.Vector3(
                this.props.posX,
                100,
                this.props.posZ
            ),
        });
        keyFrames.push({
            frame: (animationDelaySeconds * Globals.framerate) + (0.1 * Globals.framerate) - 1,
            value: new BABYLON.Vector3(
                this.props.posX,
                100,
                this.props.posZ
            ),
        });
        keyFrames.push({
            frame: (animationDelaySeconds * Globals.framerate) + (0.1 * Globals.framerate),
            value: new BABYLON.Vector3(
                this.props.posX,
                this.props.posY + 0.5,
                this.props.posZ
            ),
        });
        keyFrames.push({
            frame: (animationDelaySeconds * Globals.framerate) + (0.3 * Globals.framerate),
            value: new BABYLON.Vector3(
                this.props.posX,
                this.props.posY,
                this.props.posZ
            ),
        });
        spawnAnimation.setKeys(keyFrames);

        this.mesh.animations.push(spawnAnimation);
        
        Globals.scene.beginAnimation(this.mesh, 0, (animationDelaySeconds * Globals.framerate) + (0.3 * Globals.framerate), false);
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
        this.idleAnimation.stop();
        this.walkingAnimation.start(false, 2.0, this.walkingAnimation.from, this.walkingAnimation.to, false);
        
        // Stop animation after finished walking
        setTimeout(() => {
            this.walkingAnimation.stop();
            this.idleAnimation.start(true, 1.0, this.idleAnimation.from, this.idleAnimation.to, false);
        }, this.animationSpeed * 1000);
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

    respawn = () => {
        const respawnPositionAnimation = new BABYLON.Animation(
            "characterRespawnPosition",
            "position",
            Globals.framerate,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );        
        const positionKeyframe = [];
        positionKeyframe.push({
            frame: 0,
            value: this.mesh.position
        });
        positionKeyframe.push({
            frame: 0.2 * Globals.framerate,
            value: new BABYLON.Vector3(
                this.mesh.position.x,
                1.5,
                this.mesh.position.z
            )
        });
        positionKeyframe.push({
            frame: 0.2 * Globals.framerate + 1,
            value: new BABYLON.Vector3(
                this.mesh.position.x,
                1.5,
                this.mesh.position.z
            )
        });
        positionKeyframe.push({
            frame: 0.4 * Globals.framerate,
            value: new BABYLON.Vector3(
                this.props.posX,
                1.5,
                this.props.posZ
            )
        });
        positionKeyframe.push({
            frame: 0.7 * Globals.framerate,
            value: new BABYLON.Vector3(
                this.props.posX,
                this.props.posY,
                this.props.posZ
            )
        });
        respawnPositionAnimation.setKeys(positionKeyframe);
        
        // Pop the last animation before adding another one
        if (this.mesh.animations.length > 0)
            this.mesh.animations.pop();
        this.mesh.animations.push(respawnPositionAnimation);

        // Move character to spawn point
        Globals.scene.beginAnimation(this.mesh, 0, 0.8 * Globals.framerate, false);
        
        // Rotate player to its original state
        this.mesh.rotation.y = Math.PI * 0.5 * this.props.faceDirection;
        this.characterFaceDirection = this.props.faceDirection;
    }
    
    render = () => {
        return (
            <div>
                <button onClick={this.walk}>Move Forward</button>
                <button onClick={this.turnLeft}>Turn Left</button>
                <button onClick={this.turnRight}>Turn Right</button>
            </div>
        )
    }
}

export default Character
