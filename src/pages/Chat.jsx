import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Layout/Container";
import Card from "../components/UI/Card";
import { chatSlice, joinChatRoom } from "../store/chatSlice";
import Input from "../components/UI/Input";
import { sendMessage, updateMessages } from "../store/messagesSlice";
import ChatWindow from "../components/ChatWindow";
import Loader from "../components/UI/Loader";
const Chat = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { joined_status, error } = useSelector((state) => state.chat);
  const { unSubsrcibe_updates, status, messages } = useSelector(
    (state) => state.messages
  );

  const { clearChatState } = chatSlice.actions;

  console.log("JOINED_STATUS_ERROR =>", joined_status === "error");

  console.log("UPDATED =>", messages);

  useEffect(() => {
    dispatch(joinChatRoom(roomId));
    roomId && dispatch(updateMessages(roomId));
    return () => dispatch(clearChatState());
  }, [roomId]);

  return (
    <Container>
      {joined_status === "pending" && <Loader />}
      {joined_status === "error" && (
        <>
          <h3>{error}</h3>
          <Link replace to="/">
            Back to Home
          </Link>
        </>
      )}
      {joined_status === "success" && <ChatWindow messages={messages} />}
    </Container>
  );
};

export default Chat;
