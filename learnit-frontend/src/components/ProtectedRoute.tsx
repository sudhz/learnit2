import { useEffect } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../services/hooks/useLocalStorage";
import useCookies from "../services/hooks/useCookies";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getItem, removeItem } = useLocalStorage("user");
  const { getCookie } = useCookies();
  const token = getCookie("token");

  useEffect(() => {
    if (getItem() && !token) {
      removeItem();
      navigate("/", { replace: true });
    } else if (!getItem() && (token == "null" || !token)) {
      navigate("/", { replace: true });
    }
  }, [navigate, getItem(), token]);

  useEffect(() => {
    if (
      getItem()?.role === "student" &&
      location.pathname.includes("instructor")
    ) {
      navigate("/student/home", { replace: true });
    } else if (
      getItem()?.role === "instructor" &&
      location.pathname.includes("student")
    ) {
      navigate("/instructor/home", { replace: true });
    }
  }, [navigate, getItem(), location.pathname]);

  return children;
};

export default ProtectedRoute;
