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
} from "../features/profileSlicer";

export const getUserProfile = async (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileActiveItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileStandByItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileSoldItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileWonItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileEngagedItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileFavoriteItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

export const getProfileRatingItems = (dispatch, payload) => {
    dispatch(getProfileItemsRequest());

    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];

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

