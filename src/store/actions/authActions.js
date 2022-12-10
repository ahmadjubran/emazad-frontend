import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  requestSignup,
  signupSuccess,
  signupFail,
  signupPasswordFailure,
} from "../features/authSlicer";

import base64 from "base-64";

export const signUp = (dispatch, payload) => {
  payload.preventDefault();
  console.log(payload);

  if (payload.target.password.value === payload.target.confirmPassword.value) {
    dispatch(requestSignup());

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
        dispatch(signupFail(payload.error));
      } else {
        dispatch(requestSignup());
        axios
          .post(`${process.env.REACT_APP_HEROKU_API_KEY}/signup`, data)
          .then((res) => {
            dispatch(signupSuccess(res.data));

            // to be removed later
            window.location.href = "/login";
          })
          .catch((err) => {
            dispatch(signupFail(err));
          });
      }
    } catch (error) {
      dispatch(signupFail(error));
    }
  } else {
    // dispatch(signupPasswordFailure());
    dispatch(signupFail("The password entered does not match! Please try again."));
  }
};

export const login = (dispatch, payload) => {
  payload.preventDefault();

  const user = {
    email: payload.target.email.value,
    password: payload.target.password.value,
  };

  console.log(user)

  const encodedUser = base64.encode(`${user.email}:${user.password}`);

  try {
    if (payload.error) {
      console.log("logged in error in 1st if");
      dispatch(loginFail(payload.error));

    } else {
      dispatch(loginRequest());
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
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("username", res.data.user.userName);
          localStorage.setItem("userID", res.data.user.id);
        })
        .catch((err) => {
          dispatch(loginFail(err.response.data));

        });
    }
  } catch (error) {
    console.log("logged in error in 2nd catch");
    dispatch(loginFail(error));

  }
};

export const logout = (dispatch) => {
  try {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
  } catch (error) {
    dispatch(logoutFail(error));
  }
};
