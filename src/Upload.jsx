import React from "react";
import './App.css'
import {useState, useEffect} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Lines} from "react-preloaders";

function App() {
    const [file, setFile] = useState("");
    const [archiveName, setArchiveName] = useState("");
    const [videoMetaData, setVideoMetaData] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingArchive, setLoadingArchive] = useState(false);

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
                    "fileName": file.filename.substring(0, file.filename.indexOf("."))
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
            setArchiveName("")
            setLoading(true)

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
                    console.log(videoMetaData)
                    setLoading(false)
                });

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <React.Fragment>
            <div>
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
                    <button className="btn--extract" onClick={extractFrames}>Extract all frames from this video?
                        {loadingArchive && <div className={"video__data-preloader-archiv"}><Lines animation="slide-left"/></div>}
                    </button>
                    {archiveName.length > 0 &&
                    <div className={"archive-box"}><button className="btn--extract" onClick={downloadFrames}>Create frames archive</button></div>}

                </div>}
            </div>
        </React.Fragment>
    )
}

export default App
