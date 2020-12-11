import React, { Component } from 'react';
import * as BABYLON from "babylonjs";
import Globals from './Globals';

let boxMesh;

class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.addModels();
    }

    componentWillUnmount() {
        boxMesh.dispose();
    }

    addModels = () => {
        // Add BOX
        boxMesh = BABYLON.MeshBuilder.CreateBox(
            "box2",
            { height: 1, width: 1, depth: 1 },
            Globals.scene
        );
        boxMesh.position.y = 0;

        var woodMaterial = new BABYLON.StandardMaterial("wood", Globals.scene);
        woodMaterial.diffuseTexture = new BABYLON.Texture(
            "./assets/portal_cube.png",
            Globals.scene
        );
        boxMesh.material = woodMaterial;

        const frameRate = 60;
        const spawnAnimation = new BABYLON.Animation(
            "spawnAnimationspawnAnimation", 
            "scaling", 
            frameRate, 
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        
        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: new BABYLON.Vector3(0, 0, 0),
        });
        keyFrames.push({
            frame: 0.3 * frameRate,
            value: new BABYLON.Vector3(1, 1 ,1),
        });
        spawnAnimation.setKeys(keyFrames);

        boxMesh.animations.push(spawnAnimation);
        Globals.scene.beginAnimation(boxMesh, 0, 0.3 * frameRate, false);
    };

    render() { 
        return ( 
            <div></div>
         );
    }
}
 
export default TestComponent;