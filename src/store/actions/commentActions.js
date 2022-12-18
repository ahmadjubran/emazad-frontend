import axios from "axios";
import {
  addCommentSuccess,
  deleteCommentSuccess,
  ItemFail,
  ItemRequest,
  updateCommentSuccess,
} from "../features/itemSlicer";

export const addComment = (dispatch, itemId, comment) => {
  try {
    dispatch(ItemRequest());
    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/comment`, {
        itemId,
        comment,
        userId: localStorage.getItem("userID"),
      })
      .then((res) => {
        dispatch(addCommentSuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (dispatch, id) => {
  try {
    dispatch(ItemRequest());
    axios
      .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/comment/${id}`)
      .then((res) => {
        dispatch(deleteCommentSuccess(id));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const editComment = (dispatch, id, comment) => {
  try {
    dispatch(ItemRequest());
    axios
      .put(`${process.env.REACT_APP_HEROKU_API_KEY}/comment/${id}`, { comment })
      .then((res) => {
        dispatch(updateCommentSuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};
