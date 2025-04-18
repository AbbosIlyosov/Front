interface BusinessInfo {
    busineessName: string;
    businessLogo: string[] | null;
  }
  
  export const businesses: BusinessInfo[] = [
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

  interface Point {
    id:number,
    pointName:string,
    opensAt: string,
    closesAt: string,
    image: string,
    rating:number,
  }
  
  export const points: Point[] = [
    {
      id: 1,
      pointName: 'AutoFix Service Center',
      opensAt: '08:00',
      closesAt: '20:00',
      image: 'https://via.placeholder.com/150?text=AutoFix+Service',
      rating: 5,
    },
    {
      id: 2,
      pointName: 'QuickLube Express',
      opensAt: '07:30',
      closesAt: '19:30',
      image: 'https://via.placeholder.com/150?text=QuickLube+Express',
      rating: 4,
    },
    {
      id: 3,
      pointName: 'EngineMasters Garage',
      opensAt: '09:00',
      closesAt: '18:00',
      image: 'https://via.placeholder.com/150?text=EngineMasters+Garage',
      rating: 1,
    },
    {
      id: 4,
      pointName: 'Speedy Tires',
      opensAt: '08:00',
      closesAt: '21:00',
      image: 'https://via.placeholder.com/150?text=Speedy+Tires',
      rating: 5,
    },
    {
      id: 5,
      pointName: 'DriveSafe Car Care',
      opensAt: '10:00',
      closesAt: '22:00',
      image: 'https://via.placeholder.com/150?text=DriveSafe+Car+Care',
      rating: 3,
    },
    {
      id: 6,
      pointName: 'Revved Up Auto Service',
      opensAt: '06:30',
      closesAt: '18:30',
      image: 'https://via.placeholder.com/150?text=Revved+Up+Auto',
      rating: 4,
    },
    {
      id: 7,
      pointName: 'Precision Auto Repairs',
      opensAt: '07:00',
      closesAt: '19:00',
      image: 'https://via.placeholder.com/150?text=Precision+Auto',
      rating: 5,
    },
    {
      id: 8,
      pointName: 'TurboTech Mechanics',
      opensAt: '09:00',
      closesAt: '20:00',
      image: 'https://via.placeholder.com/150?text=TurboTech+Mechanics',
      rating: 4,
    },
    {
      id: 9,
      pointName: 'PitStop Service Hub',
      opensAt: '10:00',
      closesAt: '22:00',
      image: 'https://via.placeholder.com/150?text=PitStop+Service',
      rating: 3,
    },
    {
      id: 10,
      pointName: 'CarCare Professionals',
      opensAt: '08:00',
      closesAt: '19:00',
      image: 'https://via.placeholder.com/150?text=CarCare+Professionals',
      rating: 5,
    },
    {
      id: 11,
      pointName: 'WheelsPlus Auto Service',
      opensAt: '09:00',
      closesAt: '20:00',
      image: 'https://via.placeholder.com/150?text=WheelsPlus+Auto',
      rating: 4,
    },
    {
      id: 12,
      pointName: 'AllTune Car Service',
      opensAt: '08:30',
      closesAt: '18:30',
      image: 'https://via.placeholder.com/150?text=AllTune+Car+Service',
      rating: 1,
    },
    {
      id: 13,
      pointName: 'LubeMasters Express',
      opensAt: '07:30',
      closesAt: '20:30',
      image: 'https://via.placeholder.com/150?text=LubeMasters+Express',
      rating: 5,
    },
    {
      id: 14,
      pointName: 'AutoCare Specialists',
      opensAt: '08:00',
      closesAt: '22:00',
      image: 'https://via.placeholder.com/150?text=AutoCare+Specialists',
      rating: 3,
    },
    {
      id: 15,
      pointName: 'SpeedLine Car Service',
      opensAt: '06:00',
      closesAt: '19:00',
      image: 'https://via.placeholder.com/150?text=SpeedLine+Car+Service',
      rating: 4,
    },
    {
      id: 16,
      pointName: 'Elite Auto Shop',
      opensAt: '08:00',
      closesAt: '20:00',
      image: 'https://via.placeholder.com/150?text=Elite+Auto+Shop',
      rating: 5,
    },
    {
      id: 17,
      pointName: 'PerfectTune Auto Center',
      opensAt: '09:30',
      closesAt: '21:00',
      image: 'https://via.placeholder.com/150?text=PerfectTune+Auto+Center',
      rating: 4,
    },
    {
      id: 18,
      pointName: 'TopGear Car Service',
      opensAt: '10:00',
      closesAt: '22:00',
      image: 'https://via.placeholder.com/150?text=TopGear+Car+Service',
      rating: 5,
    },
    {
      id: 19,
      pointName: 'The Auto Doctor',
      opensAt: '07:30',
      closesAt: '20:30',
      image: 'https://via.placeholder.com/150?text=The+Auto+Doctor',
      rating: 4,
    },
    {
      id: 20,
      pointName: 'CarFix Garage',
      opensAt: '08:00',
      closesAt: '18:00',
      image: 'https://via.placeholder.com/150?text=CarFix+Garage',
      rating: 2,
    },
    {
      id: 21,
      pointName: 'GarageWorks Auto Repair',
      opensAt: '09:00',
      closesAt: '20:00',
      image: 'https://via.placeholder.com/150?text=GarageWorks+Auto',
      rating: 5,
    },
    // {
    //   pointName: 'MasterMechanics',
    //   opensAt: '06:30',
    //   closesAt: '18:30',
    //   image: 'https://via.placeholder.com/150?text=MasterMechanics',
    //   rating: 4,
    // },
    // {
    //   pointName: 'TireTech Service Center',
    //   opensAt: '08:00',
    //   closesAt: '19:00',
    //   image: 'https://via.placeholder.com/150?text=TireTech+Service',
    //   rating: 5,
    // },
    // {
    //   pointName: 'QuickFix Auto Care',
    //   opensAt: '10:00',
    //   closesAt: '22:00',
    //   image: 'https://via.placeholder.com/150?text=QuickFix+Auto+Care',
    //   rating: 4,
    // },
    // {
    //   pointName: 'Precision Car Service',
    //   opensAt: '09:30',
    //   closesAt: '20:30',
    //   image: 'https://via.placeholder.com/150?text=Precision+Car+Service',
    //   rating: 1,
    // },
  ];