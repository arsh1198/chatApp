import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import firebase from "../../firebase";

const initialState = {
  room_id: null,
  participants: [],
  messages: [],
  joined_status: "pending", // 'pending' || 'joined' || 'error' // 🤷‍♂️
};

export const createNewChatRoom = createAsyncThunk(
  "chat/createNewChatRoom",
  async (_, thunkApi) => {
    // try {
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
    // } catch (err) {
    //   thunkApi.rejectWithValue(err);
    // }
    return { room_id: roomId, participants: userAsParticipant };
  }
);

export const joinChatRoom = createAsyncThunk(
  "chat/joinChatRoom",
  async (roomId, thunkApi) => {
    // try {
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
    participantsRef.forEach(
      (doc) => participants.push(doc.data())
      // console.log(doc.data())
    );

    console.log("FROM_THUNK =>", participants);

    return { room_id: roomId, participants };
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message) => {
    const user = auth.currentUser;
    const messagesRef = db
      .collection("chat-rooms")
      .doc(roomId)
      .collection("messages");
    messagesRef.doc().set({
      user,
      text: message,
      at: firebase.firestore.Timestamp.now(),
    });
    let messages = [];
    messagesRef.forEach(
      (doc) => messages.push(doc.data())
      // console.log(doc.data())
    );
    return { messages };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewChatRoom.fulfilled]: (state, action) => {
      state.room_id = action.payload.room_id;
      state.participants.push(action.payload.participants);
    },
    [joinChatRoom.fulfilled]: (state, action) => {
      console.log("FULLFILLED =>", action.payload.participants);
      state.room_id = action.payload.room_id;
      state.participants = action.payload.participants;
      state.joined_status = "joined";
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
    },
  },
});
