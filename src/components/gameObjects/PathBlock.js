import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class PathBlock extends Component {
    constructor(props) {
        super(props);
        this.mesh = undefined;
    }
    
    componentDidMount = () => {
        this.createMesh();
        this.applyMaterial();
        this.startSpawnAnimation();
    }

    componentWillUnmount = () => {
        this.mesh.dispose();
    }

    createMesh = () => {
        // Read values from component props. Load default value if not defined.
        const posX = this.props.posX ? this.props.posX : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const posZ = this.props.posZ ? this.props.posZ : 0;

        // Texture Options
        // Source: https://playground.babylonjs.com/#ICLXQ8#1
        let columns = 6;  // 6 columns
        let rows = 1;  // 1 row

        //alien sprite
        let faceUV = new Array(6);

        //set all faces to same
        for (let i = 0; i < 6; i++) {
            faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
        }

        // Create mesh
        this.mesh = BABYLON.MeshBuilder.CreateBox(
            `grassBlock_${posX},${posY},${posZ}`,
            { height: 1, width: 1, depth: 1, faceUV: faceUV, wrap:true },
            Globals.scene
        );

        // Modify mesh properties
        this.mesh.position.x = posX;
        this.mesh.position.y = posY;
        this.mesh.position.z = posZ;
    }

    applyMaterial = () => {
        let material = new BABYLON.StandardMaterial("GrassBlockMaterial", Globals.scene);
        let texture = new BABYLON.Texture("assets/textures/path_block.jpg", Globals.scene);
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        // Apply material to mesh
        this.mesh.material = material;
    }

    startSpawnAnimation = () => {
        const spawnAnimation = new BABYLON.Animation(
            "spawnAnimation", 
            "scaling", 
            Globals.framerate, 
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        
        const yOffset = this.props.yOffset ? this.props.yOffset : 0;
        const posY = this.props.posY ? this.props.posY : 0;
        const animationDelaySeconds = (yOffset + posY) * 0.2 + 1;
        
        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: BABYLON.Vector3.Zero(),
        });
        keyFrames.push({
            frame: animationDelaySeconds * Globals.framerate,
            value: BABYLON.Vector3.Zero()
        });
        keyFrames.push({
            frame: (animationDelaySeconds * Globals.framerate) + (0.3 * Globals.framerate),
            value: BABYLON.Vector3.One(),
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

export default PathBlock
