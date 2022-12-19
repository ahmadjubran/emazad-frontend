import axios from "axios";

import {
  getUserProfileSuccess,
  getActiveItemsSuccess,
  getStandByItemsSuccess,
  getSoldItemsSuccess,
  getWonItemsSuccess,
  getEngagedItemsSuccess,
  getFavoriteItemsSuccess,
  getRatingSuccess,
  getProfileItemsRequest,
  getProfileItemsFail,
  updateProfileSuccess,
} from "../features/profileSlicer";

export const getUserProfile = async (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getUserProfileSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileActiveItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userActiveItems/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getActiveItemsSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileStandByItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userStandByItems/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getStandByItemsSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileSoldItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userSoldItems/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getSoldItemsSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileWonItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userWonItems/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getWonItemsSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileEngagedItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userEngagedItems/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getEngagedItemsSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileFavoriteItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userFavorite/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getFavoriteItemsSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const getProfileRatingItems = (dispatch, id) => {
    dispatch(getProfileItemsRequest());

    try {
        axios
        .get(`${process.env.REACT_APP_HEROKU_API_KEY}/userRating/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            dispatch(getRatingSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
    }
};

export const updateProfile = (dispatch, payload, imageURL, userId, userImage, toast) => {
    dispatch(getProfileItemsRequest());

    const data = {
        userName: payload.target.userName.value,
        fullName: payload.target.fullName.value,
        email: payload.target.email.value,
        phoneNumber: payload.target.phoneNumber.value,
        gender: payload.target.gender.value,
        birthDate: payload.target.birthDate.value,
        image: imageURL ? imageURL : userImage
    }

    try {
        axios
        .put(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            console.log(res.data)
            dispatch(updateProfileSuccess(res.data));
            toast({
                description: "Profile updated successfully!",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((err) => {
            dispatch(getProfileItemsFail(err.response.data));
            toast({
                title: 'Error Updating Profile',
                description: `${err.response.data}` || "Please try again.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        });
    } catch (error) {
        dispatch(getProfileItemsFail(error.response.data));
        toast({
            title: 'Error Updating Profile',
            description: `${error.response.data}` || "Please try again.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
    }
};




