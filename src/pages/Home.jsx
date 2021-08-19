import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase";
import JoinRoomModal from "../components/JoinRoomModal";
import Container from "../components/Layout/Container";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";
import { createNewChatRoom, joinChatRoom } from "../store/chatSlice";

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
  const { roomId } = useSelector((state) => state.chat);
  const [isModalOpen, setModalOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (roomId) history.push(`/room/${roomId}`);
  }, [roomId]);

  return (
    <Container>
      <JoinRoomModal open={isModalOpen} onClose={() => setModalOpen(false)} />
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
          <Button
            elevated
            bg="pink"
            onClick={() => dispatch(createNewChatRoom())}
          >
            Create Room
          </Button>
          <Button
            elevated
            bg="lightBlue"
            onClick={() => {
              setModalOpen(true);
            }}
            style={{ zIndex: 2 }}
          >
            Join Room
          </Button>
        </div>
        <Button
          elevated
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
