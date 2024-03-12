import React from "react";
import './App.css'
import './css/AccountContent.css'
import './css/Model.css'
import './css/Form.css'
import './css/Header.css'
import './css/VideoData.css'
import './css/Buttons.css'
import './css/FileUploader.css'
import './css/Typography.css'
import {useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Lines} from "react-preloaders";
import Header from "./component/Header";
import Overview from "./component/Overview";
import VideoData from "./component/VideoMetaData";
import Model from "./component/Model";
import ImgSelectionSettingsForm from "./component/ImgSelectionSettingsForm";
import StartPageActionWidget from "./component/StartPageActionWidget";



const fileTypes = ["mp4", "avi", "mpg", "mpg", "mov", "webm", "mkv", "mov", "wmv"];

function Home() {
    const [file, setFile] = useState("");
    const [videoMetaData, setVideoMetaData] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = (uploadedFile) => {
        setFile("")
        submitVideo(uploadedFile)
    };

    /**
     * Sumbit video
     * @returns {Promise<void>}
     */
    let submitVideo = async (uploadedFile) => {
        event.preventDefault()
        try {
            setLoading(true)
            setVideoMetaData("")
            let data = new FormData()
            data.append("file", uploadedFile)
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
            console.error("Error beim Upload:", error);
        }
    }

    return (
        <React.Fragment>
            <div className={"main-content montserrat-300"}>
                    <Overview/>
                    <div className={"file-uploader"}>
                        <FileUploader handleChange={handleUpload} multiple={false} name="file" types={fileTypes}/>
                    </div>
                    {file.path && <VideoData file={file} videoMetaData={videoMetaData}/>}
                    {file.path && <ImgSelectionSettingsForm file={file} videoMetaData={videoMetaData}/>}
                    {loading && <div className={"video__data-preloader"}><Lines/></div>}
                    <Model/>
                    <StartPageActionWidget/>
            </div>
        </React.Fragment>
    )
}

export default Home
