import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { chatSlice } from "./chatSlice";

export const store = configureStore({
  reducer: { auth: authSlice.reducer, chat: chatSlice.reducer },
});
