'use client';

import { AuthenticatedUser } from '@/interfaces/AuthenticatedUser';
import Cookies from 'js-cookie';
import { redirect, usePathname } from 'next/navigation';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface AppContextType {
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: (user: AuthenticatedUser | null) => void;
  activePath: string;
  setActivePath: (pathname: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AuthUserProviderProps {
  children: ReactNode;
}

export const AuthUserProvider: FC<AuthUserProviderProps> = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
  const [activePath, setActivePath] = useState<string>('');

  const pathname = usePathname();

  useEffect(() => {
    const userCookie = Cookies.get('auth_user');
    if(userCookie){
      setAuthenticatedUser(JSON.parse(userCookie));
    }
  }, [])

  // Monitor cookie expiry
  useEffect(() => {
    const interval = setInterval(() => {
      const cookie = Cookies.get('auth_user');
      if (!cookie && authenticatedUser !== null) {
        setAuthenticatedUser(null); // Clear context if cookie is gone
        Swal.fire({
          text: 'Login session expired. Please login again.',
          icon:'info'
        })
        redirect('/login');
      }
    }, 2000); // check every 2 seconds

    return () => clearInterval(interval);
  }, [authenticatedUser]);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname])

  return (<AppContext.Provider value={{ authenticatedUser, setAuthenticatedUser, activePath, setActivePath}}>
    {children}
  </AppContext.Provider>);
}


interface AuthUserType {
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: (user: AuthenticatedUser | null) => void;
}

// Custom hook to access the context
export const useAuthUser = (): AuthUserType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuthUser must be used within an AuthUserProvider');
  }

  return {authenticatedUser: context.authenticatedUser, setAuthenticatedUser: context.setAuthenticatedUser};
};


interface ActivePathType {
  activePath: string;
  setActivePath: (pathname: string) => void;
}

export const useActivePath = (): ActivePathType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useActivePath must be used within an AuthUserProvider');
  }

  return {activePath: context.activePath, setActivePath: context.setActivePath};
}