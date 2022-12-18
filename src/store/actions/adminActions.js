import axios from "axios";
import {
    getActiveItems,
    getSoldItems,
    getBlockedItems,
    getUserBlocked,
    getNumerUser,
    getDataChart,
    getActiveItemsError
} from "../features/adminSlicer";

export const getActiveItem = (dispatch) => {
    axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/items/active`)
        .then((res) => {
            dispatch(getActiveItems(res.data));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        }
        )
}

export const getSoldItem = (dispatch) => {
    axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/items/sold`)
        .then((res) => {
            dispatch(getSoldItems(res.data));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        })
}

export const getBlockedItem = (dispatch) => {
    axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/reportItems`)
        .then((res) => {
            dispatch(getBlockedItems(res.data));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        })
}

export const getUsersBlocked = (dispatch) => {

    axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/usersBlocked`)
        .then((res) => {
            dispatch(getUserBlocked(res.data));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        }
        )
}


export const getNumberUsers = (dispatch) => {

    axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => {
            dispatch(getNumerUser(res.data.length));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        }
        )
}


export const getDataCharts = async (dispatch, payload) => {
    console.log("from action data charts")
    let arr = [];
    let arr2 = [];
    switch (payload.case) {
        case "Sold Items":
            payload.data.forEach((item) => {
                let date = item.endDate.slice(0, 10);
                console.log(date);
                // console.log(item.data);
                let obj = arr.find((i) => i.date === date);
                if (obj) {
                    obj.count++;
                } else {
                    arr.push({ date, count: 1 });
                }
            }
            )
            for (let i = arr.length - 1; i >= 0; i--) {
                arr2.push(arr[i].count);
            }
            console.log(arr2)
            dispatch(getDataChart(arr2));
            break;
        case "Active Items":
            payload.data.forEach((item) => {
                let date = item.startDate.slice(0, 10);
                console.log(date);
                // console.log(item.data);
                let obj = arr.find((i) => i.date === date);
                if (obj) {
                    obj.count++;
                } else {
                    arr.push({ date, count: 1 });
                }
            }
            )
            for (let i = arr.length - 1; i >= 0; i--) {
                arr2.push(arr[i].count);
            }
            console.log(arr2);
            dispatch(getDataChart(arr2));
            break;
        case "Users":
            await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) => {
                const users = res.data;
                users.forEach((user) => {
                    let date = user.createdAt.slice(0, 10);
                    console.log(date);
                    // console.log(item.data);
                    let obj = arr.find((i) => i.date === date);
                    if (obj) {
                        obj.count++;
                    } else {
                        arr.push({ date, count: 1 });
                    }
                }
                )
                for (let i = arr.length - 1; i >= 0; i--) {
                    arr2.push(arr[i].count);
                }
                console.log(arr2);
                dispatch(getDataChart(arr2));
            }).catch((err) => {
                dispatch(getActiveItemsError(err.response.data));
            }
            )
            break;
        default:
            break;

    }
}

