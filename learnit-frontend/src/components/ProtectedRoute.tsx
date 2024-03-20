import { useContext, useEffect } from "react";

import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (true /* replace with an actual condition */) {
      navigate("/", { replace: true });
    }
  }, [navigate /* auth */]);
  return children;
};

export default ProtectedRoute;
