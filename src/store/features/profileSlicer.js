import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: {},
    activeItems: [],
    standByItems: [],
    soldItems: [],
    wonItems: [],
    engagedItems: [],
    favoriteItems: [],
    userRating: {},
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
      state.userRating = action.payload;
    },

    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
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
  updateProfileSuccess,
} = profileSlice.actions;

export const selectUserProfile = (state) => state.profile.userProfile;
export const selectActiveItems = (state) => state.profile.activeItems;
export const selectStandByItems = (state) => state.profile.standByItems;
export const selectSoldItems = (state) => state.profile.soldItems;
export const selectWonItems = (state) => state.profile.wonItems;
export const selectEngagedItems = (state) => state.profile.engagedItems;
export const selectFavoriteItems = (state) => state.profile.favoriteItems;
export const selectUserRating = (state) => state.profile.userRating;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
