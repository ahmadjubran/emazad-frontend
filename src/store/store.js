import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlicer";
import itemReducer from "./features/itemSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
  },
});
