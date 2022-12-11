import axios from "axios";

import {
  addItemFailure,
  addItemRequest,
  addItemSuccess,
  deleteItemFailure,
  deleteItemRequest,
  deleteItemSuccess,
  getItemsFailure,
  getItemsRequest,
  getItemsSuccess,
  updateItemFailure,
  updateItemRequest,
  updateItemSuccess,
} from "../features/itemSlicer";

export const getItems = (dispatch, status, category, subCategory) => {
  try {
    dispatch(getItemsRequest());

    let url = "";

    if (!status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items`;
    } else if (status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}`;
    } else if (status && category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}`;
    } else if (status && category && subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}/${subCategory}`;
    }

    axios
      .get(url)
      .then((res) => {
        dispatch(getItemsSuccess(res.data));
        if (status) {
          localStorage.setItem("status", status);
        } else {
          localStorage.removeItem("status");
        }
        if (category) {
          localStorage.setItem("category", category);
        } else {
          localStorage.removeItem("category");
        }
        if (subCategory) {
          localStorage.setItem("subCategory", subCategory);
        } else {
          localStorage.removeItem("subCategory");
        }
      })
      .catch((err) => {
        dispatch(getItemsFailure(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = (dispatch, payload) => {
  dispatch(addItemRequest());

  axios
    .post(`${process.env.REACT_APP_HEROKU_API_KEY}/items`, payload)
    .then((res) => {
      dispatch(addItemSuccess(res.data));
    })
    .catch((err) => {
      dispatch(addItemFailure(err));
    });
};

export const deleteItem = (dispatch, payload) => {
  dispatch(deleteItemRequest());

  axios
    .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/items/${payload}`)
    .then((res) => {
      dispatch(deleteItemSuccess(payload));
    })
    .catch((err) => {
      dispatch(deleteItemFailure(err));
    });
};

export const updateItem = (dispatch, payload) => {
  dispatch(updateItemRequest());

  axios
    .put(`${process.env.REACT_APP_HEROKU_API_KEY}/items/${payload.id}`, payload)
    .then((res) => {
      dispatch(updateItemSuccess(res.data));
    })
    .catch((err) => {
      dispatch(updateItemFailure(err));
    });
};
