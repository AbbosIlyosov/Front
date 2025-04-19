'use client';

import React, { useEffect } from 'react'
import PointCard from './PointCard'
import { useRouter } from 'next/navigation';
import { PointsGridInfo } from '@/interfaces/Point';
import { useQuery } from '@tanstack/react-query';
import CircularLoader from './CircularLoader';
import Swal from 'sweetalert2';
import NoDataFound from './NoDataFound';
import { fetchPointsForGrid } from '@/actions/servicar/point/fetchPoints';
import { usePointsFilter } from '@/stores/pointsFilterStore';

  
const PointGrid = () => {
  const router = useRouter();

  const { filter } = usePointsFilter();

  const { data: points, isLoading, error } = useQuery({
    queryKey: ['points-for-grid',filter.business.id, filter.category.id, filter.location.id],
    queryFn: () => fetchPointsForGrid({
      businessId: filter.business.id,
      locationId: filter.location.id,
      categoryId: filter.category.id 
    })
  })

   useEffect(() => {
    if(error){
      Swal.fire({
        icon:'error',
        title:'Error Fetching Points!',
        text: error.message,
        confirmButtonColor: '#383a49'
      })
    }
   }, [error])

  const handleClickCard = (point:PointsGridInfo) => {
    const query = new URLSearchParams({
      name: point.pointName
    }).toString()
  
    router.push(`/points/${point.id}/appointments?${query}`)
  }

  if(isLoading){
    return <div className='h-full w-full pt-20  flex justify-center'>
      <CircularLoader size={80} strokeWidth={10} />
    </div>
  }

  if (!points || points.length === 0) {
    return (<NoDataFound title={'No points found!'} text={'Please change the filters from left or add new points from Admin Panel.'}/>);
  }

  return (
    <div className='h-full w-full py-5 overflow-auto'>
      <div className='w-full flex gap-5 flex-wrap justify-center'>
        {points?.map((point, index) => (<PointCard 
            key={index} 
            point = {point}
            onClick={handleClickCard}
            />))}
      </div>
      {/* <div className='flex justify-center mt-10'>
        <Button className='cursor-pointer'>
            Load More
        </Button>
      </div> */}
    </div>
  )
}

export default PointGrid