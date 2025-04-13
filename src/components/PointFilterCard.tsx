'use client';

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import ServiceTypeMenu from './ServiceTypeMenu'
import SelectList from './ui/select-list'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchLocations } from '@/actions/servicar/location/fetchLocations'
import { Location } from '@/interfaces/Location'
import Swal from 'sweetalert2';
import { usePointsFilter } from '@/stores/pointsFilterStore';

const PointFilterCard = () => {

  const [selectedLocation, setSelectedLocation ] = useState<Location>();

  const { filter, setLocationId, resetFilter } = usePointsFilter();

  const {data: locations, isLoading: locationLoading, error: locationError} = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations
  })

  useEffect(() => {
    if(selectedLocation && selectedLocation.id !== filter.locationId){
      setLocationId(selectedLocation.id);
    }
  }, [selectedLocation])

  useEffect(() => {
    if(filter.locationId !== selectedLocation?.id){
      setSelectedLocation(locations?.find(x => x.id === filter.locationId))
    }
  }, [filter.locationId])

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

  return (
    <div className='basis-xs shrink-0 flex flex-col gap-4 p-2'>

        {/* Search bar */}
        <div className="relative mt-3 mb-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 w-full"
          />
        </div>
      
        {/* Service Type */}
        <ServiceTypeMenu/>

        {/* Location */}
        <h2 className="font-medium px-1 mt-3">Location</h2>
        <SelectList 
          selectListLabel='City' 
          options={locations ?? [{id:0, city: locationLoading ? 'Loading...' : 'Not Found'}]} 
          selected={selectedLocation}
          setSelected={setSelectedLocation}
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