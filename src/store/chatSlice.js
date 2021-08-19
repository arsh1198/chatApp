import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import firebase from "../../firebase";

const initialState = {
  roomId: null,
  participants: [],
  messages: [],
  joined_status: "pending", // 'pending' || 'joined' || 'error' // 🤷‍♂️
};

export const createNewChatRoom = createAsyncThunk(
  "chat/createNewChatRoom",
  async (_, thunkApi) => {
    const roomRef = db.collection("chat-rooms").doc();
    const roomId = roomRef.id;
    const user = auth.currentUser;

    const userAsParticipant = {
      displayName: user.displayName,
      email: user.email,
      host: true,
    };

    await roomRef.set({
      room_id: roomId,
      created: firebase.firestore.Timestamp.now(),
    });

    await roomRef
      .collection("participants")
      .doc(user.uid)
      .set(userAsParticipant);

    return { room_id: roomId, participants: userAsParticipant };
  }
);

export const joinChatRoom = createAsyncThunk(
  "chat/joinChatRoom",
  async (roomId, thunkApi) => {
    const user = auth.currentUser;
    const roomRef = db.collection("chat-rooms").doc(roomId);

    const userAsParticipant = {
      displayName: user.displayName,
      email: user.email,
      host: false,
    };

    await roomRef
      .collection("participants")
      .doc(user.uid)
      .set(userAsParticipant);

    const participantsRef = await roomRef.collection("participants").get();
    let participants = [];
    participantsRef.forEach((doc) => participants.push(doc.data()));

    return { room_id: roomId, participants };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewChatRoom.fulfilled]: (state, action) => {
      state.roomId = action.payload.room_id;
      state.participants.push(action.payload.participants);
    },
    [joinChatRoom.fulfilled]: (state, action) => {
      state.roomId = action.payload.room_id;
      state.participants = action.payload.participants;
      state.joined_status = "joined";
    },
  },
});
