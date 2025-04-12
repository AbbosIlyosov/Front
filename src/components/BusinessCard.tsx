import { BusinessGridInfo } from '@/interfaces/Business';
import Image from 'next/image';
import React, { FC } from 'react'

interface BusinessCardProps {
    business: BusinessGridInfo;
  }

const BusinessCard:FC<BusinessCardProps> = ({business}) => {
  return (
    <div className='bg-gray-200 h-[150px] w-[400] rounded-2xl border-2 shadow-xl p-2 flex gap-3 items-center cursor-pointer hover:shadow-[gray]'>
      <div className='border-[#383a49] h-[130px] w-[130px] rounded-2xl border-2 flex justify-center items-center p-0 relative'>
        <Image fill unoptimized
          src={`data:image/png;base64,${business?.logo}`}
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