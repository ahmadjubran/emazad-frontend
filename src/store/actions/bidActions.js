import axios from "axios";

import { addBidFailure, addBidRequest, addBidSuccess } from "../features/itemSlicer";
import { getItems } from "./itemActions";

export const addBid = (dispatch, itemId, bidprice) => {
  try {
    dispatch(addBidRequest());

    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/bid`, { itemId, bidprice, userId: 3 })
      .then((res) => {
        dispatch(addBidSuccess(res.data));
        getItems(
          dispatch,
          localStorage.getItem("status"),
          localStorage.getItem("category"),
          localStorage.getItem("subCategory")
        );
      })
      .catch((err) => {
        dispatch(addBidFailure(err));
      });
  } catch (err) {
    console.log(err);
  }
};
