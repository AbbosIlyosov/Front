'use client';

import React from 'react'
import BusinessCard from './BusinessCard';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchBusinessesForGrid } from '@/actions/servicar/business/fetchAllBusinesses';

const NoContent = ({ message = "No businesses found." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
    <svg className="w-20 h-20 mb-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-6 4h6m-3-10v6m-6 4v-4m12 4v-4m-6-6v.01" />
    </svg>
    <p className="text-xl">{message}</p>
  </div>
);

const BusinessesGrid = () => {

  const { data: businessList, isLoading, error } = useQuery({
    queryKey: ['businesses-for-grid'],
    queryFn: fetchBusinessesForGrid
  })

  if (isLoading) {
    return (
      <div className='h-full w-full p-5 overflow-auto flex gap-5 flex-col items-center'>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error loading businesses.
      </div>
    );
  }

  if (!businessList || businessList.length === 0) {
    return <NoContent />;
  }

  return (
    <div className='h-full w-full p-5 overflow-auto flex gap-5 flex-col items-center'>
      <div className='w-full flex gap-5 justify-center flex-wrap p-5'>
        {businessList?.map((business, index) => 
            <BusinessCard key={index} business={business}/>
        )}
      </div>
      <Button size={'lg'} className='cursor-pointer'>
        Load More
      </Button>
    </div>
  )
}

export default BusinessesGrid