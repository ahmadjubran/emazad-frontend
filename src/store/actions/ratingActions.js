import axios from "axios";
import { getItem } from "./itemActions";

export const handleRating = (dispatch, rating, item, allRating) => {
  try {
    let rated = allRating.find((rating) => Number(rating.userId) === Number(localStorage.getItem("userID")));
    if (!rated) {
      axios
        .post(`${process.env.REACT_APP_HEROKU_API_KEY}/rating`, {
          rating,
          ratedId: item.userId,
          userId: localStorage.getItem("userID"),
        })
        .then((res) => {
          getItem(dispatch, item.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (rated.rating === rating) {
        axios
          .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`)
          .then((res) => {
            getItem(dispatch, item.id);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`, { rating })
          .then((res) => {
            getItem(dispatch, item.id);
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
