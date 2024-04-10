import React from "react";
import { Pie } from "react-chartjs-2";
import Typography from "@mui/material/Typography";

function PieChart({ chartData }) {
    return (
        <div className="chart-container">
            <Typography component="h1" variant="h4">Score</Typography>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        }
                    }
                }}
            />
        </div>
    );
}

export default PieChart;