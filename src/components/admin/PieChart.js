import React from 'react';
import { useSelector } from 'react-redux';
import "chart.js/auto";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);


const data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
            'red',
            'blue',
            'yellow'
        ]
    },
    ],
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ],
};

function PieChart() {
    const admin = useSelector(state => state.admin);
    console.log(admin.dataPie)
    return (
        <div>
            < Doughnut data={admin.dataPie} />

        </div>
    )
}

export default PieChart;
