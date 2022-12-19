import axios from "axios";
import {
    addReportItem,
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
} from "../features/adminSlicer";

export const addReport = (dispatch, payload, itemId, userId, toast) => {
    payload.preventDefault();
  
    const data = {
        reportTitle: payload.target.reportTitle.value,
        reportMessage: payload.target.reportMessage.value,
        reportReason: payload.target.reportReason.value,
        userId: userId,
        itemId: itemId,
    };
  
    try {
      axios
        .post(`${process.env.REACT_APP_HEROKU_API_KEY}/report`, data)
        .then((res) => {
          dispatch(addReportItem(res.data));
          toast({
            title: "Item Reported",
            description: `Your report has been sent to the admin`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top", 
          });
        })
        .catch((err) => {
          dispatch(getActiveItemsError(err));
        });
    } catch (err) {
      dispatch(getActiveItemsError(err));
    }
  };
    

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

export const blockedUsers = (dispatch, payload) => {
    axios.put(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/${payload}`, {
        status: "blocked"
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => {
            console.log(res.data);
            dispatch(blockedUser(res.data));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        }
        )
}

export const activationUsers = (dispatch, payload) => {
    axios.put(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/${payload}`, {
        status: "active"
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => {
        dispatch(activationUser(payload));
    }).catch((err) => {
        dispatch(getActiveItemsError(err.response.data));
    }
    )
}

export const deletItemReporteds = (dispatch, payload) => {
    axios.delete(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${payload}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => {
        dispatch(deletItemReported(payload));
    }).catch((err) => {
        dispatch(getActiveItemsError(err.response.data));
    }
    )
}


export const getDataCharts = async (dispatch, payload) => {
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    switch (payload.case) {
        case "Sold Items":
            payload.data.forEach((item) => {
                let date = item.endDate.slice(0, 10);
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
                arr3.push(arr[i].date.slice(5, 10));
            }
            dispatch(getDataChart({ arr2, arr3 }));
            break;
        case "Active Items":
            payload.data.forEach((item) => {
                let date = item.startDate.slice(0, 10);
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
                arr3.push(arr[i].date.slice(5, 10));

            }
            dispatch(getDataChart({ arr2, arr3 }));
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
                    arr3.push(arr[i].date.slice(5, 10));
                }
                dispatch(getDataChart({ arr2, arr3 }));
            }).catch((err) => {
                dispatch(getActiveItemsError(err.response.data));
            }
            )
            break;
        default:
            break;

    }
}

