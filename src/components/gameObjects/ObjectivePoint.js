import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class ObjectivePoint extends Component {
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

        // Create mesh
        this.mesh = BABYLON.MeshBuilder.CreateBox(
            `objectivePoint_${posX},${posY},${posZ}`,
            { height: 1, width: 1, depth: 1 },
            Globals.scene
        );

        // Modify mesh properties
        this.mesh.position.x = posX;
        this.mesh.position.y = posY;
        this.mesh.position.z = posZ;
    }

    applyMaterial = () => {
        let material = new BABYLON.StandardMaterial("StoneBlockMaterial", Globals.scene);
        // let shaderMaterial = new BABYLON.ShaderMaterial(
        //     "objectiveShader", 
        //     Globals.scene, 
        //     "/cg-final-project/assets/other/ObjectivePoint",
        //     {
        //     attributes: ["position", "normal", "uv"],
        //     uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time", "direction" ],
        //     // defines: ["MyDefine"],
        //     needAlphaBlending: true,
        //     needAlphaTesting: true
        //     }
        // );
        // let shaderMaterial = new BABYLON.ShaderMaterial("shader", Globals.scene, {
        //     vertexElement: "objectivePointShader",
        //     // fragmentElement: "fragmentShaderCode"
        // }, {
        //     attributes: ["position", "normal", "uv"],
        //     // uniforms: ["world", "worldView", "worldViewProjection", "view", "project"]
        // });
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.backFaceCulling = false;

        // Apply material to mesh
        // this.mesh.material = shaderMaterial;
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

export default ObjectivePoint