import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase";
import Container from "../components/Layout/Container";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { createNewChatRoom } from "../store/chatSlice";

const Email = styled.h4`
  font-family: "Roboto Mono", monospace;
  font-weight: 800;
  text-decoration: underline;
`;

const UserImg = styled.img`
  height: 50px;
  width: 50px;
  border: 1px solid black;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.chat);

  const history = useHistory();

  useEffect(() => {
    if (room_id) history.push(`/room/${room_id}`);
  }, [room_id]);

  return (
    <Container>
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "280px",
            justifyContent: "space-between",
          }}
        >
          <UserImg src={user.photoURL} />
          <Email>{user.email}</Email>
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <Button bg="pink" onClick={() => dispatch(createNewChatRoom())}>
            Create Room
          </Button>
          <Button bg="lightBlue" style={{ zIndex: 2 }}>
            Join Room
          </Button>
        </div>
        <Button
          style={{ width: "100%", zIndex: 2 }}
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
      </Card>
    </Container>
  );
};

export default Home;
