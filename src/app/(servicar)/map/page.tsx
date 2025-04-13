import PointFilterCard from '@/components/PointFilterCard'
import React from 'react'


const MapsPage = () => {
  return (
    <main className='flex gap-0 h-[calc(100vh-80px)] overflow-hidden'>
      
      {/* Side Nav */}
      <PointFilterCard/>

      {/* Main Content */}
      <div className='bg-gray-100 grow p-5 overflow-auto'>
        Map
      </div>
    </main>
  )
}

export default MapsPage