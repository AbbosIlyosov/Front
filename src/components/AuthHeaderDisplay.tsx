'use client';

import React, { useEffect, useState } from 'react'
import { useAuthUser } from './AuthUserProvider';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { clearAuthCookies } from '@/lib/cookies';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const AuthHeaderDisplay = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthUser();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [ isHydrated, setIsHydrated] = useState<boolean>(false);


  useEffect(() => {
    setIsHydrated(true);
  }, [])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const logout = () => {
    clearAuthCookies();
    setAuthenticatedUser(null);
    setShowDropdown(false);
    Swal.fire({
      icon: 'success',
      text:'Logout Successful.',
      timer:1000,
      showConfirmButton:false
    })
    redirect('/login');
  }

  if(!isHydrated){
    return null;
  }

  if(!authenticatedUser){
    return <LoginRegisterButtons/>
  }

  return (
    <div className="flex items-center space-x-4 relative">
      <div
        onClick={toggleDropdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}
      >
        <Avatar className='text-black'>
          <AvatarImage src={authenticatedUser.imageUrl} />
          <AvatarFallback>{getInitials(authenticatedUser.firstName, authenticatedUser.lastName)}</AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex flex-col leading-tight">
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>{authenticatedUser.firstName} {authenticatedUser.lastName}</span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', opacity: 0.8 }}>
            {authenticatedUser.role}
          </span>
        </div>

        {/* Chevron */}
        <ChevronDown size={18} color="white" />
      </div>

      {/* Dropdown */}
      {showDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '60px',
                right: 0,
                background: '#2D2F3B',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                padding: '8px 0',
                width: '180px',
                zIndex: 20,
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {authenticatedUser.role.toLowerCase() == 'admin' && 
                <li><DropdownLink href="/admin-panel" text="Admin Panel" onClick={toggleDropdown} /></li>}
                <li><DropdownLink href="/profile" text="Profile" onClick={toggleDropdown} /></li>
                <li><DropdownLink href="/appointments" text="Appointments" onClick={toggleDropdown} /></li>
                <li><DropdownLink href="/reviews" text="Reviews" onClick={toggleDropdown} /></li>
                <hr />
                <li className='hover:bg-gray-600'>
                  <button
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      // background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '16px',
                    }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
        </div>)}
  </div>
  );
}

const LoginRegisterButtons = () => {
  return <div className='flex gap-1'>
    <Link href={'/login'} style={loginButtonStyle}>Login</Link>
    <Link href={'/register'} style={signupButtonStyle}>Register</Link>
  </div>
}

interface DropdownLinkProps {
  href: string;
  text: string;
  onClick: () => void
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ href, text, onClick }) => (
  <Link
    onClick={onClick}
    href={href}
    className='hover:bg-gray-600'
    style={{
      display: 'block',
      padding: '10px 16px',
      color: 'white',
      textDecoration: 'none',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '16px',
    }}
  >
    {text}
  </Link>
);

const loginButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '2px solid white',
  borderRadius: '4px',
  padding: '8px 16px',
  color: 'white',
  cursor: 'pointer',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '20px',
};

const signupButtonStyle: React.CSSProperties = {
  background: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  color: '#383A49',
  cursor: 'pointer',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '20px',
};

export default AuthHeaderDisplay