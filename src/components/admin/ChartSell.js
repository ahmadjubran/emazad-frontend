import { Line } from 'react-chartjs-2'
import "chart.js/auto";
import { useSelector } from 'react-redux';

const options = {
    maintainAspectRatio: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                borderDash: [3, 3],
            },
            beginAtZero: true, // this works
        },
    },
    plugins: {
        legend: {
            display: false
        }
    }
}

const ChartSell = () => {
    const admin = useSelector(state => state.admin);
    return (
        <Line
            data={admin.data}
            options={options}
        />
    )
}

export default ChartSell;
