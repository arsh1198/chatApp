import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { joinChatRoom } from "../../store/chatSlice";
import Modal from "../UI/Modal";
import ModalBody from "./ModalBody";

const JoinRoomModal = ({ open, onClose, onSubmit }) => {
  const history = useHistory();

  return (
    <Modal
      heading="Enter the Room ID"
      open={open}
      onSubmit={(event) => {
        event.preventDefault();
        const roomId = event.target[0].value;
        history.push(`/room/${roomId}`);
      }}
      onClose={onClose}
    >
      <ModalBody />
    </Modal>
  );
};

export default JoinRoomModal;
