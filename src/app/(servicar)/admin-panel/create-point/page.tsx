
'use client';

import { fetchBusinessesForSelectList } from '@/actions/servicar/business/fetchAllBusinesses';
import { fetchCategoriesAction } from '@/actions/servicar/category/fetchCategories';
import { fetchLocations } from '@/actions/servicar/location/fetchLocations';
import { createPointAction } from '@/actions/servicar/point/createPoint';
import { fetchWorkingTimes } from '@/actions/servicar/working-time/fetchWorkingTime';
import MultiSelectList from '@/components/multi-select-list';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SelectList from '@/components/ui/select-list';
import { BusinessSelectList } from '@/interfaces/Business';
import { Category } from '@/interfaces/Category';
import { CreatePointPayload } from '@/interfaces/CreatePointPayload';
import { Location } from '@/interfaces/Location';
import { WorkingTime } from '@/interfaces/WorkingTime';
import { useQuery } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const CreatePoint = () => {
    
    const [pointName, setPointName] = useState<string>('');
    const [selectedWorkingTime, setSelectedWorkingTime] = useState<WorkingTime>();
    const [selectedLocation, setSelectedLocation] = useState<Location>();
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessSelectList>();
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [error, setError] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const router = useRouter();

    const { data: categories, isLoading: categoryLoading, error: categoryError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategoriesAction
    });   
    
    const { data: businesses, isLoading: businessLoading, error: businessError } = useQuery({
        queryKey: ['business-select-list'],
        queryFn: fetchBusinessesForSelectList
    });

    const { data: locations, isLoading: locationLoading, error: locationError } = useQuery({
        queryKey: ['locations'],
        queryFn: fetchLocations
    });

    const { data: workingTimes, isLoading: workingTimeLoading, error: workingTimeError } = useQuery({
        queryKey: ['working-time'],
        queryFn: fetchWorkingTimes
    });
    
    
    useEffect(() => {
        if(categoryError){
            Swal.fire({
                icon:'error',
                title:'Error while fetching categories.',
                text: categoryError.message,
            });
        }else if(locationError){
            Swal.fire({
                icon:'error',
                title:'Error while fetching location.',
                text: locationError.message,
            });
        }else if(workingTimeError){
            Swal.fire({
                icon:'error',
                title:'Error while fetching working time.',
                text: workingTimeError.message,
            });
        }else if(businessError){
            Swal.fire({
                icon:'error',
                title:'Error while fetching businesses.',
                text: businessError.message,
            });
        }
    }, [categoryError, locationError, workingTimeError, businessError])
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError([]);

        // Form Validation
        if (!pointName || !selectedBusiness ||  !selectedWorkingTime || !selectedLocation || selectedCategories.length === 0) {
            const newErrors: string[] = [];

            if(!pointName){
                newErrors.push('Point Name is required.');
            }

            if(!selectedWorkingTime){
                newErrors.push('Working time must be selected.');
            }

            if(!selectedLocation){
                newErrors.push('Location must be selected.');
            }

            if(!selectedBusiness){
                newErrors.push('Business must be selected.');
            }

            if(selectedCategories.length === 0){
                newErrors.push('At least one category is required.')
            }

            setError(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // Construct the payload
            const payload: CreatePointPayload = {
                pointName: pointName,
                workingTimeId: selectedWorkingTime.id,
                locationId: selectedLocation.id,
                businessId: selectedBusiness.id,
                categories: selectedCategories.flatMap((item) => item.id)
            };
  
            
            console.log('payload', payload);

            const { success, errorMessage } = await createPointAction(payload);

            if (success) {

                Swal.fire({
                    text: "Point added successfully.",
                    icon: "success",
                    confirmButtonText:'Create Another',
                    confirmButtonColor:'#383a49',
                    cancelButtonText:'Back to Admin Panel',
                    cancelButtonColor:'#ed6c02',
                    showCancelButton: true,
                }).then((res) => {
                    if(res.isDismissed){
                        redirect('/admin-panel')
                    }
                });

                resetFormFields();

            } else {
            setError([errorMessage ?? "Oops! An unknown error occurred."]);
            }
        } catch (err) {
            setError([err instanceof Error ? err.message : "An error occurred during registration"]);
        } finally {
            setIsLoading(false);
        }
    };

    const resetFormFields = () => {
        setPointName('');
        setSelectedCategories([]);
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
                Add New Point
            </h2>
            <form onSubmit={handleSubmit} method="post" className='w-full flex flex-col gap-3'>
                {error.length > 0 && <span className='text-red-600 border-1 border-red-500 px-3 py-3'>
                    {error.map((err, index) => (<p key={index}>{index + 1}. {err}</p>))}
                </span>}

                {/* Point Name input */}
                <div className='space-y-2'>
                    <Label className='grow-1' htmlFor="pointName">Point Name: </Label>
                    <Input 
                        id="pointName"
                        type="text"
                        placeholder="Enter point name"
                        value={pointName}
                        onChange={(e) => setPointName(e.target.value)}
                        disabled={isLoading}
                        className='px-4 py-2'
                        required
                    />
                </div>

                {/* Workingtime input */}
                <div className='space-y-2'>
                    <Label htmlFor="workingTime">Working Time: </Label>
                    <SelectList 
                        selectListLabel='Working Time' 
                        options={workingTimes ?? [{id: 0, name: workingTimeLoading ? 'Loading...' : 'No Options'}]} 
                        selected={selectedWorkingTime}
                        setSelected={setSelectedWorkingTime}
                        getOptionLabel={(item) => `${item.name} (${item.startTime} | ${item.endTime})`}
                    />
                </div>

                {/* Location input */}
                <div className='space-y-2'>
                    <Label htmlFor="location">Location: </Label>
                    <SelectList 
                        selectListLabel='City' 
                        options={locations ?? [{id: 0, city: locationLoading ? 'Loading...' : 'No Options'}]} 
                        selected={selectedLocation}
                        setSelected={setSelectedLocation}
                        getOptionLabel={(item) => item.city}
                    />
                </div>

                {/* Business input */}
                <div className='space-y-2'>
                    <Label htmlFor="business">Business: </Label>
                    <SelectList 
                        selectListLabel='Business' 
                        options={businesses ?? [{id: 0, name: businessLoading ? 'Loading...' : 'No Options'}]} 
                        selected={selectedBusiness}
                        setSelected={setSelectedBusiness}
                        getOptionLabel={(item) => item.name}
                    />
                </div>

               {/* Category input */}
               <div className='space-y-2'>
                <Label htmlFor="categories">Categories: </Label>
                <MultiSelectList 
                    selectListLabel="Categories"
                    options={categories ?? [{id: 0 , name: categoryLoading ? 'Loading...' : 'No Options'}]}
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    getOptionLabel={(item) => item.name}
                />
                </div>
                
                <Button type='submit' className='w-full cursor-pointer bg-[#383a49]' disabled={isLoading}>
                    {isLoading ? 'Submitting...': 'Submit'}
                </Button>
                <Button variant={'outline'} onClick={() => router.back()} className='w-full cursor-pointer' disabled ={isLoading}>
                    Back
                </Button>
            </form>
        </div>
    </main>
  )
}

export default CreatePoint