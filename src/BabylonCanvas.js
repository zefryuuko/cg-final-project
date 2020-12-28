import React, { Component } from "react";
import * as BABYLON from "babylonjs";
import Globals from './Globals';

class BabylonCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = { useWireFrame: false, shouldAnimate: false };
        this.hemisphericLight = undefined;
        this.underMapLighting = undefined;
        this.arcRotateCamera = undefined;
        this.backgroundMusic = undefined;

        Globals.babylonCanvas = this;
    }
    
    componentDidMount = () => {        
        // Initialize scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true);
        Globals.scene = new BABYLON.Scene(this.engine);
        
        // Intitialize the scene with the required elements
        this.addLight();
        this.addCamera();
        this.addSkybox();
        this.addMusic();

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
        this.backgroundMusic.stop();
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
        this.hemisphericLight = new BABYLON.HemisphericLight(
            "hemisphericLight",
            new BABYLON.Vector3(0, 1, 0),
            Globals.scene
        );

        // Create directional light below the map to light up the bottom faces
        this.underMapLighting = new BABYLON.SpotLight(
            "underMapLight",
            new BABYLON.Vector3(2, -10, 2),
            new BABYLON.Vector3(0, 1, 0),
            Math.PI,
            8,
            Globals.scene
        )
    };

    addSkybox = () => {
        var photoSphere = BABYLON.Mesh.CreateSphere("skybox", 16.0, 50.0, Globals.scene);

        var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", Globals.scene);
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
            10,
            new BABYLON.Vector3(2, 0, 2),
            Globals.scene
        );
        
        this.arcRotateCamera.panningSensibility = 0;
        this.arcRotateCamera.lowerRadiusLimit = this.arcRotateCamera.upperRadiusLimit = 10;

        // camera.inertia = 0;
        // camera.angularSensibilityX = 250;
        // camera.angularSensibilityY = 250;

        // This attaches the camera to the canvas
        this.arcRotateCamera.attachControl(this.canvas, true);
        this.arcRotateCamera.setPosition(new BABYLON.Vector3(7, 7, 7));
        this.arcRotateCamera.beta = Math.PI / 2.5;
    };

    addMusic = () => {
        this.backgroundMusic = new BABYLON.Sound(
            "backgroundMusic",
            "assets/other/Hypnotic-Puzzle.mp3",
            Globals.scene,
            null,
            {
                loop: true,
                autoplay: true,
                volume: 0.2
            }
        )
    }

    disableCameraControl = () => {
        this.resetCameraPosition();
        this.arcRotateCamera.detachControl()
    }

    enableCameraControl = () => {
        this.resetCameraPosition();
        this.arcRotateCamera.attachControl(this.canvas, true);
    }

    resetCameraPosition = () => {
        this.arcRotateCamera.attachControl(this.canvas, true);
        this.arcRotateCamera.setPosition(new BABYLON.Vector3(7, 7, 7));
        this.arcRotateCamera.beta = Math.PI / 2.5;
    }

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