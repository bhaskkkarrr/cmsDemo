import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [tokenStr, setTokenStr] = useState(
    () => localStorage.getItem("token") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token) {
      setAuthenticated(true);
      setTokenStr(token);
    }
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const login = (credentials) => {
    setAuthenticated(true);
    setUser(credentials);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider
      value={{ user, authenticated, tokenStr, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
