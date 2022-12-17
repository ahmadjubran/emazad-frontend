import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: null,
    activeItems: [],
    standByItems: [],
    soldItems: [],
    wonItems: [],
    engagedItems: [],
    favoriteItems: [],
    rating: null,
    loading: false,
    error: null,
  },
  reducers: {
    getProfileItemsRequest: (state) => {
      state.loading = true;
    },

    getProfileItemsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    },

    getActiveItemsSuccess: (state, action) => {
      state.loading = false;
      state.activeItems = action.payload;
    },

    getStandByItemsSuccess: (state, action) => {
      state.loading = false;
      state.standByItems = action.payload;
    },

    getSoldItemsSuccess: (state, action) => {
      state.loading = false;
      state.soldItems = action.payload;
    },

    getWonItemsSuccess: (state, action) => {
      state.loading = false;
      state.wonItems = action.payload;
    },

    getEngagedItemsSuccess: (state, action) => {
      state.loading = false;
      state.engagedItems = action.payload;
    },

    getFavoriteItemsSuccess: (state, action) => {
      state.loading = false;
      state.favoriteItems = action.payload;
    },

    getRatingSuccess: (state, action) => {
      state.loading = false;
      state.rating = action.payload;
    },
  },
});

export const {
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
} = profileSlice.actions;

export default profileSlice.reducer;
