import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const history = useHistory();
  useEffect(() => {
    const userToken = window.sessionStorage.getItem("currentUser");
    if (userToken) history.push("/map");
    else history.push("/auth/login");
  }, [history]);
  return null;
};

export default Auth;
