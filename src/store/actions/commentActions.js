import axios from "axios";
import {
  addCommentSuccess,
  deleteCommentSuccess,
  ItemFail,
  ItemRequest,
  updateCommentSuccess,
} from "../features/itemSlicer";

export const addComment = (dispatch, itemId, comment, toast) => {
  try {
    dispatch(ItemRequest());
    axios
      .post(
        `${process.env.REACT_APP_HEROKU_API_KEY}/comment`,
        {
          itemId,
          comment,
          userId: localStorage.getItem("userID"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      .then((res) => {
        dispatch(addCommentSuccess(res.data));
        toast({
          description: `Comment Added`,
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

export const deleteComment = (dispatch, id, toast) => {
  try {
    dispatch(ItemRequest());
    axios
      .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(deleteCommentSuccess(id));
        toast({
          description: `Comment Deleted`,
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

export const editComment = (dispatch, id, comment, toast) => {
  try {
    dispatch(ItemRequest());
    axios
      .put(
        `${process.env.REACT_APP_HEROKU_API_KEY}/comment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(updateCommentSuccess(res.data));
        toast({
          description: "Comment Updated",
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
