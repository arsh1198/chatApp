import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";

const initialState = {
  room_id: null,
  participants: [],
  messages: [],
};

export const createNewChatRoom = createAsyncThunk(
  "chat/createNewChatRoom",
  async () => {
    const user = auth.currentUser;
    const roomRef = db.collection("chat-rooms").doc();
    const roomId = roomRef.id;
    const userAsParticipant = {
      displayName: user.displayName,
      email: user.email,
      host: true,
    };
    await roomRef.set({
      room_id: roomId,
    });
    await roomRef
      .collection("participants")
      .doc(user.uid)
      .set(userAsParticipant);
    return { room_id: roomId, participants: userAsParticipant };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewChatRoom.fulfilled]: (state, action) => {
      (state.room_id = action.payload.room_id),
        state.participants.push(action.payload.participants);
    },
  },
});
