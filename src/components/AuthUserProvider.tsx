'use client';

import { AuthenticatedUser } from '@/types/AuthenticatedUser';
import Cookies from 'js-cookie';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthUserContextType {
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: (user: AuthenticatedUser | null) => void;
}

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

interface AuthUserProviderProps {
  children: ReactNode;
}

export const AuthUserProvider: FC<AuthUserProviderProps> = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get('auth_user');
    if(userCookie){
      setAuthenticatedUser(JSON.parse(userCookie));
    }
  }, [])


  return (<AuthUserContext.Provider value={{ authenticatedUser, setAuthenticatedUser}}>
    {children}
  </AuthUserContext.Provider>);
}

// Custom hook to access the context
export const useAuthUser = (): AuthUserContextType => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error('useAuthUser must be used within an AuthUserProvider');
  }
  return context;
};
