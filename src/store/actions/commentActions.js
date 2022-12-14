import axios from "axios";
import { getItem } from "./itemActions";

// export const addComment = (dispatch, itemId, comment) => {
//   try {
//     dispatch(ItemRequest());
//     axios
//       .post(`${process.env.REACT_APP_HEROKU_API_KEY}/comment`, {
//         itemId,
//         comment,
//         userId: localStorage.getItem("userID"),
//       })
//       .then((res) => {
//         dispatch(addCommentSuccess(res.data));
//       })
//       .catch((err) => {
//         dispatch(ItemFail(err));
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addComment = (dispatch, itemId, comment) => {
  try {
    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/comment`, {
        itemId,
        comment,
        userId: localStorage.getItem("userID"),
      })
      .then((res) => {
        getItem(dispatch, itemId);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
