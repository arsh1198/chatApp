import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import firebase from "../../firebase";

const initialState = {
  roomId: null,
  participants: null,
  joined_status: "pending", // 'pending' || 'success' || 'error' // 🤷‍♂️
  error: null,
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
      roomId,
      created: firebase.firestore.Timestamp.now(),
    });

    await roomRef
      .collection("participants")
      .doc(user.uid)
      .set(userAsParticipant);

    return { roomId, participants: userAsParticipant };
  }
);

export const joinChatRoom = createAsyncThunk(
  "chat/joinChatRoom",
  async (roomId, thunkApi) => {
    let participants = [];
    // try {
    const user = auth.currentUser;
    const roomsRef = await db.collection("chat-rooms");
    const room = await roomsRef.where("roomId", "==", roomId).get();
    const roomExists = !room.empty;
    if (!roomExists) {
      thunkApi.dispatch(
        chatSlice.actions.handleError("No Room found with this ID!")
      );
    }
    if (!roomExists) return;

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

    participantsRef.forEach((doc) => participants.push(doc.data()));
    // } catch (err) {
    //   thunkApi.rejectWithValue(err);
    // }

    return { roomId, participants };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    handleError: (state, action) => {
      state.joined_status = "error";
      state.error = action.payload;
    },
    clearChatState: (state, action) => {
      console.log("CLEARING STATE");
      state.error = null;
      state.joined_status = "pending";
      state.roomId = null;
    },
  },
  extraReducers: {
    [createNewChatRoom.fulfilled]: (state, action) => {
      state.roomId = action.payload.roomId;
      state.participants.push(action.payload.participants);
      state.joined_status = "success";
    },
    [joinChatRoom.fulfilled]: (state, action) => {
      console.log("PAYLOAD =>", action.payload.roomId);
      if (action.payload.roomId) {
        state.roomId = action.payload.roomId;
        state.participants = action.payload.participants;
        state.joined_status = "success";
      }
    },
    [joinChatRoom.rejected]: (state, action) => {
      state.error = action.payload;
      state.joined_status = "error";
    },
  },
});
