import PointFilterCard from '@/components/PointFilterCard'
import PointGrid from '@/components/PointGrid'
import React from 'react'

const PointsPage = () => {
  return (
    <main className='flex gap-0 h-[calc(100vh-80px)] overflow-hidden'>
      
      {/* Side Nav */}
      <PointFilterCard/>

      {/* Main Content */}
      <div className='relative w-full h-full overflow-hidden'>
        <div 
            className="absolute top-0 right-0 inset-0 bg-cover bg-center bg-no-repeat -z-10 before:content-[''] before:absolute before:inset-0 before:backdrop-blur-none"
            style={{backgroundImage: "url('/backgrounds/PointAppointmentBackground.png')"}}
          >
        </div>
         <PointGrid/>
      </div>
    </main>
  )
}

export default PointsPage