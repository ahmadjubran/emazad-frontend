import { createSlice } from '@reduxjs/toolkit';
const data = {
    labels: [],
    datasets: [
        {
            label: 'My Balance',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#5BCCD9',
            borderColor: '#18778C',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: '#18778C',
            pointBorderColor: '#18778C',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#18778C',
            pointHoverBorderColor: '#18778C',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
        },
    ],
}

const dataPie = {
    labels: ['Active Items', 'Sold Items'],
    datasets: [
        {
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const initialState = {
    item: [],
    reportItems: [],
    userBlocked: [],
    numberUser: 0,
    numberACtiveItems: 0,
    numberSoldItems: 0,
    data: data,
    dataPie: dataPie,
    messageError: null,

}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        getActiveItems: (state, action) => {
            state.item = action.payload
            state.numberACtiveItems = action.payload.length
        },
        getSoldItems: (state, action) => {
            state.item = action.payload
            state.numberSoldItems = action.payload.length
        },
        getBlockedItems: (state, action) => {
            state.reportItems = action.payload
        },
        getUserBlocked: (state, action) => {
            state.userBlocked = action.payload
        }, getNumerUser: (state, action) => {
            state.numberUser = action.payload
        },
        getDataChart: (state, action) => {
            state.data.datasets[0].data = action.payload.arr2;
            state.data.labels = action.payload.arr3;
            state.dataPie.datasets[0].data = [state.numberACtiveItems, state.numberSoldItems];
            // console.log(state.dataPie);
        },
        blockedUser: (state, action) => {
            state.userBlocked = [...state.userBlocked, action.payload]
        },
        activationUser: (state, action) => {
            const usersBlock = state.userBlocked.filter(user => user.id !== action.payload)
            state.userBlocked = usersBlock;
        },
        deletItemReported: (state, action) => {
            const itemsReported = state.reportItems.filter(item => item.id !== action.payload)
            state.reportItems = itemsReported;
        },
        getActiveItemsError: (state, action) => {
            state.messageError = action.payload
        },
    },
})

export const {
    getActiveItems,
    getSoldItems,
    getBlockedItems,
    getUserBlocked,
    getNumerUser,
    getDataChart,
    blockedUser,
    activationUser,
    deletItemReported,
    getActiveItemsError
} = adminSlice.actions;
export const activeItems = (state) => state.admin;
export default adminSlice.reducer;