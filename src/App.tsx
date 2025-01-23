import { Suspense, lazy } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Spin } from "antd";
import PrivateRoute from "./components/PrivateRoute";
const Map = lazy(() => import("./components/Map"));
const Auth = lazy(() => import("./components/Auth"));
const AuthIndex = lazy(() => import("./components/AuthIndex"));

function App() {
  return (
   <div>
    <Router>
      <Suspense fallback={
        <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
      }>
        <Switch>
          <Route path="/" exact component={Auth}/>
          <Route path="/auth/:page" exact component={AuthIndex} />
          <PrivateRoute path="/map" exact component={Map}/>
          <Route path="*" component={Auth} />
        </Switch>
      </Suspense>
    </Router>
   </div>
  );
}

export default App;
