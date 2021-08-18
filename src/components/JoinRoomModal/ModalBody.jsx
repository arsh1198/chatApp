import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Input from "../UI/Input";

const ModalBody = () => {
  const [val, setVal] = useState("");

  return (
    <>
      <Input
        name="room-id"
        placeholder="Room ID"
        style={{ marginBottom: "1em" }}
        value={val}
        onChange={(event) => setVal(event.target.value)}
      />
    </>
  );
};

export default ModalBody;
