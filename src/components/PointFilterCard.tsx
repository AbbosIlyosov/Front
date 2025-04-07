import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import ServiceTypeMenu from './ServiceTypeMenu'
import SelectList from './ui/select-list'
import { Button } from './ui/button'

const uzbekistanCities = [
    "Tashkent",
    "Samarkand",
    "Bukhara",
    "Namangan",
    "Andijan",
    "Fergana",
    "Nukus",
    "Khiva",
    "Termez",
    "Kokand",
    "Jizzakh",
    "Gulistan",
    "Navoi",
    "Urganch",
    "Qarshi",
    "Margilan",
    "Angren",
    "Chirchiq",
    "Shahrisabz",
    "Zarafshon"
  ];

const PointFilterCard = () => {
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
        <SelectList label='City' options={uzbekistanCities} />

        {/* Filter Button */}
        <div className="flex justify-end">
            <Button className="mt-4 cursor-pointer">Filter</Button>
          </div>

      </div>
  )
}

export default PointFilterCard