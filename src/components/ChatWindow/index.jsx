import React, { useState } from "react";
import Window from "./Window";
import { DUMMY } from "../../dummyData";
import Message from "./Message";

const ChatWindow = () => {
  const [data, setData] = useState(DUMMY);

  const sendMsg = (text) => {
    setData((prev) => [
      ...prev,
      { user: "Asriel", text: text, at: new Date() },
    ]);
  };

  return (
    <Window onSendMessage={sendMsg} heading={"Tibrewals"}>
      {data.map(({ text, user, at }) => {
        return user === "Asriel" ? (
          <Message text={text} at={at.toLocaleTimeString()} />
        ) : (
          <Message user={user} text={text} at={at.toLocaleTimeString()} />
        );
      })}
    </Window>
  );
};

export default ChatWindow;
