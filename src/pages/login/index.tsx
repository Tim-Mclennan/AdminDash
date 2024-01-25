import { AuthPage } from "@refinedev/antd";

const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
    />
  );
};

export default Login