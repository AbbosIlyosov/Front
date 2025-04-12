'use client';

import Link from 'next/link';
import AuthHeaderDisplay from './AuthHeaderDisplay';
import { useActivePath } from './AuthUserProvider';

// interface AppHeaderProps {
//   user: string
// }

const AppHeader = () => {

  const { activePath } = useActivePath();

  return (
    <header className="h-[80px] w-full bg-[#383A49] text-white top-0 left-0 relative z-10">
      <div className="min-w-3xl w-full mx-auto h-full px-6 flex justify-between items-center">
        {/* App Name */}
        
          {activePath.toLowerCase().startsWith('/admin-panel') ?  
          <Link
          href={'/admin-panel'} 
          style={appTitleStyle}
        >
          Admin Panel
        </Link> : 
        <span 
          style={appTitleStyle}
        >
          Servicar
        </span>}
        {/* Navigation */}
        <nav>
          <ul className='flex gap-10 list-none m-0 p-0'>
            {/* <li><Link href="/map" style={navLinkStyle}>Map</Link></li> */}
            <li><Link href="/businesses" style={navLinkStyle} className={`${activePath.startsWith('/business') ? 'text-yellow-300' : 'text-white'} hover:underline`}>Businesses</Link></li>
            <li><Link href="/points" style={navLinkStyle} className={`${activePath.startsWith('/points') ? 'text-yellow-300' : 'text-white'} hover:underline`}>Points</Link></li>
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
  fontFamily: 'Poppins, sans-serif',
  fontSize: '24px',
};

const appTitleStyle: React.CSSProperties = {
  fontFamily: 'Passion One, sans-serif',
  fontWeight: 400,
  fontSize: '40px',
  lineHeight: '100%',
  letterSpacing: '0px',
};

export default AppHeader;
