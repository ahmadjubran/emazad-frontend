import axios from "axios";

import { addBidSuccess, ItemFail, ItemRequest } from "../features/itemSlicer";

export const addBid = (dispatch, itemId, bidprice, toast) => {
  try {
    dispatch(ItemRequest());

    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/bid`, { itemId, bidprice, userId: localStorage.getItem("userID") })
      .then((res) => {
        dispatch(addBidSuccess(res.data));
        console.log(res.data);
        toast({
          title: "Success",
          description: `You have successfully bid on this item with a bid price of $${res.data.bidprice}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error",
          description: `${err.response.data.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
