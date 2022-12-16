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
      state.item = {};
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateItemSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      state.item = action.payload;
    },

    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.item = { ...state.item, Comments: [action.payload, ...state.item.Comments] };
    },

    updateCommentSuccess: (state, action) => {
      state.loading = false;
      state.item = {
        ...state.item,
        Comments: state.item.Comments.map((comment) => (comment.id === action.payload.id ? action.payload : comment)),
      };
    },

    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.item = { ...state.item, Comments: state.item.Comments.filter((comment) => comment.id !== action.payload) };
    },

    addReplySuccess: (state, action) => {
      state.loading = false;
      state.item = {
        ...state.item,
        Comments: state.item.Comments.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, Replies: comment.Replies ? [action.payload, ...comment.Replies] : [action.payload] }
            : comment
        ),
      };
    },

    updateReplySuccess: (state, action) => {
      state.loading = false;
      state.item = {
        ...state.item,
        Comments: state.item.Comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                Replies: comment.Replies.map((reply) =>
                  reply.id === action.payload.id ? { ...reply, reply: action.payload.reply } : reply
                ),
              }
            : comment
        ),
      };
    },

    deleteReplySuccess: (state, action) => {
      state.loading = false;
      state.item = {
        ...state.item,
        Comments: state.item.Comments.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, Replies: comment.Replies.filter((reply) => reply.id !== action.payload.id) }
            : comment
        ),
      };
    },

    addBidSuccess: (state, action) => {
      state.loading = false;
      state.item = state.item.latestBid
        ? { ...state.item, latestBid: action.payload.bidprice, Bids: [action.payload, ...state.item.Bids] }
        : { ...state.item, latestBid: action.payload.bidprice, Bids: [action.payload] };
      state.items =
        state.items.length > 0
          ? state.items.map((item) =>
              item.id === action.payload.itemId
                ? { ...item, latestBid: action.payload.bidprice, Bids: [...item.Bids, action.payload] }
                : item
            )
          : state.items;
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
  updateCommentSuccess,
  deleteCommentSuccess,
  addReplySuccess,
  updateReplySuccess,
  deleteReplySuccess,
  addBidSuccess,
  getUserRatingSuccess,
} = itemSlice.actions;

export const selectItems = (state) => state.item.items;
export const selectItem = (state) => state.item.item;
export const selectUserRating = (state) => state.item.userRating;
export const selectLoading = (state) => state.item.loading;
export const selectError = (state) => state.item.error;

export default itemSlice.reducer;
