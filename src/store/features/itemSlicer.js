import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: {},
  loading: false,
  error: null,
  userRating: {},
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    ItemRequest: (state) => {
      state.loading = true;
    },

    ItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },

    getItemSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },

    addItemSuccess: (state, action) => {
      state.loading = false;
      state.items = [...state.items, action.payload];
    },

    deleteItemSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateItemSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
    },

    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.item = { ...state.item, Comments: [...state.item.Comments, action.payload] };
    },

    addBidSuccess: (state, action) => {
      state.loading = false;
      state.item = { ...state.item, Bids: [...state.item.Bids, action.payload] };
      state.items = state.items.map((item) => (item.id === action.payload.ItemId ? state.item : item));
    },

    getUserRatingSuccess: (state, action) => {
      state.loading = false;
      state.userRating = action.payload;
    },
  },
});

export const {
  ItemRequest,
  ItemFail,
  getItemsSuccess,
  getItemSuccess,
  addItemSuccess,
  deleteItemSuccess,
  updateItemSuccess,
  addCommentSuccess,
  addBidSuccess,
  getUserRatingSuccess,
} = itemSlice.actions;

export const selectItems = (state) => state.item.items;
export const selectItem = (state) => state.item.item;
export const selectUserRating = (state) => state.item.userRating;
export const selectLoading = (state) => state.item.loading;
export const selectError = (state) => state.item.error;

export default itemSlice.reducer;
