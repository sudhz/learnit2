import { useContext, useEffect } from "react";
import { AuthContext } from "../services/context/auth/authContext";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [navigate, auth]);
  return children;
};

export default ProtectedRoute;
