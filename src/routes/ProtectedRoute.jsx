import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// const ProtectedRoute = (props) => {
//   const { children } = props;
//   const { user } = useSelector((state) => state.auth);

//   return <Route {...props}>{user ? children : <Redirect to="/" />}</Route>;
// };

function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
