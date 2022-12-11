import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  isAuth: token ? true : false,
  user: userInfo,
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
      state.user = action.payload;
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

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
