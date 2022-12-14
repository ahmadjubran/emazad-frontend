import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeItem: [],
    soldItems: [],
    blockedItems: [],
    userBlocked: [],
    messageError: null
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        getActiveItems: (state, action) => {
            state.activeItem = action.payload
        },
        getSoldItems: (state, action) => {
            state.soldItems = action.payload
        },
        getBlockedItems: (state, action) => {
            state.blockedItems = action.payload
        },
        getUserBlocked: (state, action) => {
            state.userBlocked = action.payload
        },
        getActiveItemsError: (state, action) => {
            state.messageError = action.payload
        }
    }
})

export const { getActiveItems, getSoldItems, getBlockedItems, getUserBlocked, getActiveItemsError } = adminSlice.actions;
export const activeItems = (state) => state.admin;
export default adminSlice.reducer;