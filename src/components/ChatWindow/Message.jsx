import ColorHash from "color-hash";
import React from "react";
import styled from "styled-components";

const getHashedColor = (textString) => {
  const colorHash = new ColorHash({ lightness: 0.45 });
  return colorHash.hex(textString);
};

const isValid = (user) => {
  return typeof user === "string" && user !== "";
};

const MessageContainer = styled.div`
  width: 100%;
  float: ${({ user }) => (isValid(user) ? "left" : "right")};
`;

const MessageBubble = styled.div`
  background: ${({ user }) => (isValid(user) ? "#e2e2e2" : "lightblue")};
  padding: 0.75em;
  border: 1px solid black;
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  float: ${({ user }) => (isValid(user) ? "left" : "right")};
  margin-bottom: 1.25em;
`;

const User = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  font-weight: bold;
  color: ${({ user }) => getHashedColor(user)};
  margin-bottom: 0.5em;
`;

const Date = styled.div`
  color: grey;
  margin-left: 0.75em;
`;

const Message = ({ user, text, at, ...rest }) => {
  return (
    <MessageContainer user={user}>
      <MessageBubble user={user}>
        {user && <User user={user}>{user}</User>}
        <div style={{ display: "flex", alignItems: "center" }}>
          {text}
          <Date>{at}</Date>
        </div>
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
