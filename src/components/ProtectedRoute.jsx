import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, accessToken } = useContext(UserContext);
  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
