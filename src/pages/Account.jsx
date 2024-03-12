import React, {useEffect, useState} from "react";
import '../App.css'
import {Scatter} from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import BarChart1 from "../Bar1";
// import {options} from "../Upload";
import {Data} from "../Data";
import Header from "../component/Header";

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
                text: 'Time building 3D model (in minutes)'
            },
            beginAtZero: true,
        },
        x: {
            title: {
                display: true,
                text: 'Number of Keyframes'
            },
            beginAtZero: true,
        },
    },
};

function Overview() {
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
                    label: "Keyframes",
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
                label: "Number of faces",
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
            <Header/>
            <div className={"account-content"}>
                <Scatter options={options} data={chartData} plugins={[ChartDataLabels]}/>
                <BarChart1 chartData={chartData2} plugins={[ChartDataLabels]}/>
            </div>
        </React.Fragment>
    )
}

export default Overview
