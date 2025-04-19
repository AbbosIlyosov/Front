'use client';

import { createAppointment } from '@/actions/servicar/appointment/createAppointment';
import { fetchMyAppointment } from '@/actions/servicar/appointment/fetchAppointment';
import CircularLoader from '@/components/CircularLoader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { getInitials } from '@/helpers/getInitials';
import { CreateAppointmentPayload, MyAppointment } from '@/interfaces/Appointment';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface PageProps {
  params: Promise<{ id: string }>;
}

// const holidays: Date[] = [
//   new Date(2025, 3, 10), // April is 0-based, so 3 = April
//   new Date(2025, 3, 15),
//   new Date(2025, 3, 20),
// ];

const PointPage: FC<PageProps> = ({ params }) => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 1)))
  const { id: pointId } =  use(params);

  const router = useRouter();
  const searchParams = useSearchParams()
  const pointName = searchParams.get('name')

  const { data: appointment, isLoading: isAppointmentLoading, error:fetchError } = useQuery({
    queryKey:['appointment', pointId, selectedDate],
    queryFn: () => fetchMyAppointment({pointId: Number(pointId), date: selectedDate})
  })

  const handleDateChange = (day: Date | undefined ) => {
    if(day){
      setSelectedDate(day);
    }
  }


  const handleCreateAppointment = () => {

    const payload : CreateAppointmentPayload  = {
      pointId: Number(pointId),
      appointmentTime: selectedDate
    }

    console.log('payload', payload);

    createAppointment(payload)
    .then((res) => {
      if(res.success){
        Swal.fire({
          icon:'success',
          text: 'Appointment Created Successfully.',
          showConfirmButton:false,
          timer: 2000
        });
      }
    })
    .catch((err) => {
      Swal.fire('Ooops!', err.message, 'error');
    })
  }

  useEffect(() => {
    if(!pointName){
      Swal.fire({
        icon:'error',
        text: 'You’ve landed on this page unexpectedly. Please go to the Points page and select a point to continue.',
        confirmButtonColor:'#383A49',
        allowOutsideClick: false,
        allowEscapeKey:false
      }).then((res) =>{
        if(res.isConfirmed){
          router.replace('/points');
        }
      });
    }
  }, [])

  useEffect(() => {
    if(fetchError){
      Swal.fire({
        icon:'error',
        title:'Error fetching appointment!',
        text: fetchError.message,
        confirmButtonColor:'#383A49'
      })
    }
  }, [fetchError])

  return (
    <main className='h-[calc(100vh-80px)] overflow-auto p-5 relative flex justify-between'>
      <div 
        className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
        style={{backgroundImage: "url('/backgrounds/PointAppointmentBackground.png')"}}
      >
      </div>
      
      {isAppointmentLoading && 
      <div className='absolute z-10 h-full w-full opacity-100 flex justify-center items-center'>
        <CircularLoader size={80} strokeWidth={10} label={`Fetching your appointment for ${selectedDate?.toDateString()}`} />
      </div>}

      {/* Left */}
     <div className='h-full flex flex-col gap-5 items-start justify-start p-10'>
      <h2 className=' font-bold text-3xl'>Appointment Calendar</h2>
      <span className='font-[Poppins] font-normal text-2xl'><b>Point:</b> {pointName}</span>

      {/* Calendar */}
      <div className='flex flex-col gap-5'>
      <Calendar
        mode="single"
        selected={selectedDate}
        disabled = {[
          // Disables today and all dates before
          {before: new Date(new Date().setDate(new Date().getDate() + 1))},

          // ...holidays,
          // (date) => {
          //   const day = date.getDay(); // 0 = Sunday, 6 = Saturday
          //   return day === 0 || day === 6; // Disable weekends
          // }
        ]}
        onSelect={(e:Date | undefined) =>  {handleDateChange(e)}}
        className="rounded-md border bg-gray-100"
      />

      {/* Button */}
      {/* <Button className='cursor-pointer'>
        Get Order
      </Button> */}

      <Button onClick={handleCreateAppointment} className='cursor-pointer' disabled={isAppointmentLoading || !(selectedDate && !appointment)}>
        Create Appointment
      </Button>
      <Button onClick={() => router.push('/appointments')} className='cursor-pointer' disabled= {isAppointmentLoading}>
        View All Appointments
      </Button>
      </div>
     </div>

     {/* Right */}
     <div className={`h-full flex justify-end ${appointment ? 'items-start' : 'items-end'} p-10`}>
      {appointment ? <AppointmentCard appointment={appointment}/> : <AppointmentCreationNote/>}
     </div>

    </main>
  );
};

interface AppointmentCardProps {
  appointment: MyAppointment
}

const AppointmentCard:FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className='w-[580px] p-10 gap-5 bg-[#383A49] opacity-95 text-white rounded-2xl flex flex-col justify-center'>
      <div className='flex gap-5 items-center'>
        {/* Avatar */}
        <Avatar className='h-[90px] w-[90px] text-[40px]'>
          <AvatarImage src={appointment.avatar} />
          <AvatarFallback className='text-black'>{getInitials(appointment.firstName, appointment.lastName)}</AvatarFallback>
        </Avatar>

        <h3 className='h-full font-bold text-4xl tracking-wide'>
          {`${appointment.firstName ?? ''} ${appointment.lastName ?? ''}`}
        </h3>

      </div>
      <div className='font-[Poppins] text-[20px] flex gap-5 justify-start w-full'>
        <b>Appointment Time:</b>
        <span>{new Date(appointment.appointmentTime)?.toDateString()}</span>
      </div>
      <div className='font-[Poppins] text-[20px] flex gap-5 justify-start w-full'>
        <b>Service :</b>
        <span>{appointment.serviceType ?? 'N/A'}</span>
      </div>
      <div className='font-[Poppins] text-[20px] flex gap-5 justify-start w-full'>
        <b>Order :</b>
        <span>{appointment.orderNumber ?? 'N/A'}</span>
      </div>
      <div className='font-[Poppins] text-[20px] flex gap-5 justify-start w-full'>
        <b>Address :</b>
        <span>{appointment.address ?? 'N/A'}</span>
      </div>
      <div className='font-[Poppins] text-[20px] flex gap-5 justify-start w-full'>
        <b>Point :</b>
        <span>{appointment.point ?? 'N/A'}</span>
      </div>
      <div className='font-[Poppins] text-[20px] flex gap-5 justify-start w-full'>
        <b>Status :</b>
        <span>{appointment.status ?? 'N/A'}</span>
      </div>
    </div>)
}

const AppointmentCreationNote = () => {
  return (
  <div className='w-[580px] h-[188px] p-10 gap-10 bg-[#383A49] opacity-95 text-white rounded-2xl flex justify-center items-center'>
    <p className='font-[Poppins] text-[30px] text-center'>Note* Appointment can be created only for one car by one user account.</p>
  </div>)
}


export default PointPage;
