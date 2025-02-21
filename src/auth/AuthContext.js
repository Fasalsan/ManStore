import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { Config } from "../util/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${Config.base_url}UserLogin`, {
        email,
        password,
      });
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem("authToken", token);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
