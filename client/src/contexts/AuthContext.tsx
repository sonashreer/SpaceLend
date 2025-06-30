
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  userAvatar: string;
  userName: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // Use consistent Sophia Carter profile across the platform
  const userAvatar = "/lovable-uploads/43608ed6-2ced-42a2-89da-0612cfd5766f.png";
  const userName = "Sophia Carter";

  // Check localStorage on app load to maintain persistent login
  useEffect(() => {
    const savedLoginState = localStorage.getItem('spacelend_isLoggedIn');
    const savedUserEmail = localStorage.getItem('spacelend_userEmail');
    
    if (savedLoginState === 'true' && savedUserEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedUserEmail);
    }
  }, []);

  const login = (email: string, password: string) => {
    // Accept any credentials for demo purposes
    setIsLoggedIn(true);
    setUserEmail(email);
    
    // Persist login state to localStorage
    localStorage.setItem('spacelend_isLoggedIn', 'true');
    localStorage.setItem('spacelend_userEmail', email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    
    // Clear login state from localStorage
    localStorage.removeItem('spacelend_isLoggedIn');
    localStorage.removeItem('spacelend_userEmail');
  };

  const value: AuthContextType = {
    isLoggedIn,
    userEmail,
    userAvatar,
    userName,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
