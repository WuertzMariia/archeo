import React, {useEffect} from "react";
import './App.css'
import Upload from "./Upload";
import {Lines} from "react-preloaders";
// Use the correct import path for the 'three' module
import * as THREE from './three';
import {OBJLoader} from './OBJLoader';
import {OrbitControls} from './OrbitControls';
import Chart from 'chart.js/auto';
function App() {
    const [loading, setLoading] = React.useState(null);

    /**
     * Server check
     */
    React.useEffect(() => {
        try {
            console.log("FETCH")
            fetch("http://localhost:3001/api", {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': 'application/json'
                }

            })
                .then((res) => setLoading(false))
        } catch (e) {
            console.log("Error:", e)
        }
    }, []);


    return (
        <React.Fragment>
            <Upload/>
            <Lines customLoading={loading}/>
        </React.Fragment>
    );
}

export default App
