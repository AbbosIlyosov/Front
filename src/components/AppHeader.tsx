'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clearAuthCookies } from '@/lib/cookies';

interface AppHeaderProps {
  user: string
}

const AppHeader: React.FC<AppHeaderProps> = () => {
  // ✅ Mock user data
  const isLoggedIn = true;
  const userName = 'Jane Doe';
  const avatar = ''; // Try a valid image URL for real avatar
  const role = 'Admin';

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="h-[80px] w-full bg-[#383A49] text-white top-0 left-0 relative z-10">
      <div className="min-w-3xl w-full mx-auto h-full px-6 flex justify-between items-center">
        {/* App Name */}
        <Link 
          href="/"
          style={{
            fontFamily: 'Passion One, sans-serif',
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: '100%',
            letterSpacing: '0px',
          }}
        >
          Servicar
        </Link>

        {/* Navigation */}
        <nav>
          <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link href="/map" style={navLinkStyle}>Map</Link></li>
            <li><Link href="/businesses" style={navLinkStyle}>Businesses</Link></li>
            <li><Link href="/points" style={navLinkStyle}>Points</Link></li>
          </ul>
        </nav>

        {/* Right Section */}
        <div style={{ position: 'relative' }}>
          {isLoggedIn ? (
            <div
              onClick={toggleDropdown}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              {/* Avatar */}
              {avatar ? (
                <img
                  src={avatar}
                  alt={userName}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#5C5F79',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                  }}
                >
                  {getInitials(userName)}
                </div>
              )}

              {/* User Info */}
              <div className="flex flex-col leading-tight">
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>{userName}</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', opacity: 0.8 }}>
                  {role}
                </span>
              </div>

              {/* Chevron */}
              <ChevronDown size={18} color="white" />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/login">
                <button style={loginButtonStyle}>Login</button>
              </Link>
              <Link href="/register">
                <button style={signupButtonStyle}>Sign Up</button>
              </Link>
            </div>
          )}

          {/* Dropdown */}
          {isLoggedIn && showDropdown && (
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
                <li><DropdownLink href="/admin-panel" text="Admin Panel" onClick={toggleDropdown} /></li>
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
                    onClick={() => {
                      // You can clear auth state here if needed
                      clearAuthCookies();
                      setShowDropdown(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const navLinkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '24px',
};

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

export default AppHeader;
