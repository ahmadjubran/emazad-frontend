import axios from "axios";

import { authRequest, authFail, signupSuccess, loginSuccess, logoutSuccess } from "../features/authSlicer";

import base64 from "base-64";

export const signUp = (dispatch, payload) => {
  payload.preventDefault();

  if (payload.target.password.value === payload.target.confirmPassword.value) {
    dispatch(authRequest());

    const data = {
      userName: payload.target.userName.value,
      password: payload.target.password.value,
      fullName: payload.target.fullName.value,
      email: payload.target.email.value,
      phoneNumber: payload.target.phoneNumber.value,
      gender: payload.target.gender.value,
      birthDate: payload.target.birthDate.value,
      image: payload.target.image.value || null,
    };

    try {
      if (payload.error) {
        dispatch(authFail(payload.error));
      } else {
        dispatch(authRequest());
        axios
          .post(`${process.env.REACT_APP_HEROKU_API_KEY}/signup`, data)
          .then((res) => {
            dispatch(signupSuccess(res.data));

            // to be removed later
            window.location.href = "/login";
          })
          .catch((err) => {
            dispatch(authFail(err.response.data));
          });
      }
    } catch (error) {
      dispatch(authFail(error.response.data));
    }
  } else {
    dispatch(authFail("The password entered does not match! Please try again."));
  }
};

export const login = (dispatch, payload) => {
  payload.preventDefault();

  const user = {
    email: payload.target.email.value,
    password: payload.target.password.value,
  };

  const encodedUser = base64.encode(`${user.email}:${user.password}`);

  try {
    if (payload.error) {
      dispatch(authFail(payload.error));
    } else {
      dispatch(authRequest());
      axios
        .post(
          `${process.env.REACT_APP_HEROKU_API_KEY}/login`,
          {},
          {
            headers: {
              Authorization: `Basic ${encodedUser}`,
            },
          }
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("username", res.data.userName);
          localStorage.setItem("userID", res.data.id);

          // redirect to home page without refreshing the page
          window.location.href = "/";

        })
        .catch((err) => {
          dispatch(authFail(err.response.data));
        });
    }
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const logout = (dispatch) => {
  try {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const verifyEmail = (dispatch, payload) => {
  payload.preventDefault();

  const user = {
    email: payload.target.email.value,
    password: payload.target.password.value,
  };

  const encodedUser = base64.encode(`${user.email}:${user.password}`);

  try {
    if (payload.error) {
      dispatch(authFail(payload.error));
    } else {
      dispatch(authRequest());

      const url = window.location.href;
      const urlArray = url.split("/");
      const id = urlArray[urlArray.length - 1];

      axios
        .post(
          `${process.env.REACT_APP_HEROKU_API_KEY}/verification/${id}`,
          {},
          {
            headers: {
              Authorization: `Basic ${encodedUser}`,
            },
          }
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("username", res.data.userName);
          localStorage.setItem("userID", res.data.id);
          window.location.href = "/";
        })
        .catch((err) => {
          dispatch(authFail(err.response.data));
        });
    }
  } catch (error) {
    dispatch(authFail(error));
  }
};
