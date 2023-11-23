import React from "react";
import './App.css'
import {useState, useEffect} from "react";

function App() {
    const [data, setData] = React.useState(null);
    const [result, setResult] = useState("No video updated!");
    const [file, setFile] = useState("");
    const [archiveName, setArchiveName] = useState("");

    /**
     * Server check
     */
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
                    document.querySelector(".video__data").appendChild(link);
                    link.addEventListener("click", e => {
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
                    "fileName": file.filename.substring(0, file.filename.indexOf("."))
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setArchiveName(res.fileNameComplete)
                    console.log(archiveName)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            // const result = await response;
        } catch (e) {
            console.log("Error:", e)
        }
    }
    /**
     * Sumbit video
     * @returns {Promise<void>}
     */
    let submitVideo = async () => {
        event.preventDefault()
        try {
            setResult("No video uploaded");
            setFile("")
            setArchiveName("")

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
            (file.path.length > 0 && !!selectedFile) && setResult("Video uploaded!")
            console.log(result, "result")
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
                       onChange={e => {
                           setInputValue(e.target.value)
                           setResult("No video uploaded");
                           setFile("")
                           setArchiveName("")
                       }}/>
                <br/>
                <button className="form--margin form__btn" onClick={submitVideo}>Upload video</button>
            </form>
            <h3 className="result">{result}</h3>
            {file.path &&
            <div className="video__data">
                <h2>Video Data</h2>
                <div>Original Name: {file.originalname}</div>
                <div>File Name: {file.filename}</div>
                <div>Path: {file.path}</div>
                <button className="btn--extract" onClick={extractFrames}>Extract all frames from this video?</button>
                {archiveName.length > 0 &&
                <button className="btn--extract" onClick={downloadFrames}>Generate Link to download frames as archive</button>}
            </div>}
        </>
    )
}

export default App
