import React from "react";
import '../App.css'

function StartPageActionWidget () {

    return (
        <React.Fragment>
            <div>
                <button className="btn--extract">3D Modell exportieren</button>
                <button className="btn--extract">3D Modell speichern</button>
            </div>
        </React.Fragment>
    )
}

export default StartPageActionWidget
