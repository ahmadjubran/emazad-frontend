import axios from "axios";
import { addReplySuccess, deleteReplySuccess, ItemFail, ItemRequest, updateReplySuccess } from "../features/itemSlicer";

export const addReply = (dispatch, comment, reply) => {
  try {
    dispatch(ItemRequest());
    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/reply`, {
        commentId: comment.id,
        reply,
        userId: localStorage.getItem("userID"),
      })
      .then((res) => {
        dispatch(addReplySuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteReply = (dispatch, reply) => {
  try {
    dispatch(ItemRequest());
    axios
      .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/reply/${reply.id}`)
      .then((res) => {
        dispatch(deleteReplySuccess(reply));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const editReply = (dispatch, id, reply) => {
  try {
    dispatch(ItemRequest());
    axios
      .put(`${process.env.REACT_APP_HEROKU_API_KEY}/reply/${id}`, { reply })
      .then((res) => {
        dispatch(updateReplySuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};
