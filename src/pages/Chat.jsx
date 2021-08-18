import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/Layout/Container";
import Card from "../components/UI/Card";
import { joinChatRoom } from "../store/chatSlice";
const Chat = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinChatRoom(roomId));
  }, []);

  return (
    <Container>
      <Card>{roomId}</Card>
    </Container>
  );
};

export default Chat;
