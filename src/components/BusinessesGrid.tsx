import React from 'react'
import BusinessCard from './BusinessCard';
import { Button } from './ui/button';

interface BusinessInfo {
    busineessName: string;
    businessLogo: string[] | null;
  }
  
  const businesses: BusinessInfo[] = [
    {
      busineessName: 'Rapid Auto Care',
      businessLogo: ['https://example.com/logos/rapid-auto-care.png']
    },
    {
      busineessName: 'Precision Garage',
      businessLogo: ['https://example.com/logos/precision-garage.png']
    },
    {
      busineessName: 'SpeedyFix Motors',
      businessLogo: ['https://example.com/logos/speedyfix-motors.png']
    },
    {
      busineessName: 'ProWrench Auto Services',
      businessLogo: null
    },
    {
      busineessName: 'Elite Engine Experts',
      businessLogo: ['https://example.com/logos/elite-engine.png']
    },
    {
      busineessName: 'DriveWell Car Clinic',
      businessLogo: ['https://example.com/logos/drivewell.png']
    },
    {
      busineessName: 'Citywide Auto Repair',
      businessLogo: null
    },
    {
      busineessName: 'Autotune Express',
      businessLogo: ['https://example.com/logos/autotune-express.png']
    },
    {
      busineessName: 'GearHeads Garage',
      businessLogo: ['https://example.com/logos/gearheads.png']
    },
    {
      busineessName: 'MileMaster Mechanics',
      businessLogo: ['https://example.com/logos/milemaster.png']
    },
    {
        busineessName: 'Rapid Auto Care',
        businessLogo: ['https://example.com/logos/rapid-auto-care.png']
      },
      {
        busineessName: 'Precision Garage',
        businessLogo: ['https://example.com/logos/precision-garage.png']
      },
      {
        busineessName: 'SpeedyFix Motors',
        businessLogo: ['https://example.com/logos/speedyfix-motors.png']
      },
      {
        busineessName: 'ProWrench Auto Services',
        businessLogo: null
      },
      {
        busineessName: 'Elite Engine Experts',
        businessLogo: ['https://example.com/logos/elite-engine.png']
      },
      {
        busineessName: 'DriveWell Car Clinic',
        businessLogo: ['https://example.com/logos/drivewell.png']
      },
      {
        busineessName: 'Citywide Auto Repair',
        businessLogo: null
      },
      {
        busineessName: 'Autotune Express',
        businessLogo: ['https://example.com/logos/autotune-express.png']
      },
      {
        busineessName: 'GearHeads Garage',
        businessLogo: ['https://example.com/logos/gearheads.png']
      },
      {
        busineessName: 'MileMaster Mechanics',
        businessLogo: ['https://example.com/logos/milemaster.png']
      },
      {
        busineessName: 'Rapid Auto Care',
        businessLogo: ['https://example.com/logos/rapid-auto-care.png']
      },
      {
        busineessName: 'Precision Garage',
        businessLogo: ['https://example.com/logos/precision-garage.png']
      },
      {
        busineessName: 'SpeedyFix Motors',
        businessLogo: ['https://example.com/logos/speedyfix-motors.png']
      },
      {
        busineessName: 'ProWrench Auto Services',
        businessLogo: null
      },
      {
        busineessName: 'Elite Engine Experts',
        businessLogo: ['https://example.com/logos/elite-engine.png']
      },
      {
        busineessName: 'DriveWell Car Clinic',
        businessLogo: ['https://example.com/logos/drivewell.png']
      },
      {
        busineessName: 'Citywide Auto Repair',
        businessLogo: null
      },
      {
        busineessName: 'Autotune Express',
        businessLogo: ['https://example.com/logos/autotune-express.png']
      },
      {
        busineessName: 'GearHeads Garage',
        businessLogo: ['https://example.com/logos/gearheads.png']
      },
      {
        busineessName: 'MileMaster Mechanics',
        businessLogo: ['https://example.com/logos/milemaster.png']
      }
  ];
  

const BusinessesGrid = () => {
  return (
    <div className='h-full w-full p-5 overflow-auto flex gap-5 flex-col items-center'>
      <div className='w-full flex gap-5 justify-center flex-wrap p-5'>
        {businesses.map((business, index) => 
            <BusinessCard key={index} busineessName={business.busineessName}  businessLogo={business.businessLogo}/>
        )}
      </div>
      <Button size={'lg'} className='cursor-pointer'>
        Load More
      </Button>
    </div>
  )
}

export default BusinessesGrid