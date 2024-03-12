import React, {useState} from "react";
import '../App.css'
import {Lines} from "react-preloaders";

function Overview({file, videoMetaData}) {

    const [loading, setLoading] = useState(false);

    let inputChange = () => {}
    /**
     * Extract frames
     * @returns {Promise<void>}
     */
    let extractFrames = async () => {
        try {
            await fetch("http://localhost:3001/extract", {
                method: "POST",
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
                .catch(error => {
                    console.error('Error:', error);
                });
        } catch (e) {
            console.log("Error:", e)
        }
    }

    return (
        <React.Fragment>
            <div className="form-container is-disabled">
                <h5>Methode für die Keyframes Extraktion:</h5>
                <form encType="multipart/form-data" className={"key_data_form"}>
                    <select name="options" id="options" className={"montserrat-500"}>
                        <option value="festeZahl">Feste Bildauswahl</option>
                        <option value="JKeyFramer">JKeyFramer</option>
                    </select>
                    <div className={"form-control"}>
                        <label htmlFor="fname">FPS</label>
                        <input type="text" value={1} onClick={inputChange}
                               placeholder={"Geben Sie die Anzahl der FPS an"}/>
                    </div>
                </form>
            </div>
            <button className="btn--extract" onClick={extractFrames}>3D Modell erstellen</button>
            {loading && <div className={"video__data-preloader"}><Lines/></div>}
        </React.Fragment>
    )
}

export default Overview
