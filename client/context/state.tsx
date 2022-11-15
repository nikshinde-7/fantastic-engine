import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
  } from 'react';
  
  type authContextType = {
    user: boolean;
    login: () => void;
    logout: () => void;
  };
  
  const authContextDefaultValues: authContextType = {
    user: false,
    login: () => {},
    logout: () => {},
  };
  
  const AuthContext = createContext<authContextType>(authContextDefaultValues);
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  
  type Props = {
    children: ReactNode;
  };
  
  export function AuthProvider({ children }: Props) {
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setUser(true);
      }
    }, []);
  
    const [user, setUser] = useState<boolean>(false);
  
    const login = () => {
      setUser(true);
    };
  
    const logout = () => {
      setUser(false);
    };
  
    const value = {
      user,
      login,
      logout,
    };
  
    return (
      <>
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      </>
    );
  }
  