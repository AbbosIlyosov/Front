'use client';

import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { Input } from './ui/input'
import ServiceTypeMenu from './ServiceTypeMenu'
import SelectList from './ui/select-list'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchLocations } from '@/actions/servicar/location/fetchLocations'
import Swal from 'sweetalert2';
import { usePointsFilter } from '@/stores/pointsFilterStore';
import { fetchBusinessesForSelectList } from '@/actions/servicar/business/fetchAllBusinesses';


const PointFilterCard = () => {

  const { filter, setLocation, setBusiness, resetFilter } = usePointsFilter();

  const {data: locations, isLoading: locationLoading, error: locationError} = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const result = await fetchLocations();
      return [
        {
          id: 0,
          city: 'All Cities'
        },
        ... result
      ]
    }
  })

  const { data: businesses, isLoading: businessLoading, error: businessError } = useQuery({
      queryKey: ['business-select-list'],
      queryFn: async () => {
        const result = await fetchBusinessesForSelectList();
        return [
          {
            id: 0,
            name: 'All Businesses'
          },
          ... result
        ]
      }
    }); 

  useEffect(() => {
    if(locationError){
      Swal.fire({
        icon: 'error',
        title: 'Error fetching locations!',
        text: locationError.message,
        confirmButtonColor: '#383a49'
      })
    }
  }, [locationError])

  useEffect(() => {
    if(businessError){
      Swal.fire({
        icon: 'error',
        title: 'Error fetching businesses!',
        text: businessError.message,
        confirmButtonColor: '#383a49'
      })
    }
  }, [businessError])

  return (
    <div className='basis-xs shrink-0 flex flex-col gap-4 p-2 overflow-auto'>

        {/* Search bar */}
        <div className="relative mt-3 mb-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 w-full"
          />
        </div>

        {/* Business */}
        <h2 className="font-medium px-1 mt-3">Business</h2>
        <SelectList 
          selectListLabel='Business' 
          options={businesses ?? [{id:0, name: businessLoading ? 'Loading...' : 'Not Found'}]} 
          selected={filter.business}
          setSelected={setBusiness}
          getOptionLabel={(option) => option.name}
        />

        {/* Service Type */}
        <ServiceTypeMenu/>

        {/* Location */}
        <h2 className="font-medium px-1 mt-3">Location</h2>
        <SelectList 
          selectListLabel='City' 
          options={locations ?? [{id:0, city: locationLoading ? 'Loading...' : 'Not Found'}]} 
          selected={filter.location}
          setSelected={setLocation}
          getOptionLabel={(option) => option.city}
        />

        {/* Filter Button */}
        <div className="flex justify-end">
            <Button onClick={resetFilter} className="mt-4 cursor-pointer">Reset Filter</Button>
          </div>

      </div>
  )
}

export default PointFilterCard