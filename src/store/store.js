import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlicer";
import itemReducer from "./features/itemSlicer";
import adminReducer from "./features/adminSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    admin: adminReducer,
  },
});
