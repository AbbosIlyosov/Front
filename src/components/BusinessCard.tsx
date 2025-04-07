import React from 'react'

interface BusinessInfo {
    busineessName: string;
    businessLogo: string[] | null;
  }

const BusinessCard = (business:BusinessInfo) => {
  return (
    <div className='bg-gray-50 h-[150px] w-[400] rounded-2xl border-2 shadow-xl p-2 flex gap-3 items-center cursor-pointer hover:shadow-[gray]'>
        <div className='bg-yellow-300  border-[#383a49] h-[130px] w-[130px] rounded-2xl border-4 flex justify-center items-center'>
            <img src='/' alt='logo'/>
        </div>
        <h3 className='font-bold text-2xl'>
            {business.busineessName}
        </h3>
    </div>
  )
}

export default BusinessCard