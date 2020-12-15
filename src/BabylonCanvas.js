import React, { Component } from "react";
import * as BABYLON from "babylonjs";
import Globals from './Globals';

// Temp definitions, delete later
var scene;
var boxMesh;

class BabylonCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = { useWireFrame: false, shouldAnimate: false };
        this.light = undefined;
        this.arcRotateCamera = undefined;
    }
    
    componentDidMount = () => {        
        // Initialize scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true);
        Globals.scene = new BABYLON.Scene(this.engine);
        
        // Intitialize the scene with the required elements
        this.addLight();
        this.addCamera();
        this.addSkybox();

        // this.addModels();
        // this.addGround();

        // Add Events
        window.addEventListener("resize", this.onWindowResize, false);
        window.addEventListener("keydown", this.onKeydownEvent);

        // Render Loop
        this.engine.runRenderLoop(() => {
            Globals.scene.render();
        });

        // Handle animations and per frame calculations
        // Simillar to Update() function in Unity
        Globals.scene.registerBeforeRender(() => {
            
        });
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize, false);
    }

    onWindowResize = event => {
        this.engine.resize();
    };

    onKeydownEvent = event => {
        switch(event.keyCode) {
            case 219: // [
                Globals.scene.debugLayer.show();
                break;
            case 221: // ]
                Globals.scene.debugLayer.hide();
                break;
            default:
                break;
        }
    } 

    addLight = () => {
        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this.light = new BABYLON.HemisphericLight(
            "light1",
            new BABYLON.Vector3(0, -1, 0),
            Globals.scene
        );
    };

    addSkybox = () => {
        var photoSphere = BABYLON.Mesh.CreateSphere("skybox", 16.0, 50.0, scene);

        var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
        skyboxMaterial.emissiveTexture = new BABYLON.Texture(
            "assets/other/skybox.png",
            Globals.scene,
            1,
            0
        );
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.emissiveTexture.uOffset = -Math.PI / 2; // left-right
        skyboxMaterial.emissiveTexture.uOffset = 0.1; // up-down
        skyboxMaterial.backFaceCulling = false;

        photoSphere.material = skyboxMaterial;
    }

    addCamera = () => {
        // ---------------ArcRotateCamera or Orbit Control----------
        this.arcRotateCamera = new BABYLON.ArcRotateCamera(
            "MainCamera",
            Math.PI / 2,
            Math.PI / 4,
            20,
            new BABYLON.Vector3(2, 0, 2),
            Globals.scene
        );
        // camera.inertia = 0;
        // camera.angularSensibilityX = 250;
        // camera.angularSensibilityY = 250;

        // This attaches the camera to the canvas
        this.arcRotateCamera.attachControl(this.canvas, true);
        this.arcRotateCamera.setPosition(new BABYLON.Vector3(7, 7, 7));
        this.arcRotateCamera.beta = Math.PI / 2.5;
    };

    addGround = () => {
        // Create a built-in "ground" shape.
        var ground = BABYLON.MeshBuilder.CreateGround(
            "ground1",
            { height: 6, width: 6, subdivisions: 2 },
            scene
        );
        var groundMaterial = new BABYLON.StandardMaterial("grass0", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture(
            "./assets/ground.jpeg",
            scene
        );
        ground.material = groundMaterial;
    };

    addModels = () => {
        // Add BOX
        boxMesh = BABYLON.MeshBuilder.CreateBox(
            "box",
            { height: 1, width: 1, depth: 1 },
            scene
        );
        boxMesh.position.y = 1;

        var woodMaterial = new BABYLON.StandardMaterial("wood", scene);
        woodMaterial.diffuseTexture = new BABYLON.Texture(
            "./assets/portal_cube.png",
            scene
        );
        boxMesh.material = woodMaterial;
    };

    render() {
        return (
            <canvas
                className="renderCanvas"
                ref={canvas => {
                    this.canvas = canvas;
                }}
            />
        );
    }
}
export default BabylonCanvas;