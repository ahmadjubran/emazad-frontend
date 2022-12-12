import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        getUserRequest: (state) => {
            state.loading = true;
        }
    }
})

