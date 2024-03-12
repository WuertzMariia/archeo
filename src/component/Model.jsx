import React, {useEffect} from "react";
import '../App.css'
import {Data} from "../Data";
import * as THREE from "../three";
import {OBJLoader} from "../OBJLoader";
import {OrbitControls} from "../OrbitControls";

function Model() {
    useEffect(() => {
        if (document.querySelectorAll(".three-js-container_1").length === 1 && document.querySelectorAll(".three-js-container_1 canvas").length === 0) {
            let camera, scene, renderer, object;
            init();

            // eslint-disable-next-line no-inner-declarations
            function init() {
                camera = new THREE.PerspectiveCamera(275, window.innerWidth / window.innerHeight, 0.1, 20);
                camera.position.x = 1;
                camera.position.z = 1;
                camera.position.y = 1;

                // scene
                scene = new THREE.Scene();
                const ambientLight = new THREE.AmbientLight(0xffffff);
                scene.add(ambientLight);
                const pointLight = new THREE.PointLight(0xffffff, 15);
                camera.add(pointLight);
                scene.add(camera);
                // manager
                function loadModel() {
                    object.traverse(function (child) {
                        if (child.isMesh) child.material.map = texture;
                    });
                    object.scale.setScalar(1);
                    object.position.set(1, 0, 2); // Adjust the position as needed
                    object.rotation.set(0, 3.5, -0.2); // Adjust the rotation as needed
                    // Access the geometry and get the number of faces
                    const geometry = object.children[0].geometry;
                    console.log("geometry:", object.children[0].geometry)
                    // Get the position attribute data
                    const positionAttribute = geometry.attributes.position;
                    // Get the total number of vertices
                    const totalVertices = positionAttribute.count;
                    // Calculate the number of faces based on the total number of vertices
                    const numberOfFaces = totalVertices / 3; // Assuming each face has three vertices
                    // Vertices:223.272
                    // Triangles:446.378
                    // Size X:3,18
                    // Size Y:2,12
                    // Size Z:1,53
                    console.log("Number of faces:", numberOfFaces);
                    console.log("Number of vertices:", totalVertices);
                    scene.add(object);
                    render();
                }

                const manager = new THREE.LoadingManager(loadModel);
                // texture
                const textureLoader = new THREE.TextureLoader(manager);
                const texture = textureLoader.load('src/assets/sauele_full_texure.png', render);
                texture.colorSpace = THREE.SRGBColorSpace;
                // model
                function onProgress(xhr) {
                    if (xhr.lengthComputable) {
                        const percentComplete = xhr.loaded / xhr.total * 100;
                        // console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
                    }

                }
                function onError() {
                }

                const loader = new OBJLoader(manager);
                // loader.load('src/assets/male02.obj', function (obj) {
                loader.load('src/assets/sauele_full.obj', function (obj) {
                    // loader.load('src/assets/sauele1.obj', function (obj) {

                    object = obj;

                }, onProgress, onError);

                //

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
                document.querySelector(".three-js-container_1").appendChild(renderer.domElement);
                document.querySelector(".three-js-container_1").classList.add("is-visible")

                //

                const controls = new OrbitControls(camera, renderer.domElement);
                controls.minDistance = 2;
                controls.maxDistance = 5;
                controls.addEventListener('change', render);

                //

                window.addEventListener('resize', onWindowResize);

            }

            // eslint-disable-next-line no-inner-declarations
            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);

            }

            // eslint-disable-next-line no-inner-declarations
            function render() {

                renderer.render(scene, camera);

            }
        }
    }, []);

    return (
        <React.Fragment>
            <div className={"model-container"}>
                <div className={"acquisitions"}></div>
                <div className={"three-js-container"}></div>
                <div className={"three-js-container_1"}></div>
            </div>
        </React.Fragment>
    )
}

export default Model
