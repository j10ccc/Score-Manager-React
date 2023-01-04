import { Navigate, Outlet, useAccess } from "@umijs/max";

const Auth = () => {
  const { isLogin } = useAccess();
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Auth;
