import { BusinessGridInfo } from '@/interfaces/Business';
import { usePointsFilter } from '@/stores/pointsFilterStore';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { FC } from 'react'

interface BusinessCardProps {
    business: BusinessGridInfo;
  }

const fallbackLogo = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nO3bsU3DMBBF0WNkAQ3YAM3YAQ2wAzfADNgAzcgEXEuh3szKLgEvVdt4YYklWgAAAAAAAAAAAADgA/xp0zF7Mb4Nzv+V81fMm98zPn/6MrTpvfrtjgGZ4Db/AhngN5zH3NvDOnwuUvAFHu1zBmnOIzx50rMjPPMLM3z2kZ9wGdvEn/BnHD/1dAXmca3gMec3mfBnp8DjvIueP/qkWj0euvnn6vWxXnARzs7N+w+eDf/sx/wH7i93PmtfM7jMuf5rL2N8z5+7Gb+5dD3vA9zz1z7N44xXx/Ob4GnX2nFP+N0UAAAAAAAAAAAAA4P+wAawKViIHtcuFAAAAAElFTkSuQmCC";

const BusinessCard:FC<BusinessCardProps> = ({business}) => {

  const { setBusiness } = usePointsFilter()
  const handleBusinessClick = () => {
    setBusiness(business);
    redirect('/points');
  }

  return (
    <div onClick={handleBusinessClick} className='bg-gray-200 h-[150px] w-[400] rounded-2xl border-2 shadow-xl p-2 flex gap-3 items-center cursor-pointer hover:shadow-[gray]'>
      <div className='border-[#383a49] h-[130px] w-[130px] rounded-2xl border-2 flex justify-center items-center p-0 relative'>
        <Image 
          fill 
          unoptimized
          src={`data:image/png;base64,${business?.logo || fallbackLogo}`}
          alt="logo"
          className="object-cover"
        />
      </div>
      <h3 className='font-bold text-2xl'>
        {business.name} <hr />
      </h3>
    </div>
  )
}

export default BusinessCard