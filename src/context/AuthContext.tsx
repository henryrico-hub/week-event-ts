import { message } from "antd";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getToken, removeToken, setToken } from "src/utils/helpers";

type AuthContextType = {
  user: any;
  isLoading: boolean;
  setUser: (user: any) => void;
  login: (userData: any) => void;
  logout: () => void;
};

// context
export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

// provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Por ahora, no establecemos nada hasta que fetchLoggedInUser lo haga
    }
  }, []);

  const login = (userData: any) => {
    setToken(userData.jwt);
    setUserData(userData.user);
  };

  const logout = () => {
    removeToken();
    setUserData(null);
  };
  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      setUserData(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user: any) => {
    setUserData(user);
  };

  useEffect(() => {
    const authToken = getToken();
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
