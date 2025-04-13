'use client';

import React, { useEffect } from 'react'
import BusinessCard from './BusinessCard';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchBusinessesForGrid } from '@/actions/servicar/business/fetchAllBusinesses';
import Swal from 'sweetalert2';
import CircularLoader from './CircularLoader';
import NoDataFound from './NoDataFound';

const BusinessesGrid = () => {

  const { data: businessList, isLoading, error } = useQuery({
    queryKey: ['businesses-for-grid'],
    queryFn: fetchBusinessesForGrid
  })

  useEffect(() => {
    if(error && !isLoading){
      Swal.fire({
        icon:'error',
        title:'Error Fetching Businesses!',
        text: error.message,
        confirmButtonColor: '#383a49'
      })
    }
  }, [error])

  if (isLoading) {
    return (
      <div className='h-full w-full p-5 pt-20 overflow-auto flex gap-5 flex-col items-center'>
        <CircularLoader size={100} strokeWidth={10} color='text-black'/>
      </div>
    );
  }

  if (!businessList || businessList.length === 0) {
    return (<NoDataFound title={'No businesses found!'} text={'Please add new businesses from Admin Panel.'}/>);
  }

  return (
    <div className='h-full w-full p-5 overflow-auto flex gap-5 flex-col items-center'>
      <div className='w-full flex gap-5 justify-center flex-wrap p-5'>
        {businessList?.map((business, index) => 
            <BusinessCard key={index} business={business}/>
        )}
      </div>
      {/* <Button size={'lg'} className='cursor-pointer'>
        Load More
      </Button> */}
    </div>
  )
}

export default BusinessesGrid