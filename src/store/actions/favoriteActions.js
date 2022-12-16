import axios from "axios";
import { getItem } from "./itemActions";

export const handleFavorite = (dispatch, item, allFavorites) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/favorite/${favorite.id}`)
        .then((res) => {
          getItem(dispatch, item.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
