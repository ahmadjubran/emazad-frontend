import axios from "axios";
import { getItem } from "./itemActions";

export const handleFavorite = (dispatch, item, allFavorites, toast) => {
  try {
    let favorite = allFavorites.find((favorite) => Number(favorite.userId) === Number(localStorage.getItem("userID")));
    if (!favorite) {
      axios
        .post(`${process.env.REACT_APP_HEROKU_API_KEY}/favorite`, {
          itemId: item.id,
          userId: localStorage.getItem("userID"),
        })
        .then((res) => {
          getItem(dispatch, item.id);
          toast({
            description: "Item added to favorites.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "Please login to favorite items.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      axios
        .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/favorite/${favorite.id}`)
        .then((res) => {
          getItem(dispatch, item.id);
          toast({
            description: "Item removed from favorites.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "Please login to favorite items.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    }
  } catch (error) {
    console.log(error);
  }
};
