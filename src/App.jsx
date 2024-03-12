import React from "react";
import './App.css'
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import Account from "./pages/Account";
import Chart from "chart.js/auto";
import {CategoryScale, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Lines} from "react-preloaders";
import Header from "./component/Header";
Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function App() {
    const [loading, setLoading] = React.useState(true);

    /**
     * Server check
     */
    React.useEffect(() => {
        try {
            fetch("http://localhost:3001/api", {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json"
                }

            })
                .then((res) => setLoading(false))
        } catch (e) {
            console.log("Error:", e)
        }
    }, []);


    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home loading={loading}/>}/>
                <Route exact path="/account" element={<Account />}/>
            </Routes>
            {loading && <Lines/>}
        </Router>
    );
}

export default App
