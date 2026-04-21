import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthContextType, User } from "../types/authinterface";
import { api } from "@/api/api";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.get("/api/user")

      if (res.status !== 200) {
        setUser(null);
        return;
      }

      const data = await res.data;
      setUser(data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
      console.log(user)
    };

    init();
  }, []);

  const login = async () => {
    await refreshUser();
    window.location.reload();
  };


  const logout = async () => {
    try {
    setLoading(true);
      await api.post("/api/logout");

      setUser(null);
      localStorage.clear();
    setLoading(false);
    window.location.href = "/myresume";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};