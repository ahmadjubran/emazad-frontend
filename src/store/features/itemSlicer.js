import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    getItemsRequest: (state) => {
      state.loading = true;
    },

    getItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },

    getItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addItemRequest: (state) => {
      state.loading = true;
    },

    addItemSuccess: (state, action) => {
      state.loading = false;
      state.items = [...state.items, action.payload];
    },

    addItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteItemRequest: (state) => {
      state.loading = true;
    },

    deleteItemSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    deleteItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateItemRequest: (state) => {
      state.loading = true;
    },

    updateItemSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
    },

    updateItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addBidRequest: (state) => {
      state.loading = true;
    },

    addBidSuccess: (state, action) => {
      state.loading = false;
    },

    addBidFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailure,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,
  updateItemRequest,
  updateItemSuccess,
  updateItemFailure,
  addBidRequest,
  addBidSuccess,
  addBidFailure,
} = itemSlice.actions;

export const selectItems = (state) => state.item.items;
export const selectLoading = (state) => state.item.loading;
export const selectError = (state) => state.item.error;

export default itemSlice.reducer;
