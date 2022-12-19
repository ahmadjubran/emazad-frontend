import axios from "axios";

import { addBidSuccess, ItemFail, ItemRequest } from "../features/itemSlicer";

export const addBid = (dispatch, itemId, bidprice, toast) => {
  try {
    dispatch(ItemRequest());

    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/bid`, { itemId, bidprice, userId: localStorage.getItem("userID") })
      .then((res) => {
        dispatch(addBidSuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error",
          description: `${err.response.data.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  } catch (err) {
    console.log(err);
  }
};
