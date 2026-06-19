import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, seedUsers, logoutUser as doLogout } from "../data/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    seedUsers();
    const saved = getCurrentUser();
    setUser(saved);
    setAuthLoading(false);
  }, []);

  function logout() {
    doLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
