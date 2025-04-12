'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useActivePath } from './AuthUserProvider';

const UserSideNavButtonGroup = () => {

    const { activePath } = useActivePath();

    const [isHydrated, setIsHydrated] = useState<boolean>(false);


    useEffect(() => {
        setIsHydrated(true);
    }, [])

    if(!isHydrated){
        return null;
    }

  return (
    <div className='flex flex-col justify-start items-end gap-2 p-2'>
        <Link href={'/profile'} style={sidenavButtonStyle} className={activePath.toLowerCase().startsWith('/profile') ?  'text-yellow-400' : 'text-white'} >Profile</Link>
        <Link href={'/appointments'} style={sidenavButtonStyle} className={activePath.toLowerCase().startsWith('/appointments') ?  'text-yellow-400' : 'text-white'}>Appointments</Link>
        <Link href={'/reviews'} style={sidenavButtonStyle} className={activePath.toLowerCase().startsWith('/reviews') ?  'text-yellow-400' : 'text-white'}>Reviews</Link>
    </div>
  )
}

const sidenavButtonStyle: React.CSSProperties = {
    backgroundColor:'#383a49',
    borderRadius: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    width:'100%',
    textAlign:'center',
    boxShadow:''
  };

export default UserSideNavButtonGroup