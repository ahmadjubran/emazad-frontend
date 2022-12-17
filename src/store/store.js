import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlicer";
import itemReducer from "./features/itemSlicer";
import trendingReducer from "./features/trendingSlicer";
import adminReducer from "./features/adminSlicer";
import profileReducer from "./features/profileSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    trending: trendingReducer,
    admin: adminReducer,
    profile: profileReducer,
  },
});
