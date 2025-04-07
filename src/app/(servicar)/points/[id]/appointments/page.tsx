'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FC, useState } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const holidays: Date[] = [
  new Date(2025, 3, 10), // April is 0-based, so 3 = April
  new Date(2025, 3, 15),
  new Date(2025, 3, 20),
];

const PointPage: FC<PageProps> = ({ params }) => {

  const [date, setDate] = useState<Date>()

  const handleDateChange = (day: Date | undefined ) => {
    console.log(day);
    if(day){
      setDate(day);
    }
  }

  return (
    <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative flex justify-center items-center'>
      <div 
        className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
        style={{backgroundImage: "url('/backgrounds/PointAppointmentBackground.png')"}}
      >
      </div>

      {/* Left */}
     <div className='w-full h-full p-10 grow-1 flex flex-col gap-10 items-start justify-start'>
      <h2 className='font-bold text-3xl'>Appointment Calendar</h2>
      <span>Point: Test Point Name</span>

      {/* Calendar */}
      <div>
      <Calendar
        mode="single"
        selected={date}
        disabled = {[
          {before: new Date()},
          ...holidays,
          (date) => {
            const day = date.getDay(); // 0 = Sunday, 6 = Saturday
            return day === 0 || day === 6; // Disable weekends
          }
        ]}
        onSelect={(e:Date | undefined) =>  {handleDateChange(e)}}
        className="rounded-md border bg-gray-100"
      />

      {/* Button */}
      <Button className='w-full mt-10 cursor-pointer'>
        Get Order
      </Button>
      </div>
     </div>
    </main>
  );
};

export default PointPage;
