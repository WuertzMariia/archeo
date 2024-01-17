// components/BarChart.js
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line react/prop-types
const BarChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        datalabels: {
                            display: true,
                            color: "#404244"
                        },
                        title: {
                            display: true,
                            text: "Number of faces"
                        },
                        legend: {
                            display: true
                        },
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default BarChart