import React, {useEffect} from "react";
import './App.css'
import Upload from "./Upload";
import {Lines} from "react-preloaders";
// Use the correct import path for the 'three' module
import * as THREE from './three';
import {OBJLoader} from './OBJLoader';
import {OrbitControls} from './OrbitControls';
import Chart from 'chart.js/auto';
import Header from "./component/Header";
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import About from "./pages/Account";
import Users from "./component/Overview";

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
        <Router>
            <Routes>
                <Route exact path="/" element={<Upload />}/>
                <Route exact path="/account" element={<About />}/>
            </Routes>
        </Router>
    );
}

export default App
