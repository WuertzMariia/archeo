// eslint-disable-next-line no-unused-vars
import React from "react";
import '../App.css'

function Archive () {
    // const [loadingArchive, setLoadingArchive] = useState(false);

    /**
     * Download frames
     * @returns {Promise<void>}
    //  */
    // let downloadFrames = async () => {
    //     console.log(archiveName)
    //     fetch("http://localhost:3001/download", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "archiveName": archiveName
    //         }),
    //
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const contentType = response.headers.get('content-type');
    //
    //             // Check if the content type is a ZIP file
    //             if (contentType === 'application/zip') {
    //                 // Convert the response to a blob and create a link to download the file
    //                 console.log(contentType)
    //                 return response.blob();
    //             } else {
    //                 console.error('The requested file is not a ZIP file. Content type:', contentType);
    //             }
    //         })
    //         .then(blob => {
    //             if (blob) {
    //                 const link = document.createElement('a');
    //                 const objectUrl = URL.createObjectURL(blob);
    //
    //                 link.href = objectUrl;
    //                 // Use a default filename on the client side
    //                 link.download = 'download';
    //                 link.innerHTML = "Frames.zip"
    //                 document.querySelector(".archive-box").appendChild(link);
    //                 link.addEventListener("click", () => {
    //                     // document.body.removeChild(link);
    //                     // URL.revokeObjectURL(objectUrl);
    //                 })
    //             } else {
    //                 console.error('No blob received from the server.');
    //             }
    //
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }
    // return (
    //     <React.Fragment>
    //         <div className={"overview"}>
    //             <p className={"montserrat-500"}><span>AutoMeshCraft</span> - ist eine webbasierte Anwendung für
    //                 die
    //                 videobasierte 3D-Rekonststruktion und Evaluation videogrammetrischer Algorithmen.
    //             </p>
    //             <p className={"montserrat-500"}>
    //                 Sie suchen eine professionelle und benutzerfreundliche Anwendung für die videobasierte
    //                 3D-Rekonstruktion?
    //             </p>
    //
    //             <p className={"montserrat-500"}>
    //                 Beginnen Sie jetzt mit dem Hochladen Ihres Videos!
    //             </p>
    //         </div>
    //     </React.Fragment>
    // )
}

export default Archive
