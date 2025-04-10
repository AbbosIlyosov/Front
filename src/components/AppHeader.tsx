'use client';

import Link from 'next/link';
import AuthHeaderDisplay from './AuthHeaderDisplay';

// interface AppHeaderProps {
//   user: string
// }

const AppHeader = () => {
  return (
    <header className="h-[80px] w-full bg-[#383A49] text-white top-0 left-0 relative z-10">
      <div className="min-w-3xl w-full mx-auto h-full px-6 flex justify-between items-center">
        {/* App Name */}
        <span 
          style={{
            fontFamily: 'Passion One, sans-serif',
            fontWeight: 400,
            fontSize: '40px',
            lineHeight: '100%',
            letterSpacing: '0px',
          }}
        >
          Servicar
        </span>
        {/* Navigation */}
        <nav>
          <ul className='flex gap-10 list-none m-0 p-0'>
            {/* <li><Link href="/map" style={navLinkStyle}>Map</Link></li> */}
            <li><Link href="/businesses" style={navLinkStyle}>Businesses</Link></li>
            <li><Link href="/points" style={navLinkStyle}>Points</Link></li>
          </ul>
        </nav>

        {/* Right Section */}
        <div style={{ position: 'relative' }}>
          <AuthHeaderDisplay/>
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

export default AppHeader;
