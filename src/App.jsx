import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(setUser);
    console.log(user);
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return <div className="App">{user ? <Home /> : <Login />}</div>;
}

export default App;
