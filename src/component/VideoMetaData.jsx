import React from "react";
import '../App.css'

function VideoData ({file, videoMetaData}) {
    return (
        <React.Fragment>
            <div className="video__data">
                <h5>Video-Metadaten:</h5>
                <div className={"video__data-wrapper"}>
                    <div><span className="video__data-meta">Name:</span> {file.originalname}</div>
                    <div><span className="video__data-meta">Name mit dem Timestamp:</span> {file.filename}</div>
                    <div><span className="video__data-meta">Pfad:</span> {file.path}</div>
                    <div><span className="video__data-meta">FPS:</span> {videoMetaData.fps}</div>
                    <div><span
                        className="video__data-meta">Dauer in Sekunden:</span> {videoMetaData.durationInSeconds}
                    </div>
                    <div><span className="video__data-meta">Höhe:</span> {videoMetaData.height}</div>
                    <div><span className="video__data-meta">Breite:</span> {videoMetaData.width}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default VideoData
