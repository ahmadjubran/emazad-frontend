import axios from "axios";
import { getTrendingItems, getTrendingItemsError } from "../features/trendingSlicer";

export const getTrend = (dispatch) => {

    try {
        axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/trending`)
            .then((res) => {
                console.log(res.data);
                dispatch(getTrendingItems(res.data));
            })
            .catch((err) => {
                console.log("error");
                dispatch(getTrendingItemsError(err));
            })
    }
    catch (error) {
        dispatch(getTrendingItemsError(error));
    }
}

