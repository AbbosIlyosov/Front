
import Link from 'next/link';

const AppHeader = ({ isLoggedIn = false, userName = "", avatar = "" }) => {

  return (
    <header className="h-[80px] w-full bg-[#383A49] text-white fixed top-0 left-0 relative">
        <div className="min-w-3xl w-full mx-auto h-full px-6 flex justify-between items-center">
      {/* App Name - Left */}
    <Link 
        href='/'
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

      {/* Navigation - Middle */}
      <nav>
        <ul 
          style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link 
              href="/map" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '24px'
              }}
            >
              Map
            </Link>
          </li>
          <li>
            <Link 
              href="/businesses" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '24px'
              }}
            >
              Businesses
            </Link>
          </li>
          <li>
            <Link 
              href="/points" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '24px'
              }}
            >
              Points
            </Link>
          </li>
        </ul>
      </nav>

      {/* Auth Section - Right */}
      <div>
        {isLoggedIn ? (
          <div style={{ position: 'relative' }}>
            <div 
            //   onClick={toggleDropdown}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={userName} 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
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
                    alignItems: 'center'
                  }}
                >
                  {/* <User size={24} /> */}
                </div>
              )}
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px' }}>
                {userName}
              </span>
              {/* <ChevronDown size={18} /> */}
            </div>

            {/* Dropdown Menu */}
            {/* {isDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  background: '#383A49',
                  borderRadius: '4px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  padding: '8px 0',
                  width: '180px',
                  zIndex: 10
                }}
              >
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <li>
                    <Link 
                      href="/profile" 
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        color: 'white',
                        textDecoration: 'none',
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/dashboard" 
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        color: 'white',
                        textDecoration: 'none',
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                      }}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/settings" 
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        color: 'white',
                        textDecoration: 'none',
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                      }}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )} */}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login">
              <button
                style={{
                  background: 'transparent',
                  border: '2px solid white',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                }}
              >
                Login
              </button>
            </Link>
            <Link href="/register">
              <button
                style={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  color: '#383A49',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default AppHeader;