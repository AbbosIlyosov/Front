'use client';

import { fetchAllReviews } from '@/actions/servicar/review/fetchReview'
import { DataTable } from '@/components/DataTable'
import { Review } from '@/interfaces/Review'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

const Reviews = () => {

  const {data} = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchAllReviews
  })

  const columns: ColumnDef<Review>[] = [
    {
      accessorKey: "appointmentId",
      header: "Appointment Id",
    },
    {
      accessorKey: "user",
      header: "User",
    },
    {
      accessorKey: "point",
      header: "Point",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "comment",
      header: "Comment",
    }
  ]

  return  (
      <div className='flex flex-col gap-5'>
        <h1 className='font-bold text-[30px]'>Appointments</h1>
        <DataTable columns={columns} data={data ?? []} />
      </div>)
}

export default Reviews