import axios from "axios";

import {
  addItemSuccess,
  deleteItemSuccess,
  getItemsSuccess,
  getItemSuccess,
  getUserRatingSuccess,
  ItemFail,
  ItemRequest,
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
    dispatch(ItemFail(err));
  }
};

export const addItem = (dispatch, payload, imageURL, userId) => {
  payload.preventDefault();

  const data = {
    itemTitle: payload.target.itemTitle.value,
    itemDescription: payload.target.itemDescription.value,
    ...(imageURL && { itemImage: imageURL }),
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
        payload.target.reset();
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    dispatch(ItemFail(err));
  }
};

export const editItem = (dispatch, payload, imageURL, userId, id, itemImage) => {
  payload.preventDefault();

  const data = {
    itemTitle: payload.target.itemTitle.value,
    itemDescription: payload.target.itemDescription.value,
    ...(imageURL && { itemImage: imageURL.length === 0 ? itemImage : imageURL }),
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
      .put(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${id}`, data)
      .then((res) => {
        dispatch(updateItemSuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    dispatch(ItemFail(err));
  }
};

export const deleteItem = (dispatch, payload) => {
  dispatch(ItemRequest());

  axios
    .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${payload}`)
    .then((res) => {
      dispatch(deleteItemSuccess(payload));
    })
    .catch((err) => {
      dispatch(ItemFail(err));
    });
};

let image = [];
export const validateImage = (payload, toast) => {

  image = [];
  const files = Array.from(payload.target.files);

  if (files.length > 8) {
    return toast({
      title: "Error Uploading Images",
      description: "You can only upload 8 images",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

  } else {
    for (let i = 0; i < files.length; i++) {

      if (files[i].size > 1048576) {
        return toast({
          title: "Error Uploading Images",
          description: "One of the images is larger than 1mb",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (!files[i].type.match(/image.*/)) {
        return toast({
          title: "Error Uploading Images",
          description: "One of the files is not an image",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        image.push(files[i]);
      }
    }
  }
};

export const uploadItemImage = async () => {
  if (image.length === 0) {
    return null;
  } else {
    const uploaders = image.map((image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "emazad_app");
      return axios.post("https://api.cloudinary.com/v1_1/skokash/image/upload", data).then((res) => {
        return res.data.secure_url;
      });
    });
    return Promise.all(uploaders).then((urls) => {
      return urls;
    });
  }
};
