"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user from cookie on first load
  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    setUser(userData);
    redirect("/");
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
