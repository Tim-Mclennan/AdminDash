import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";

const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};

export default Login