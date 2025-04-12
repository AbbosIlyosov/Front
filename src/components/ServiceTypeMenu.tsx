'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import { CarTaxiFront, Fuel, LifeBuoy, Settings, Wrench } from 'lucide-react'
import { Category } from '@/interfaces/Category';
import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesAction } from '@/actions/servicar/category/fetchCategories';
import Loading from './CircularLoader';
import CircularLoader from './CircularLoader';

const ServiceTypeMenu = () => {
    const [selectedServiceType, setServiceType] = useState<Category>();

    const { data:serviceTypeList, isLoading } = useQuery({
      queryKey:['categories'],
      queryFn: fetchCategoriesAction
    })


    const handleServiceTypeChange = (type: Category) => {
        if(type !== selectedServiceType){
            setServiceType(type);
        }
      }

  return (
    <div>
      <h3 className="font-medium mb-3 px-1">Service Type</h3>
      <div className="grid grid-cols-2 gap-2"> 
        {isLoading && (
          <div className="col-span-2 flex justify-center items-center py-6">
            <CircularLoader size={32} color="text-primary" />
          </div>
        )}
        
        {serviceTypeList?.map((serviceType, index) => (
          <Button 
            key={index}
            onClick={() => handleServiceTypeChange(serviceType)} 
            variant={selectedServiceType?.id === serviceType.id ? 'default': 'outline'} 
            className={`flex flex-col items-center justify-center h-24 w-full gap-2 p-2 cursor-pointer
              ${selectedServiceType?.id === serviceType.id ? "bg-[#383a49] text-white" : "bg-white text-black"}`}
          >
          {serviceType.name.toLowerCase() === 'fuel' && <Fuel scale={10} name='fuel' className='h-40 w-40'  />}
          {serviceType.name.toLowerCase() === 'maintenance' && <Settings className="h-6 w-6" />}
          {serviceType.name.toLowerCase() === 'car wash' && <CarTaxiFront className="h-6 w-6" />}
          {serviceType.name.toLowerCase() === 'repair' && <Wrench className="h-6 w-6" />}
          {serviceType.name.toLowerCase() === 'tire' && <LifeBuoy className="h-6 w-6" />}

          <span className="text-xs font-medium">{serviceType.name}</span>
        </Button>
        ))}
      </div>
    </div>
  )
}

export default ServiceTypeMenu