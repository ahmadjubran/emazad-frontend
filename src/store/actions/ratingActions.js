import axios from "axios";
import { getItem } from "./itemActions";

export const handleRating = (dispatch, rating, id, userRating) => {
  try {
    const rated = userRating.rating.find((rate) => rate.userId === localStorage.getItem("userID"));
    if (!rated) {
      axios
        .post(`${process.env.REACT_APP_HEROKU_API_KEY}/rating`, {
          rating,
          ratedId: id,
          userId: localStorage.getItem("userID"),
        })
        .then((res) => {
          getItem(dispatch, id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (rated.rating === rating) {
        axios
          .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`)
          .then((res) => {
            getItem(dispatch, id);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`, { rating })
          .then((res) => {
            getItem(dispatch, id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
