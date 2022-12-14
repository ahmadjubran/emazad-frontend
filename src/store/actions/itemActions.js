import axios from "axios";

import {
  ItemFail,
  ItemRequest,
  addItemSuccess,
  getItemSuccess,
  deleteItemSuccess,
  getItemsSuccess,
  getUserRatingSuccess,
  updateItemSuccess,
} from "../features/itemSlicer";

export const getItems = (dispatch, status, category, subCategory) => {
  try {
    dispatch(ItemRequest());

    let url = "";

    if (!status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items`;
    } else if (status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}`;
    } else if (status && category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}`;
    } else if (status && category && subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}/${
        subCategory === "All" ? "" : subCategory
      }`;
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
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getItem = (dispatch, id) => {
  try {
    dispatch(ItemRequest());

    axios
      .get(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${id}`)
      .then((res) => {
        dispatch(getItemSuccess(res.data));
        dispatch(ItemRequest());
        axios
          .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userRating/${res.data.User.id}`)
          .then((res) => {
            dispatch(getUserRatingSuccess(res.data));
          })
          .catch((err) => {
            dispatch(ItemFail(err));
          });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = (dispatch, payload) => {
  dispatch(ItemRequest());

  axios
    .post(`${process.env.REACT_APP_HEROKU_API_KEY}/items`, payload)
    .then((res) => {
      dispatch(addItemSuccess(res.data));
    })
    .catch((err) => {
      dispatch(ItemFail(err));
    });
};

export const deleteItem = (dispatch, payload) => {
  dispatch(ItemRequest());

  axios
    .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/items/${payload}`)
    .then((res) => {
      dispatch(deleteItemSuccess(payload));
    })
    .catch((err) => {
      dispatch(ItemFail(err));
    });
};

export const updateItem = (dispatch, payload) => {
  dispatch(ItemRequest());

  axios
    .put(`${process.env.REACT_APP_HEROKU_API_KEY}/items/${payload.id}`, payload)
    .then((res) => {
      dispatch(updateItemSuccess(res.data));
    })
    .catch((err) => {
      dispatch(ItemFail(err));
    });
};
