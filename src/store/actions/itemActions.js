import axios from "axios";

import {
  addItemSuccess,
  deleteItemSuccess,
  getItemsSuccess,
  getItemSuccess,
  getTrendingItemsSuccess,
  getUserRatingSuccess,
  ItemFail,
  ItemRequest,
  updateItemSuccess,
} from "../features/itemSlicer";

export const getItems = (dispatch, page, status, category, subCategory) => {
  try {
    dispatch(ItemRequest());

    let url = "";

    if (!status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items?page=${page}&limit=9`;
    } else if (status && !category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}?page=${page}&limit=9`;
    } else if (status && category && !subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${
        category === "All" ? "" : category
      }?page=${page}&limit=9`;
    } else if (status && category && subCategory) {
      url = `${process.env.REACT_APP_HEROKU_API_KEY}/items/${status}/${category}/${
        subCategory === "All" ? "" : subCategory
      }?page=${page}&limit=9`;
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

export const getTrendingItems = (dispatch) => {
  try {
    dispatch(ItemRequest());

    axios
      .get(`${process.env.REACT_APP_HEROKU_API_KEY}/trending`)
      .then((res) => {
        dispatch(getTrendingItemsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(ItemFail(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = (dispatch, payload, imageURL, userId, toast) => {
  const data = {
    itemTitle: payload.itemTitle,
    itemDescription: payload.itemDescription,
    ...(imageURL && { itemImage: imageURL }),
    category: payload.category,
    subCategory: payload.subCategory,
    itemCondition: payload.itemCondition,
    initialPrice: Number(payload.initialPrice),
    startDate: new Date(payload.startDate).toISOString(),
    endDate: new Date(payload.endDate).toISOString(),
    userId: userId,
  };

  try {
    dispatch(ItemRequest());
    axios
      .post(`${process.env.REACT_APP_HEROKU_API_KEY}/item`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(addItemSuccess(res.data));
        toast({
          title: "Item added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error Creating Item",
          description: `${err.response.data.message}` || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  } catch (err) {
    dispatch(ItemFail(err));
  }
};

export const editItem = (dispatch, payload, imageURL, userId, id, itemImage, toast) => {
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

  console.log(data)

  try {
    dispatch(ItemRequest());
    axios
      .put(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(updateItemSuccess(res.data));
        toast({
          title: "Item updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(ItemFail(err));
        toast({
          title: "Error Updating Item",
          description: `${err.response.data.message}` || "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  } catch (err) {
    dispatch(ItemFail(err));
  }
};

export const deleteItem = (dispatch, payload, toast) => {
  dispatch(ItemRequest());

  axios
    .delete(`${process.env.REACT_APP_HEROKU_API_KEY}/item/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch(deleteItemSuccess(payload));
      toast({
        title: "Item deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    })
    .catch((err) => {
      dispatch(ItemFail(err));
      toast({
        title: "Error Deleting Item",
        description: `${err.response.data.message}` || "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
    image = [];
    return Promise.all(uploaders).then((urls) => {
      return urls;
    });
  }
};
