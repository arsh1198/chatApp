import React, { useState } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: #e2e2e2;
  margin: 7em;
  border: 1px solid black;
`;

const Header = styled.div`
  width: auto;
  padding: 0.65em;
  background: lightblue;
  border-bottom: 1px solid black;
  font-family: "Roboto Mono", monospace;
  font-weight: 800;
`;

const MessagesContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  background: #fff;
  padding: 2em;
  flex-grow: 1;
`;

const Footer = styled.div`
  width: auto;
  display: flex;
  background: lightblue;
  border-top: 1px solid black;
`;

const inputStyles = { borderWidth: 0, flexGrow: 1 };

const buttonStyles = {
  borderTop: 0,
  borderRight: 0,
  borderBottom: 0,
};

const Window = ({ heading, children, onSendMessage }) => {
  const [inputVal, setInputVal] = useState("");

  return (
    <Container>
      <Header>{heading}</Header>
      <MessagesContainer>{children}</MessagesContainer>
      <form
        onSubmit={() => {
          onSendMessage(inputVal);
        }}
      >
        <Footer>
          <Input
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
            placeholder="Write a message..."
            style={inputStyles}
          />
          <Button type="submit" style={buttonStyles}>
            Send
          </Button>
        </Footer>
      </form>
    </Container>
  );
};

export default Window;
