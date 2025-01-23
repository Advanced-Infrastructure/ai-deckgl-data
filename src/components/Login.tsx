import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Steps,
  Typography,
} from "antd";
import { useHistory } from "react-router-dom";

function Login() {
  return (
    <>
      <Typography.Title
        level={2}
        style={{
          textAlign: "center",
          color: "var(--dark-grey)",
          marginBottom: 30,
        }}
      >
        Login to your account
      </Typography.Title>
      <Card
        title={
          <Steps type="navigation">
            <Steps.Step stepIndex={0} title="Login" icon={<UserOutlined />} />
          </Steps>
        }
        className="auth-container"
        bordered={false}
      >
        <LoginForm />
      </Card>
    </>
  );
}

function LoginForm() {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleForm = async () => {
    const { username, password } = form.getFieldsValue(true);
      window.sessionStorage.setItem("currentUser", JSON.stringify({
        username: username,
        password: password,
      }))
      history.push("/map")
  };

  return (
    <>
      <Form
        form={form}
        size="large"
        onFinish={handleForm}
        validateTrigger="onSubmit"
        name="login-form"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your login details",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "grey" }} />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "grey" }} />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#f04f14",
              color: "white",
            }}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
