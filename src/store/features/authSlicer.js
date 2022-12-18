import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  isAuth: token ? true : false,
  user: userInfo,
  loading: false,
  error: null,
  previewImage: "https://res.cloudinary.com/skokash/image/upload/v1668203759/basdyzfjl3tmf4uqijxr.jpg",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.loading = true;
    },

    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signupSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    },

    logoutSuccess: (state) => {
      state.isAuth = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },

    setPreviewImage: (state, action) => {
      state.previewImage = action.payload;
    },
  },
});

export const { authRequest, authFail, signupSuccess, loginSuccess, logoutSuccess, setPreviewImage } = authSlice.actions;

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
