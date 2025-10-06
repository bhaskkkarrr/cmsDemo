import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (token) {
      setAuthenticated(true);
      setToken(token);
    }
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const login = (credentials) => {
    setAuthenticated(true);
    setUser(credentials);
    console.log("Credentials", credentials);
  };

  const logout = () => {
    console.log("Bye");
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, authenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
