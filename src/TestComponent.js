import React, { Component } from 'react';
import * as BABYLON from "babylonjs";
import GlobalVariables from './GlobalVariables';


class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.addModels();
    }

    addModels = () => {
        // Add BOX
        var boxMesh = BABYLON.MeshBuilder.CreateBox(
            "box2",
            { height: 1, width: 1, depth: 1 },
            GlobalVariables.scene
        );
        boxMesh.position.y = 1;

        var woodMaterial = new BABYLON.StandardMaterial("wood", GlobalVariables.scene);
        woodMaterial.diffuseTexture = new BABYLON.Texture(
            "./assets/portal_cube.png",
            GlobalVariables.scene
        );
        boxMesh.material = woodMaterial;
    };

    render() { 
        return ( 
            <div></div>
         );
    }
}
 
export default TestComponent;