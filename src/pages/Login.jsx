import React from "react";
import { signInWithGoogle } from "../../firebase";
import Container from "../components/Layout/Container";
import Button from "../components/UI/Button";

const Login = () => {
  return (
    <Container>
      <Button
        bg="#4c8bf5"
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </Button>
    </Container>
  );
};

export default Login;
