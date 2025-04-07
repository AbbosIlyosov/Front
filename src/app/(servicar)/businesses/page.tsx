import BusinessesGrid from '@/components/BusinessesGrid'
import React from 'react'

const BusinessesPage = () => {
  return (
    <main className='flex gap-0 h-[calc(100vh-80px)] overflow-hidden'>
      <div 
          className="absolute inset-0 bg-bottom bg-no-repeat -z-10 before:content-[''] before:absolute before:inset-0 before:backdrop-blur-none"
          style={{backgroundImage: "url('/backgrounds/BusinessPageBackground.png')"}}
        >
        </div>
      <BusinessesGrid/>
    </main>
  )
}

export default BusinessesPage