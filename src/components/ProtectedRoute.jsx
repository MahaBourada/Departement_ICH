import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../contexts/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, accessToken, loading } = useContext(UserContext);

  if (loading) {
    // You can return a spinner or null while checking auth
    return (
      <SyncLoader
        color={localStorage.getItem("theme") === "dark" ? "#EDEDED" : "#0A0A0A"}
        className="text-red-400"
        size={20}
        aria-label="Chargement du Spinner"
      />
    );
  }

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
