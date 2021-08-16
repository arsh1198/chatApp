import React from "react";
import { useDispatch } from "react-redux";
import Container from "../components/Layout/Container";
import Button from "../components/UI/Button";
import { singInWithGoogle } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Button
        bg="#4c8bf5"
        onClick={() => {
          dispatch(singInWithGoogle());
        }}
      >
        Sign In with Google
      </Button>
    </Container>
  );
};

export default Login;
