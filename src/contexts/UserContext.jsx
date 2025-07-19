import { createContext, useEffect, useState } from "react";
import api from "../api/api"; // Make sure this import exists

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { first_name, last_name, accessToken }
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.get("/auth/refresh", { withCredentials: true });
        setAccessToken(res.data.accessToken);
        setUser({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          accessToken: res.data.accessToken,
        });
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };
    tryRefresh();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        loading, // Provide loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
