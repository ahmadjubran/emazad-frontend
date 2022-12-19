import axios from "axios";
import { getItem } from "./itemActions";

export const handleRating = (dispatch, rating, item, allRating, toast) => {
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
          toast({
            title: "Error",
            description: "Please login to rate items.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      if (rated.rating === rating) {
        axios
          .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`)
          .then((res) => {
            getItem(dispatch, item.id);
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: "Please login to rate items.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      } else {
        axios
          .put(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`, { rating })
          .then((res) => {
            getItem(dispatch, item.id);
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: "Please login to rate items.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
