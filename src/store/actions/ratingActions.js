import axios from "axios";
import { getItem } from "./itemActions";
import { getUserProfile } from "./profileActions";

export const handleRatingFromItem = (dispatch, rating, item, allRating, toast) => {
  try {
    let rated = allRating.find((rating) => Number(rating.userId) === Number(localStorage.getItem("userID")));
    if (!rated) {
      axios
        .post(
          `${process.env.REACT_APP_HEROKU_API_KEY}/rating`,
          {
            rating,
            ratedId: item.userId,
            userId: localStorage.getItem("userID"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          getItem(dispatch, item.id);
        })
        .catch((err) => {
          console.log(err.response.data);
          toast({
            title: "Error",
            description: `${err.response.data.message}` || "Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      if (rated.rating === rating) {
        axios
          .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            getItem(dispatch, item.id);
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: `${err.response.data.message}` || "Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      } else {
        axios
          .put(
            `${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`,
            { rating },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            getItem(dispatch, item.id);
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: `${err.response.data.message}` || "Please try again.",
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

export const handleRatingFromProfile = (dispatch, rating, id, allRating, toast) => {
  try {
    let rated = allRating.find((rating) => Number(rating.userId) === Number(localStorage.getItem("userID")));
    if (!rated) {
      axios
        .post(
          `${process.env.REACT_APP_HEROKU_API_KEY}/rating`,
          {
            rating,
            ratedId: id,
            userId: localStorage.getItem("userID"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          getUserProfile(dispatch, id);
        })
        .catch((err) => {
          console.log(err.response.data);
          toast({
            title: "Error",
            description: `${err.response.data.message}` || "Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      if (rated.rating === rating) {
        axios
          .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            getUserProfile(dispatch, id);
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: `${err.response.data.message}` || "Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      } else {
        axios
          .put(
            `${process.env.REACT_APP_HEROKU_API_KEY}/rating/${rated.id}`,
            { rating },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            getUserProfile(dispatch, id);
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: `${err.response.data.message}` || "Please try again.",
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
