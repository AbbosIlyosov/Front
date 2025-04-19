'use client';

import { fetchMyAllAppointments } from '@/actions/servicar/appointment/fetchAppointment';
import { updateAppointmentStatus } from '@/actions/servicar/appointment/updateAppointment';
import { addReview } from '@/actions/servicar/review/addReview';
import { useAuthUser } from '@/components/AuthUserProvider';
import { DataTable } from '@/components/DataTable';
import ReviewForm from '@/components/ReviewForm';
import { Button } from '@/components/ui/button';
import { AppointmentStatus } from '@/enums/AppointmentStatus';
import { MyAppointment } from '@/interfaces/Appointment';
import { AddReviewPayload } from '@/interfaces/Review';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Appointments = () => {

  const queryClient = useQueryClient();

  const SwalWithContent = withReactContent(Swal);

  const { authenticatedUser } = useAuthUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['my-all-appointments'],
    queryFn: fetchMyAllAppointments
  })

  const updateStatus =  (apppointmentId: number, status: AppointmentStatus) => {
    updateAppointmentStatus(apppointmentId, status)
    .then((res) => {
      if(res.success){

        queryClient.invalidateQueries({ queryKey: ['my-all-appointments'] });

        Swal.fire({
          icon:'success',
          text:'Status Updated Successfully.',
          timer: 2000,
          showConfirmButton:false
        })}
    }).catch((err) => {
      Swal.fire({
        icon:'error',
        title:'Oops!',
        text: err.message,
        confirmButtonColor: '#383a49'
      })
    })
  }

  const createReview = async (payload: AddReviewPayload) => {

    console.log('payload',payload);

    setIsLoading(true);

    addReview(payload).then((res) => {

      if(res.success){
        Swal.close();
        Swal.fire({
          icon:'success',
          text:'Review added successfully.',
          timer: 2000,
          showConfirmButton:false
        })
      }
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text:err.message,
        confirmButtonColor:'#383a49'
      })
    }).finally(() => setIsLoading(false));
  }

  const handleAddReview = (pointId:number, appointmentId: number) => {
    SwalWithContent.fire({
      title:'Add Review',
      showConfirmButton:false,
      html: (
      <ReviewForm
        isLoading = {isLoading}
        appointmentId={appointmentId}
        pointId={pointId}
        onSubmit={createReview}
      />)
    })
  }

  const columns: ColumnDef<MyAppointment>[] = [
    {
      accessorKey: "appointmentTimeString",
      header: "Appointment Time",
    },
    {
      accessorKey: "point",
      header: "Point",
    },
    {
      accessorKey: "orderNumber",
      header: "Order Number",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({row}) => {
        const appt = row.original;
        return (
          <div className='flex gap-1'>
            {authenticatedUser?.role.toLowerCase() === 'worker' && 
            <>
              {appt.status.toLowerCase() === 'created' && 
              <Button
                onClick={() => updateStatus(appt.id, AppointmentStatus.Accepted)} 
                className='cursor-pointer'>
                  Accept
              </Button>}
              {appt.status.toLowerCase() === 'created' &&  <Button 
                variant={'destructive'}
                onClick={() => updateStatus(appt.id, AppointmentStatus.Rejected)}
                className='cursor-pointer'>
                  Reject
              </Button>}
              {appt.status.toLowerCase() === 'accepted' && 
              <Button 
                onClick={() => updateStatus(appt.id, AppointmentStatus.Completed)}
                className='cursor-pointer'>
                  Complete
              </Button>}
            </>}
            {appt.userId === authenticatedUser?.id && 
            <>
              {appt.status.toLowerCase() === 'created' && 
              <Button 
                variant={'secondary'} 
                onClick={() => updateStatus(appt.id, AppointmentStatus.Cancelled)} 
                className='cursor-pointer'>
                  Cancel
              </Button>}
              
              {appt.status.toLowerCase() === 'completed' && !appt.hasReview &&
              <Button 
                variant={'outline'}
                onClick={() => handleAddReview(appt.pointId, appt.id)} 
                className='cursor-pointer'>Review</Button>}
            </>}        
          </div>
        );
      }
    }
  ]

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-[30px]'>Appointments</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>)
}

export default Appointments