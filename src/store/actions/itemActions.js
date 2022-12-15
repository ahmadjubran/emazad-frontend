import axios from "axios";

import {
  ItemFail,
  ItemRequest,
  addItemSuccess,
  getItemSuccess,
  deleteItemSuccess,
  getItemsSuccess,
  getUserRatingSuccess,
  updateItemSuccess,
} from "../features/itemSlicer";

export const getItems = (dispatch, status, category, subCategory) => {
  try {
    dispatch(ItemRequest());

    let url = "";

    if (!status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items`;
    } else if (status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}`;
    } else if (status && category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}`;
    } else if (status && category && subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}/${
        subCategory === "All" ? "" : subCategory
      }`;
    }

    axios
      .get(url)
      .then((res) => {
        dispatch(getItemsSuccess(res.data));
        if (status) {
          localStorage.setItem("status", status);
        } else {
          localStorage.removeItem("status");
        }
        if (category) {
          localStorage.setItem("category", category);
        } else {
          localStorage.removeItem("category");
        }
        if (subCategory) {
          localStorage.setItem("subCategory", subCategory);
        } else {
          localStorage.removeItem("subCategory");
        }
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getItem = (dispatch, id) => {
  try {
    dispatch(ItemRequest());

    axios
      .get(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${id}`)
      .then((res) => {
        dispatch(getItemSuccess(res.data));
        dispatch(ItemRequest());
        axios
          .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userRating/${res.data.User.id}`)
          .then((res) => {
            dispatch(getUserRatingSuccess(res.data));
          })
          .catch((err) => {
            dispatch(ItemFail(err));
          });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = (dispatch, payload, imageURL, userId) => {
  payload.preventDefault();

  const data = {
    itemTitle: payload.target.itemTitle.value,
    itemDescription: payload.target.itemDescription.value,
    itemImage: imageURL,
    category: payload.target.category.value,
    subCategory: payload.target.subCategory.value,
    itemCondition: payload.target.itemCondition.value,
    initialPrice: Number(payload.target.initialPrice.value),
    startDate: new Date(payload.target.startDate.value).toISOString(),
    endDate: new Date(payload.target.endDate.value).toISOString(),
    userId: userId,
  };

  try {
    dispatch(ItemRequest());
    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/item`, data)
      .then((res) => {
        dispatch(addItemSuccess(res.data));
        // console.log(res.data);
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    // console.log(err);
    dispatch(ItemFail(err));
  }
};

export const editItem = (dispatch, payload, imageURL, userId) => {
  payload.preventDefault();

  const data = {
    itemTitle: payload.target.itemTitle.value,
    itemDescription: payload.target.itemDescription.value,
    itemImage: imageURL,
    category: payload.target.category.value,
    subCategory: payload.target.subCategory.value,
    itemCondition: payload.target.itemCondition.value,
    initialPrice: Number(payload.target.initialPrice.value),
    startDate: new Date(payload.target.startDate.value).toISOString(),
    endDate: new Date(payload.target.endDate.value).toISOString(),
    userId: userId,
  };

  try {
    dispatch(ItemRequest());
    axios
      .put(`${process.env.REACT_APP_HEROKU_API_KEY}/item/13`, data)
      .then((res) => {
        dispatch(updateItemSuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    // console.log(err);
    dispatch(ItemFail(err));
  }
};

export const deleteItem = (dispatch, payload) => {
  dispatch(ItemRequest());

  axios
    .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/items/${payload}`)
    .then((res) => {
      dispatch(deleteItemSuccess(payload));
    })
    .catch((err) => {
      dispatch(ItemFail(err));
    });
};

let image= [];
export const validateImage = (payload) => {

  const files = Array.from(payload.target.files);
  // console.log(files)
  if (files.length > 8) {
    return alert("You can only upload 8 images");
  }

  for (let i = 0; i < files.length; i++) {
    if (files[i].size >= 1048576) {
      alert("Max file size is 1mb");
    }
    image.push(files[i]);
    // console.log(image)
  }
}

export const uploadItemImage = async () => {

  console.log(image)
  if (!image) return alert("Please upload an image");

  const uploaders = image.map((image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "emazad_app");
    return axios
      .post("https://api.cloudinary.com/v1_1/skokash/image/upload", data)
      .then((res) => {
        return res.data.secure_url;
      }
      );
  });
  return Promise.all(uploaders).then((urls) => {
    return urls;
  });
};
