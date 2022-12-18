import { createSlice } from '@reduxjs/toolkit';
const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
        '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
const initialState = {
    item: [],
    reportItems: [],
    userBlocked: [],
    numberUser: 0,
    numberACtiveItems: 0,
    numberSoldItems: 0,
    data: data,
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
            state.data.datasets[0].data = action.payload
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
    getActiveItemsError
} = adminSlice.actions;
export const activeItems = (state) => state.admin;
export default adminSlice.reducer;