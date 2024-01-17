import React, {useEffect} from "react";
import './App.css'
import {useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Lines} from "react-preloaders";
import * as THREE from './three';
import {OBJLoader} from './OBJLoader';
import {OrbitControls} from './OrbitControls';
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoryScale } from "chart.js";
import { Data } from "./Data";
import BarChart from "./Bar";
import BarChart1 from "./Bar1";
// TODO add chart + data for chart
// TODO run 3-4-5 images packages + time + memory

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function App() {
    const [file, setFile] = useState("");
    const [archiveName, setArchiveName] = useState("");
    const [videoMetaData, setVideoMetaData] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingArchive, setLoadingArchive] = useState(false);
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartData2, setChartData2] = useState({
        datasets: [],
    });

    useEffect(() => {
        setChartData({
            // labels: Data.map((sampling) => [sampling.name, "Number of keyframes"]),
            labels: Data.map((sampling) => [sampling.name]),
            datasets: [{
                label: "Keyframes",
                data: Data.map((data) => data.keyframes),
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                ],
                borderWidth: 1
            }, {
                label: "Time (minutes)",
                data: Data.map((data) => data.minutes),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                fill: false,
                borderColor: [
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 1
            }]
        });

        setChartData2({
            labels: Data.map((sampling) => [sampling.name]),
            datasets: [{
                label: "Number of faces",
                data: Data.map((data) => data.faces),
                fill: false,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            }]
        });

        let object;
        init();

        // eslint-disable-next-line no-inner-declarations
        function init() {
            const manager = new THREE.LoadingManager();

            function onProgress(xhr) {
                if (xhr.lengthComputable) {
                    const percentComplete = xhr.loaded / xhr.total * 100;
                    console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
                }
            }

            function onError() {
            }

            const loader = new OBJLoader(manager);
            // loader.load('src/assets/texturedMesh1.obj', function (obj) {
            loader.load('src/assets/sauele_simple.obj', function (obj) {

                object = obj;
                const geometry1 = object.children[0].geometry;
                console.log("GEOMETRY", geometry1)
                            // Get the position attribute data
                            const positionAttribute = geometry1.attributes.position;

                            // Get the total number of vertices
                            const totalVertices = positionAttribute.count;

                            // Calculate the number of faces based on the total number of vertices
                            const numberOfFaces1 = totalVertices / 3; // Assuming each face has three vertices

            }, onProgress, onError);

            loader.load('src/assets/sauele_full.obj', function (obj) {

                object = obj;
                const geometry1 = object.children[0].geometry;
                console.log("GEOMETRY", geometry1)
                // Get the position attribute data
                const positionAttribute = geometry1.attributes.position;

                // Get the total number of vertices
                const totalVertices = positionAttribute.count;

                // Calculate the number of faces based on the total number of vertices
                const numberOfFaces2 = totalVertices / 3; // Assuming each face has three vertices


            }, onProgress, onError);
        }

        // if (document.querySelectorAll(".three-js-container").length === 1 && document.querySelectorAll(".three-js-container canvas").length === 0) {
        //     console.log("three.js test")
        //     let camera, scene, renderer;
        //
        //     let object;
        //
        //     init();
        //
        //
        //     // eslint-disable-next-line no-inner-declarations
        //     function init() {
        //
        //         camera = new THREE.PerspectiveCamera(275, window.innerWidth / window.innerHeight, 0.1, 20);
        //         camera.position.x = 1;
        //         camera.position.z = 1;
        //         camera.position.y = 1;
        //
        //         // scene
        //
        //         scene = new THREE.Scene();
        //
        //         const ambientLight = new THREE.AmbientLight(0xffffff);
        //         scene.add(ambientLight);
        //
        //         const pointLight = new THREE.PointLight(0xffffff, 15);
        //         camera.add(pointLight);
        //         scene.add(camera);
        //
        //         // manager
        //
        //         function loadModel() {
        //
        //             object.traverse(function (child) {
        //
        //                 if (child.isMesh) child.material.map = texture;
        //
        //             });
        //
        //             object.scale.setScalar(3);
        //             object.position.set(0,0,0); // Adjust the position as needed
        //             object.rotation.set(-0.5, 3.0, -0.65); // Adjust the rotation as needed
        //             //
        //             // Access the geometry and get the number of faces
        //             const geometry = object.children[0].geometry;
        //             console.log("geometry:", object.children[0].geometry)
        //             // Get the position attribute data
        //             const positionAttribute = geometry.attributes.position;
        //
        //             // Get the total number of vertices
        //             const totalVertices = positionAttribute.count;
        //
        //             // Calculate the number of faces based on the total number of vertices
        //             const numberOfFaces = totalVertices / 3; // Assuming each face has three vertices
        //             // Vertices:223.272
        //             // Triangles:446.378
        //             // Size X:3,18
        //             // Size Y:2,12
        //             // Size Z:1,53
        //             console.log("Number of faces:", numberOfFaces);
        //             console.log("Number of vertices:", totalVertices);
        //             scene.add(object);
        //
        //             render();
        //
        //         }
        //
        //         const manager = new THREE.LoadingManager(loadModel);
        //         // texture
        //
        //         const textureLoader = new THREE.TextureLoader(manager);
        //         const texture = textureLoader.load('src/assets/sauele_simple.png', render);
        //         texture.colorSpace = THREE.SRGBColorSpace;
        //
        //         // model
        //
        //         function onProgress(xhr) {
        //
        //             if (xhr.lengthComputable) {
        //
        //                 const percentComplete = xhr.loaded / xhr.total * 100;
        //                 console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
        //
        //             }
        //
        //         }
        //
        //         function onError() {
        //         }
        //
        //         const loader = new OBJLoader(manager);
        //         // loader.load('src/assets/male02.obj', function (obj) {
        //         // loader.load('src/assets/texturedMesh1.obj', function (obj) {
        //         loader.load('src/assets/sauele_simple.obj', function (obj) {
        //
        //             object = obj;
        //             const geometry1 = object.children[0].geometry;
        //             console.log("GEOMETRY aaaaa", geometry1)
        //
        //         }, onProgress, onError);
        //
        //
        //
        //         renderer = new THREE.WebGLRenderer({antialias: true});
        //         renderer.setPixelRatio(window.devicePixelRatio);
        //         renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        //         let child = document.querySelector(".three-js-container").appendChild(renderer.domElement);
        //         document.querySelector(".three-js-container").classList.add("is-visible")
        //
        //
        //
        //         const controls = new OrbitControls(camera, renderer.domElement);
        //         controls.minDistance = 2;
        //         controls.maxDistance = 5;
        //         controls.addEventListener('change', render);
        //
        //
        //
        //         window.addEventListener('resize', onWindowResize);
        //
        //     }
        //
        //     // eslint-disable-next-line no-inner-declarations
        //     function onWindowResize() {
        //
        //         camera.aspect = window.innerWidth / window.innerHeight;
        //         camera.updateProjectionMatrix();
        //
        //         renderer.setSize(window.innerWidth, window.innerHeight);
        //
        //     }
        //
        //     // eslint-disable-next-line no-inner-declarations
        //     function render() {
        //
        //         renderer.render(scene, camera);
        //
        //     }
        // }
        //
        //
        // if (document.querySelectorAll(".three-js-container_1").length === 1 && document.querySelectorAll(".three-js-container_1 canvas").length === 0) {
        //     let camera, scene, renderer;
        //
        //     let object;
        //
        //     init();
        //
        //
        //     // eslint-disable-next-line no-inner-declarations
        //     function init() {
        //
        //         camera = new THREE.PerspectiveCamera(275, window.innerWidth / window.innerHeight, 0.1, 20);
        //         camera.position.x = 1;
        //         camera.position.z = 1;
        //         camera.position.y = 1;
        //
        //         // scene
        //
        //         scene = new THREE.Scene();
        //
        //         const ambientLight = new THREE.AmbientLight(0xffffff);
        //         scene.add(ambientLight);
        //
        //         const pointLight = new THREE.PointLight(0xffffff, 15);
        //         camera.add(pointLight);
        //         scene.add(camera);
        //
        //         // manager
        //
        //         function loadModel() {
        //
        //             object.traverse(function (child) {
        //
        //                 if (child.isMesh) child.material.map = texture;
        //
        //             });
        //
        //             object.scale.setScalar(1);
        //             object.position.set(0,0,0); // Adjust the position as needed
        //             object.rotation.set(0, 3.5, -0.2); // Adjust the rotation as needed
        //             //
        //             // Access the geometry and get the number of faces
        //             const geometry = object.children[0].geometry;
        //             console.log("geometry:", object.children[0].geometry)
        //             // Get the position attribute data
        //             const positionAttribute = geometry.attributes.position;
        //
        //             // Get the total number of vertices
        //             const totalVertices = positionAttribute.count;
        //
        //             // Calculate the number of faces based on the total number of vertices
        //             const numberOfFaces = totalVertices / 3; // Assuming each face has three vertices
        //             // Vertices:223.272
        //             // Triangles:446.378
        //             // Size X:3,18
        //             // Size Y:2,12
        //             // Size Z:1,53
        //             console.log("Number of faces:", numberOfFaces);
        //             console.log("Number of vertices:", totalVertices);
        //             scene.add(object);
        //
        //             render();
        //
        //         }
        //
        //         const manager = new THREE.LoadingManager(loadModel);
        //
        //         // texture
        //
        //         const textureLoader = new THREE.TextureLoader(manager);
        //         const texture = textureLoader.load('src/assets/sauele_full_texure.png', render);
        //         texture.colorSpace = THREE.SRGBColorSpace;
        //
        //         // model
        //
        //         function onProgress(xhr) {
        //
        //             if (xhr.lengthComputable) {
        //
        //                 const percentComplete = xhr.loaded / xhr.total * 100;
        //                 console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
        //
        //             }
        //
        //         }
        //
        //         function onError() {
        //         }
        //
        //         const loader = new OBJLoader(manager);
        //         // loader.load('src/assets/male02.obj', function (obj) {
        //         loader.load('src/assets/sauele_full.obj', function (obj) {
        //         // loader.load('src/assets/sauele1.obj', function (obj) {
        //
        //             object = obj;
        //
        //         }, onProgress, onError);
        //
        //         //
        //
        //         renderer = new THREE.WebGLRenderer({antialias: true});
        //         renderer.setPixelRatio(window.devicePixelRatio);
        //         renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        //         let child = document.querySelector(".three-js-container_1").appendChild(renderer.domElement);
        //         document.querySelector(".three-js-container_1").classList.add("is-visible")
        //
        //         //
        //
        //         const controls = new OrbitControls(camera, renderer.domElement);
        //         controls.minDistance = 2;
        //         controls.maxDistance = 5;
        //         controls.addEventListener('change', render);
        //
        //         //
        //
        //         window.addEventListener('resize', onWindowResize);
        //
        //     }
        //
        //     // eslint-disable-next-line no-inner-declarations
        //     function onWindowResize() {
        //
        //         camera.aspect = window.innerWidth / window.innerHeight;
        //         camera.updateProjectionMatrix();
        //
        //         renderer.setSize(window.innerWidth, window.innerHeight);
        //
        //     }
        //
        //     // eslint-disable-next-line no-inner-declarations
        //     function render() {
        //
        //         renderer.render(scene, camera);
        //
        //     }
        // }
    }, []);

    /**
     * Download frames
     * @returns {Promise<void>}
     */
    let downloadFrames = async () => {
        console.log(archiveName)
        fetch("http://localhost:3001/download", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "archiveName": archiveName
            }),

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');

                // Check if the content type is a ZIP file
                if (contentType === 'application/zip') {
                    // Convert the response to a blob and create a link to download the file
                    console.log(contentType)
                    return response.blob();
                } else {
                    console.error('The requested file is not a ZIP file. Content type:', contentType);
                }
            })
            .then(blob => {
                if (blob) {
                    const link = document.createElement('a');
                    const objectUrl = URL.createObjectURL(blob);

                    link.href = objectUrl;
                    // Use a default filename on the client side
                    link.download = 'download';
                    link.innerHTML = "Frames.zip"
                    document.querySelector(".archive-box").appendChild(link);
                    link.addEventListener("click", () => {
                        // document.body.removeChild(link);
                        // URL.revokeObjectURL(objectUrl);
                    })
                } else {
                    console.error('No blob received from the server.');
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    /**
     * Extract frames
     * @returns {Promise<void>}
     */
    let extractFrames = async () => {
        try {
            setLoadingArchive(true)
            await fetch("http://localhost:3001/extract", {
                method: "POST",
                // mode: 'no-cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "file": file.path,
                    "fileName": file.filename.substring(0, file.filename.indexOf(".")),
                    "duration": videoMetaData.durationInSeconds
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setArchiveName(res.fileNameComplete)
                    console.log(archiveName)
                    setLoadingArchive(false)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            // const result = await response;
        } catch (e) {
            console.log("Error:", e)
        }
    }
    const fileTypes = ["mp4", "avi", "mpg", "mpg", "mov", "webm", "mkv", "mov", "wmv"];
    const [file1, setFile1] = useState(null);
    const handleChange = (file1) => {
        setFile1(file1);
        // setInputValue(file1)
        setFile("")
        setArchiveName("")
    };

    /**
     * Sumbit video
     * @returns {Promise<void>}
     */
    let submitVideo = async () => {
        event.preventDefault()
        try {
            setLoading(true)
            setArchiveName("")
            setVideoMetaData("")
            setFile("")
            // const fileInput = document.getElementById('input');
            let selectedFile;
            selectedFile = file1;
            let data = new FormData()
            data.append('file', selectedFile)
            await fetch("http://localhost:3001/upload", {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setFile(data.file);
                    setVideoMetaData(data.videoMetaDataObj)
                    setLoading(false)
                });

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <React.Fragment>
            <div className={"main-content"}>
                <FileUploader handleChange={handleChange} multiple={false} name="file" types={fileTypes}/>
                <button className="form--margin form__btn" onClick={submitVideo}>Upload video</button>
                {/*<form method="POST" action="http://localhost:3001/upload" encType="multipart/form-data">*/}
                {/*<label className="form--margin" htmlFor="file">Choose video file</label>*/}                        
                {/*<br/>*/}
                {/*<input className="form--margin" type="file" name="file" id={"input"} accept="video/*" value={inputValue}*/}
                {/*       onChange={e => {*/}
                {/*           setInputValue(e.target.value)*/}
                {/*           setFile("")*/}
                {/*           setArchiveName("")*/}
                {/*       }}/>*/}
                {/*<br/>*/}
                {/*</form>*/}
                {loading && <div className={"video__data-preloader"}><Lines/></div>}
                {file.path &&
                <div className="video__data">
                    <h2>Video Meta Data</h2>
                    <div className={"video__data-wrapper"}>
                        <div><span className="video__data-meta">Original Name:</span> {file.originalname}</div>
                        <div><span className="video__data-meta">File Name:</span> {file.filename}</div>
                        <div><span className="video__data-meta">Path:</span> {file.path}</div>
                        <div><span className="video__data-meta">FPS:</span> {videoMetaData.fps}</div>
                        <div><span
                            className="video__data-meta">Duration in Seconds:</span> {videoMetaData.durationInSeconds}
                        </div>
                        <div><span className="video__data-meta">Height:</span> {videoMetaData.height}</div>
                        <div><span className="video__data-meta">Width:</span> {videoMetaData.width}</div>
                    </div>
                    <button className="btn--extract" onClick={extractFrames}>Extract frames and display resulting 3D Model
                        {loadingArchive && <div className={"video__data-preloader-archiv"}><Lines animation="slide-left"/></div>}
                    </button>
                    {archiveName.length > 0 &&
                    <div className={"archive-box"}><button className="btn--extract" onClick={downloadFrames}>Create frames archive</button></div>}

                </div>}
                <div className={"acquisitions"}></div>
                <div className={"three-js-container"}></div>
                <div className={"three-js-container_1"}></div>
                <BarChart chartData={chartData} plugins={[ChartDataLabels]} />
                <BarChart1 chartData={chartData2} plugins={[ChartDataLabels]}/>
            </div>
        </React.Fragment>
    )
}

export default App
