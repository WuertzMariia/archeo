import React, {useEffect, useState} from "react";
import '../App.css'
import {Scatter} from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import BarChart1 from "../Bar1";
// import {options} from "../Upload";
import {Data} from "../Data";
import Header from "../component/Header";
import Chart from "chart.js/auto";
import {CategoryScale, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import {Link} from "react-router-dom";

export const options = {
    plugins: {
        datalabels: {
            display: false
        },
    },
    tooltips: {
        callbacks: {
            label: function () {
                return `test`;
            },
        },
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Laufzeit in Minuten'
            },
            beginAtZero: true,
        },
        x: {
            title: {
                display: true,
                text: 'Anzahl von Keyframes'
            },
            beginAtZero: true,
        },
    },
};
Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
Chart.register(CategoryScale);
Chart.register(ChartDataLabels);
function Account() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartData2, setChartData2] = useState({
        datasets: [],
    });
    useEffect(() => {
        setChartData({
            datasets: [
                {
                    label: "Laufzeit je Bildpaket",
                    data: Data.map((data) => ({
                        x: data.keyframes,
                        y: Math.floor((data.milliseconds / 1000 / 60)),
                    })),
                    pointRadius: Data.map((sampling) => sampling.keyframes / 4),
                    pointHoverRadius: Data.map((sampling) => sampling.keyframes / 3.7),
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
        });

        setChartData2({
            labels: Data.map((sampling) => sampling.name),
            datasets: [{
                label: "Anzahl von Faces",
                data: Data.map((data) => data.faces),
                fill: false,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1
            }]
        });
    }, []);
    return (
        <React.Fragment>
            <div className={"account-content"}>
                <div className={"account-navigation"}>
                    <nav className={"montserrat-300"}>
                        <Link to="/account/profil">Profil</Link>
                        <Link to="/account/profil" className={"active"}>Ihre 3D-Modelle</Link>
                    </nav>
                </div>
                <div className={"account-data"}>
                    <h5>Ihre 3D-Modelle:</h5>
                    <form className={"form-account montserrat-300"}>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_34"/>
                            <label htmlFor="Sauele_0_34">Sauele_0_34</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_51"/>
                            <label htmlFor="Sauele_0_51">Sauele_0_51</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_64"/>
                            <label htmlFor="Sauele_0_64">Sauele_0_64</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_85"/>
                            <label htmlFor="Sauele_0_85">Sauele_0_85</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_128"/>
                            <label htmlFor="Sauele_0_128">Sauele_0_128</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_134"/>
                            <label htmlFor="Sauele_0_134">Sauele_0_134</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked
                                id="1"
                                name="1"
                                value="Sauele_0_192"/>
                            <label htmlFor="Sauele_0_192">Sauele_0_192</label>
                        </div>
                        <button type="submit" className={"btn--primary"}>3D-Modelle evaluieren</button>
                    </form>
                    <Scatter options={options} data={chartData} plugins={[ChartDataLabels]}/>
                    <BarChart1 chartData={chartData2} plugins={[ChartDataLabels]}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Account
