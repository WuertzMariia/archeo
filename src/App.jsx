import React from "react";
import './App.css'
import Upload from "./Upload";
import {Lines} from "react-preloaders";
function App() {
    const [loading, setLoading] = React.useState(null);

    /**
     * Server check
     */
    React.useEffect(() => {
        try {
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
            <Upload />
            <Lines customLoading={loading}/>
        </React.Fragment>
    );
}

export default App
