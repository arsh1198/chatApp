import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../firebase";
import { auth } from "../../firebase";

const initialState = {
  user: null,
  authStatus: "pending",
  error: null,
};

export const singInWithGoogle = createAsyncThunk(
  "auth/singnInWithGoogle",
  async (_, thunkApi) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .catch((error) => thunkApi.rejectWithValue(error));
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authStatus = "success";
    },
  },
  extraReducers: {
    [singInWithGoogle.pending]: (state) => {
      state.authStatus = "pending";
    },
    [singInWithGoogle.fulfilled]: (state) => {
      state.authStatus = "success";
    },
    [singInWithGoogle.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});
