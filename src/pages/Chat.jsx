import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/Layout/Container";
import Card from "../components/UI/Card";
import { joinChatRoom } from "../store/chatSlice";
import Input from "../components/UI/Input";
import { sendMessage, updateMessages } from "../store/messagesSlice";
import ChatWindow from "../components/ChatWindow";
const Chat = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { joined_status } = useSelector((state) => state.chat);
  const { unSubsrcibe_updates, status, messages, error } = useSelector(
    (state) => state.messages
  );
  const [val, setVal] = useState("");

  console.log("UPDATED =>", messages);

  useEffect(() => {
    dispatch(joinChatRoom(roomId));
    roomId && dispatch(updateMessages(roomId));
    return unSubsrcibe_updates;
  }, [roomId]);

  return (
    <Container>
      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          if (val !== "") dispatch(sendMessage({ roomId, message: val }));
        }}
      >
        <Input
          value={val}
          onChange={(event) => setVal(event.target.value)}
          style={{ margin: 10 }}
        />
        <button type="submit">Send</button>
      </form> */}
      {/* <Card>{roomId}</Card> */}
      <ChatWindow messages={messages} />
    </Container>
  );
};

export default Chat;
