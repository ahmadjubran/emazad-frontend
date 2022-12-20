import axios from "axios";
import { addReplySuccess, deleteReplySuccess, ItemFail, ItemRequest, updateReplySuccess } from "../features/itemSlicer";

export const addReply = (dispatch, comment, reply, toast) => {
  try {
    dispatch(ItemRequest());
    axios
      .post(
        `${process.env.REACT_APP_HEROKU_API_KEY}/reply`,
        {
          commentId: comment.id,
          reply,
          userId: localStorage.getItem("userID"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(addReplySuccess(res.data));
        toast({
          description: "Reply Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error Adding Reply",
          description: `${err.response.data}` || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteReply = (dispatch, reply, toast) => {
  try {
    dispatch(ItemRequest());
    axios
      .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/reply/${reply.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(deleteReplySuccess(reply));
        toast({
          description: "Reply Deleted Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error Deleting Reply",
          description: `${err.response.data}` || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const editReply = (dispatch, id, reply, toast) => {
  try {
    dispatch(ItemRequest());
    axios
      .put(
        `${process.env.REACT_APP_HEROKU_API_KEY}/reply/${id}`,
        { reply },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(updateReplySuccess(res.data));
        toast({
          description: "reply has been updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error Editing Reply",
          description: `${err.response.data}` || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
