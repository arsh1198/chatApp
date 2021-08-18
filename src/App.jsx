import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import AuthLoader from "./components/Layout/AuthLoader";
import { authSlice } from "./store/authSlice";
import {
  Redirect,
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { user, authStatus } = useSelector((state) => state.auth);
  const [refferer, setRefferer] = useState(false);
  const { setUser } = authSlice.actions;

  useEffect(() => {
    if (location.state) setRefferer(true);
  }, [location]);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      console.info("AUTH_STATE_CHANGED");
      const filteredInfo = {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      };
      if (user) dispatch(setUser(filteredInfo));
      else dispatch(setUser(null));
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div className="App">
      <AuthLoader>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              {refferer && authStatus === "success" && user && (
                <Redirect to={location.state?.from} />
              )}
              {authStatus === "success" && user ? <Home /> : <Login />}
            </Route>
            <ProtectedRoute path="/room/:roomId">
              <Chat />
            </ProtectedRoute>
          </Switch>
        </Router>
      </AuthLoader>
    </div>
  );
}

export default App;
