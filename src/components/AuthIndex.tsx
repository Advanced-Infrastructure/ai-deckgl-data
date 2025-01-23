import { lazy } from "react";
import { Col, Row, Space, Typography } from "antd";
import login_bg from "../assets/cleo_midnight_3.png";
import { Route, Switch } from "react-router-dom";
import ai_logo from "../assets/ai_long_logo.png";

const Login = lazy(() => import("./Login"));
const Map = lazy(() => import("./Map"));

const AuthIndex = () => {
  return (
    <div id="intercom-container">
      <Row style={{ height: "100vh" }}>
        <Col span={10}>
          <Space
            size={24}
            direction="vertical"
            className="auth-section-left"
            style={{
              width: "100%",
              backgroundImage: `linear-gradient(180deg, rgba(24, 27, 23, 0.72) 0%, rgba(0, 0, 0, 0) 0%), url(${login_bg})`,
            }}
          >
            <Typography.Text></Typography.Text>
          </Space>
        </Col>
        <Col span={14} className="auth-section-right">
          <Space style={{ marginBottom: 30, marginTop: -115 }}></Space>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/map" exact component={Map} />
          </Switch>

          <img
            style={{ height: 60, marginTop: 30, marginBottom: -130 }}
            src={ai_logo}
            alt="ai-logo"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AuthIndex;
