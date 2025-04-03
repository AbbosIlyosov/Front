import { ChevronRight, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface Point {
  pointName:string,
  opensAt: string,
  closesAt: string,
  image: string,
  rating:number
}

const PointCard = (point:Point) => {
  return (
    <div className='h-[400px] w-[265px] rounded-2xl p-5 bg-white flex flex-col justify-evenly items-center'>
        <div className='bg-yellow-400 h-[225px] w-[225px] rounded-2xl border-3 border-[#383a49]'>
          Image
        </div>
        <h2 className='font-medium text-[20px]'>{point.pointName}</h2>
        <span className='font-[400] text-[20px]'>{point.opensAt} | {point.closesAt}</span>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center justify-start grow-1'>
            
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} color={i < point.rating ? 'orange' : 'gray'} fill={i < point.rating ? 'orange' : 'gray'} />
          ))}

          {/* <span className='font-[400] text-[20px] ml-1'>{point.rating}</span> */}
          </div>
          <Button className='cursor-pointer'>
            <ChevronRight/>
          </Button>
        </div>
    </div>
  )
}

export default PointCard