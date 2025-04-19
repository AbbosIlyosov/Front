'use client';

import { fetchBusinessesForSelectList } from '@/actions/servicar/business/fetchAllBusinesses'
import { createWorkerAccount } from '@/actions/servicar/user/addWorker';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SelectList from '@/components/ui/select-list'
import { BusinessSelectList } from '@/interfaces/Business';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const CreateWorker = () => {

  const [selectedBusiness, setSelectedBusiness] = useState<BusinessSelectList>();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);


  const router = useRouter();

  const { data: businesses, isLoading: businessLoading, error: businessError } = useQuery({
    queryKey: ['business-select-list'],
    queryFn: fetchBusinessesForSelectList
  });      
  
  useEffect(() => {
    if(businessError){
        Swal.fire({
            icon:'error',
            title:'Error while fetching businesses.',
            text: businessError.message,
            confirmButtonColor: '#383a49'
        });
    }
  }, [businessError])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const newErrors: string[] = [];


    if(!email){
      newErrors.push('Email is required.')
    }

    if(!selectedBusiness){
      newErrors.push('Business must be selected.')
    }

    if(newErrors.length > 0){
      setErrors(newErrors);
      setIsLoading(false);
    }
    else{
      createWorkerAccount({
        email: email,
        businessId: selectedBusiness?.id ?? 0
      }).then((res) => {
        if(res.success){
          Swal.fire({
            icon: 'success',
            timer: 2000,
            text: 'Worker added successfully.',
            showConfirmButton: false
          })
        }
      }).catch((err) => {
        console.log('error', err);
        Swal.fire({
          icon: 'error',
          text: err.message,
          confirmButtonColor: '#383a49'
        })
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }

  return (
    <main className='h-[calc(100vh-80px)] overflow-auto p-5 relative'>
      <div 
        className="fixed inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
        style={{backgroundImage: "url('/backgrounds/PointAppointmentBackground.png')"}}
      >
      </div>
      
      <div className='w-sm flex flex-col gap-5 items-center'>
            <h2 className='font-bold text-2xl'>
                Add New Worker
            </h2>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
              {errors.length > 0 && <div className='border-1 rounded-sm p-2 border-red-500 text-red-500'>
                {errors.map((error, index) => {
                  return (<span key={index}>
                    {index + 1}. {error.toString()}
                  </span>)
                })}
              </div>}

                {/* email input */}
                <div className='space-y-2'>
                    <Label className='grow-1' htmlFor="email">Email: </Label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className='px-4 py-2'
                    />
                </div>

                {/* businessName input */}
                <div className='space-y-2'>
                    <Label htmlFor="Business">Business: </Label>
                    <SelectList 
                        selectListLabel='Business' 
                        options={businesses ?? [{id:0, name: businessLoading ? 'Loading...' : 'Not Found!'}]} 
                        selected={selectedBusiness}
                        setSelected={setSelectedBusiness}
                        getOptionLabel={(item) => item.name}
                    />
                </div>

                {/* Category input */}
                
                <Button type='submit' className='w-full cursor-pointer'>
                    Submit
                </Button>
                <Button variant={'outline'} onClick={() => router.back()} className='w-full cursor-pointer'>
                  Back
                </Button>
            </form>
        </div>
    </main>
  )
}

export default CreateWorker