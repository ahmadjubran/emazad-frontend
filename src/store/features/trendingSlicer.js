import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendItems: [],
  messageError: null,
};

export const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    getTrendingItems: (state, action) => {
      state.trendItems = action.payload;
    },
    getTrendingItemsError: (state, action) => {
      state.messageError = action.payload;
    },
  },
});

export const { getTrendingItems, getTrendingItemsError } = trendingSlice.actions;
export const trendingItems = (state) => state.trending.trendItems;
export default trendingSlice.reducer;
