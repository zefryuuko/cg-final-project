import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Globals from '../../Globals';

class GrassBlock extends Component {
    constructor(props) {
        super(props);
        this.mesh = undefined;
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
            `grassBlock_${posX},${posY},${posZ}`,
            { height: 1, width: 1, depth: 1 },
            Globals.scene
        );

        // Modify mesh properties
        this.mesh.position.x = posX;
        this.mesh.position.y = posY;
        this.mesh.position.z = posZ;
    }

    applyMaterial = () => {
        let material = new BABYLON.StandardMaterial("GrassBlockMaterial", Globals.scene);
        
        // Use CubeTexture to map the texture to each face
        material.reflectionTexture = new BABYLON.CubeTexture("assets/textures/grass/grass", Globals.scene);
        material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        material.reflectionTexture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.backFaceCulling = false;

        // Apply material to mesh
        this.mesh.material = material;
    }


    render = () => {
        return (
            <div></div>
        )
    }
}

export default GrassBlock
