import React from "react";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";

const AuthLoader = ({ children }) => {
  const { authStatus } = useSelector((state) => state.auth);
  return authStatus === "pending" ? <Loader /> : children;
};

export default AuthLoader;
