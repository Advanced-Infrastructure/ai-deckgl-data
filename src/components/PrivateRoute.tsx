import { useMemo } from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({
  path,
  component: Component,
  ...rest
}: any) {
  const loggedIn = useMemo(() => {
    const userToken = window.sessionStorage.getItem("currentUser");
    return userToken;
    //eslint-disable-next-line
  }, [window.sessionStorage.getItem("currentUser")]);

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        );
      }}
    />
  );
}
