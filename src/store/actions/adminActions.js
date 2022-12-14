import axios from "axios";
import {
    getActiveItems,
    getSoldItems,
    getBlockedItems,
    getUserBlocked,
    getActiveItemsError
} from "../features/adminSlicer";
// router.get("/items/:status", getItems);
// router.get("/report", getReport);
// router.put("/profile/:id", uploadUserImg, bearerAuth, updateUserProfile);


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
    axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/report`)
        .then((res) => {
            dispatch(getBlockedItems(res.data));
        }).catch((err) => {
            dispatch(getActiveItemsError(err.response.data));
        })
}

// export const getUserBlocked = (dispatch) => {
