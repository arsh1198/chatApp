import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { chatSlice } from "./chatSlice";
import { messagesSlice } from "./messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    messages: messagesSlice.reducer,
  },
});
