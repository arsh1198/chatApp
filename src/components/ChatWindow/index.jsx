import React, { useState } from "react";
import Window from "./Window";
import { DUMMY } from "../../dummyData";
import Message from "./Message";
import { auth } from "../../../firebase";
import Loader from "../UI/Loader";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../store/messagesSlice";

const ChatWindow = ({ messages }) => {
  const currentUser = auth.currentUser;
  const dispatch = useDispatch();
  const { roomId } = useSelector((state) => state.chat);
  if (!messages) return <Loader />;
  return (
    <Window
      onSendMessage={(value) =>
        dispatch(sendMessage({ roomId, message: value }))
      }
      heading={`Room ID => ${roomId}`}
    >
      {messages.map(({ text, user, at }) => {
        return user === currentUser.displayName ? (
          <Message text={text} at={at} />
        ) : (
          <Message user={user} text={text} at={at} />
        );
      })}
    </Window>
  );
};

export default ChatWindow;
