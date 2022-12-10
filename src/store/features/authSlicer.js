import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const initialState = {
  isAuth: token ? true : false,
  user: {
    userID: userInfo ? userInfo.id : "",
    userName: userInfo ? userInfo.userName : "",
    fullName: userInfo ? userInfo.fullName : "",
    email: userInfo ? userInfo.email : "",
    confirmed: userInfo ? userInfo.confirmed : false,
    phoneNumber: userInfo ? userInfo.phoneNumber : "",
    gender: userInfo ? userInfo.gender : "",
    birthDate: userInfo ? userInfo.birthDate : "",
    image: userInfo ? userInfo.image : "",
    status: userInfo ? userInfo.status : "",
    role: userInfo ? userInfo.role : "",
    token: token ? token : "",
  },
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = {
        userID: action.payload.id,
        userName: action.payload.userName,
        fullName: action.payload.fullName,
        email: action.payload.email,
        confirmed: action.payload.confirmed,
        phoneNumber: action.payload.phoneNumber,
        gender: action.payload.gender,
        birthDate: action.payload.birthDate,
        image: action.payload.image,
        status: action.payload.status,
        role: action.payload.role,
        token: action.payload.token,
      };
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.isAuth = false;
      state.user = {};
      state.loading = false;
      state.error = null;
    },

    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    requestSignup: (state) => {
      state.loading = true;
    },

    signupSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },

    signupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // signupPasswordFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = "The password entered does not match! Please try again.";
    // },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  requestSignup,
  signupSuccess,
  signupFail,
  signupPasswordFailure,
} = authSlice.actions;

export const authActions = authSlice.actions;

export default authSlice.reducer;
