import React from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Layout/Container";
import Card from "../components/UI/Card";
const Chat = () => {
  const { roomId } = useParams();
  return (
    <Container>
      <Card>{roomId}</Card>
    </Container>
  );
};

export default Chat;
