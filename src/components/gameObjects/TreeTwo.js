import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class TreeTwo extends Component {
    constructor(props) {
        super(props);
        this.mesh = undefined;
        this.obj = undefined;
    }
    
    componentDidMount = () => {
        this.createMesh();
        this.applyMaterial();
    }
    
    componentWillUnmount = () => {
        this.mesh.dispose();
    }

    createMesh = () => {
        // Read values from component props. Load default value if not defined.
        const posX = this.props.posX ? this.props.posX : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const posZ = this.props.posZ ? this.props.posZ : 0;

        // Create mesh
        this.mesh = BABYLON.MeshBuilder.CreateBox(
            `treeTwo_${posX},${posY},${posZ}`,
            { height: 1, width: 1, depth: 1 },
            Globals.scene
        );

        // Load 3D model
        this.obj = BABYLON.SceneLoader.ImportMesh(
            "",
            "assets/obj/",
            "tree_2.obj",
            Globals.scene,
            (meshes) => {
                meshes.forEach((mesh) => {
                    mesh.setParent(this.mesh);
                    mesh.position.y -= 0.5;
                });

                // Modify parent mesh properties
                this.mesh.position.x = posX;
                this.mesh.position.y = posY;
                this.mesh.position.z = posZ;

                this.startSpawnAnimation();
            }
        );

    }

    applyMaterial = () => {
        let material = new BABYLON.StandardMaterial("TreeOneParentMaterial", Globals.scene);
        material.alpha = 0;

        // Apply material to mesh
        this.mesh.material = material;
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


    render = () => {
        return (
            <div></div>
        )
    }
}

export default TreeTwo
