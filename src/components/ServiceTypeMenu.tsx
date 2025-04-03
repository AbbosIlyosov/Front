'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import { CarTaxiFront, Fuel, LifeBuoy, Settings, Wrench } from 'lucide-react'

type serviceType = 'Fuel' | 'CarWash' | 'Maintenance' | 'Repair' | 'Tyre'

const ServiceTypeMenu = () => {
    const [selectedServiceType, setServiceType] = useState<serviceType>('Fuel');

    const handleServiceTypeChange = (type: serviceType) => {
        if(type !== selectedServiceType){
            setServiceType(type);
        }
      }
  return (
    <div>
            <h3 className="font-medium mb-3 px-1">Services Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => handleServiceTypeChange('Fuel')} 
                variant={selectedServiceType === 'Fuel' ? 'default': 'outline'} 
                className={`flex flex-col items-center justify-center h-24 w-full gap-2 p-2 cursor-pointer
                    ${selectedServiceType === "Fuel" ? 
                    "bg-[#383a49] text-white" : 
                    "bg-white text-black"}`}>
                <Fuel scale={10} name='fuel' className='h-40 w-40'  />
                <span className="text-xs font-medium">Fuel</span>
              </Button>
              <Button 
                onClick={() => handleServiceTypeChange('Maintenance')} 
                variant={selectedServiceType === 'Maintenance' ? 'default': 'outline'}
                className={`flex flex-col items-center justify-center h-24 w-full gap-2 p-2 cursor-pointer
                    ${selectedServiceType === "Maintenance" ? 
                    "bg-[#383a49] text-white" : 
                    "bg-white text-black"}`}>
                <Settings className="h-6 w-6" />
                <span className="text-xs font-medium">Maintenance</span>
              </Button>
              <Button 
                onClick={() => handleServiceTypeChange('CarWash')} 
                variant={selectedServiceType === 'CarWash' ? 'default': 'outline'}
                className={`flex flex-col items-center justify-center h-24 w-full gap-2 p-2 cursor-pointer
                    ${selectedServiceType === "CarWash" ? 
                    "bg-[#383a49] text-white" : 
                    "bg-white text-black"}`}>
                <CarTaxiFront className="h-6 w-6" />
                <span className="text-xs font-medium">CarWash</span>
              </Button>
              <Button 
                onClick={() => handleServiceTypeChange('Repair')} 
                variant={selectedServiceType === 'Repair' ? 'default': 'outline'}
                className={`flex flex-col items-center justify-center h-24 w-full gap-2 p-2 cursor-pointer
                    ${selectedServiceType === "Repair" ? 
                    "bg-[#383a49] text-white" : 
                    "bg-white text-black"}`}>
                <Wrench className="h-6 w-6" />
                <span className="text-xs font-medium">Repair</span>
              </Button>
              <Button 
                onClick={() => handleServiceTypeChange('Tyre')} 
                variant={selectedServiceType === 'Tyre' ? 'default': 'outline'}
                className={`flex flex-col items-center justify-center h-24 w-full gap-2 p-2 cursor-pointer
                    ${selectedServiceType === "Tyre" ? 
                    "bg-[#383a49] text-white" : 
                    "bg-white text-black"}`}>
                <LifeBuoy className="h-6 w-6" />
                <span className="text-xs font-medium">Tyre</span>
              </Button>
            </div>
          </div>
  )
}

export default ServiceTypeMenu