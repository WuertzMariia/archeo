import React from "react";
import './App.css'
import {useState, useEffect} from "react";

function App() {
    const [data, setData] = React.useState(null);
    const [result, setResult] = useState("No video updated!");
    const [file, setFile] = useState("");

    React.useEffect(() => {
        fetch("http://localhost:3001/api", {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json'
            }

        })
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    const [inputValue, setInputValue] = React.useState("");

    let submitVideo = async () => {
        event.preventDefault()
        try {
            const fileInput = document.getElementById('input');
            let selectedFile;
            selectedFile = fileInput.files[0];
            let data = new FormData()
            data.append('file', selectedFile)
            await fetch("http://localhost:3001/upload", {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => setFile(data.file));
            // const result = await response;
            console.log("Success:", data);
            (result.statusText === "OK" && !!selectedFile) && setResult("Video uploaded!")
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <div>
                <h2>{!data ? "Loading..." : data}</h2>
            </div>
            <form method="POST" action="http://localhost:3001/upload" encType="multipart/form-data">
                <label className="form--margin" htmlFor="file">Choose video file</label>
                <br/>
                <input className="form--margin" type="file" name="file" id={"input"} accept="video/*" value={inputValue}
                       onChange={e => setInputValue(e.target.value)}/>
                <br/>
                <button className="form--margin form__btn" onClick={submitVideo}>Upload video</button>
            </form>
            <h3>{result}</h3>
            {file.path &&
            <div>
                <h2>Video Data</h2>
                <div>Original Name: {file.originalname}</div>
                <div>File Name: {file.filename}</div>
                <div>Path: {file.path}</div>
            </div>}
        </>
    )
}

export default App
