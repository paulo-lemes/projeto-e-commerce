import { createContext, useContext, useEffect, useState } from "react";
import fetchApi from "../api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserApi = async (id) => {
    const { data } = await fetchApi(`/users/${id}`);
    console.log(data);
    setUser(data);
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    console.log(decoded);
    getUserApi(decoded.sub)
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      getUserApi(decoded.sub)
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
