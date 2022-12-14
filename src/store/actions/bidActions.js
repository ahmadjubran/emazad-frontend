import axios from "axios";

import { addBidSuccess, ItemFail, ItemRequest } from "../features/itemSlicer";
import { getItem, getItems } from "./itemActions";

export const addBid = (dispatch, itemId, bidprice) => {
  try {
    dispatch(ItemRequest());

    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/bid`, { itemId, bidprice, userId: localStorage.getItem("userID") })
      .then((res) => {
        dispatch(addBidSuccess(res.data));
        getItem(dispatch, itemId);
        getItems(
          dispatch,
          localStorage.getItem("status"),
          localStorage.getItem("category"),
          localStorage.getItem("subCategory")
        );
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};
