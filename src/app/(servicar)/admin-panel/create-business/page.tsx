
'use client';

import { createBusiness } from '@/actions/servicar/business/createBusiness';
import { fetchCategoriesAction } from '@/actions/servicar/category/fetchCategories';
import { FileUploader } from '@/components/FileUploader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SelectList from '@/components/ui/select-list'
import { Textarea } from '@/components/ui/textarea'
import { Category } from '@/interfaces/Category';
import { CreateBusinessPayload } from '@/interfaces/CreateBusinessPayload';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const CreateBusiness = () => {
    
    // add email, name, categories, aboutUs, image
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [aboutUs, setAboutUs] = useState<string>('');
    const [image, setImage] = useState<string>(''); // byte[] 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [error, setError] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const { data: categories, isLoading: categoryLoading, error: categoryError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategoriesAction
    });      
    
    useEffect(() => {
        if(categoryError){
            Swal.fire({
                icon:'error',
                title:'Error while fetching categories.',
                text: categoryError.message,
            });
        }
    }, [categoryError])

    useEffect(() => {
        if(selectedFile){
            resizeImageToBase64PNG(selectedFile, 600, 600)
            .then((base64String) => {
                setImage(base64String);
            })
            .catch((err) => {
                Swal.fire({
                    icon:'error',
                    text: 'An unknown error occured. Please try again.',
                    confirmButtonColor:'#383a49'
                })
            });
        }
    }, [selectedFile])
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError([]);

        // Form Validation
        if (!email || !name || selectedCategories.length === 0 || !aboutUs) {
            const newErrors: string[] = [];

            if(!email){
                newErrors.push('Email is required.');
            }

            if(!name){
                newErrors.push('Business Name is required.');
            }

            if(selectedCategories.length === 0){
                newErrors.push('At least one category is required.')
            }

            if(!aboutUs){
                newErrors.push('Abous Us field is required.');
            }

            if(!image){
                newErrors.push('Business Logo is required.')
            }

            setError(newErrors);
            setIsLoading(false);
            return;
        }

        
        try {
            // Construct the payload
            const payload:CreateBusinessPayload = {
                email,
                name,
                categories: selectedCategories,
                aboutUs,
                image: image
            };
            
            console.log('payload', payload);

            const { success, errorMessage } = await createBusiness(payload);

            if (success) {

                Swal.fire({
                    text: "Business created successfully.",
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
        setEmail('');
        setName('');
        setSelectedCategories([]);
        setAboutUs('');
        setImage(null);
        setSelectedFile(null);
    }
    
    const resizeImageToBase64PNG = (
        file: File,
        maxWidth = 400,
        maxHeight = 400
      ): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
      
          reader.onload = (e) => {
            if (!e.target?.result) return reject("Failed to read file");
            img.src = e.target.result as string;
          };
      
          img.onload = () => {
            let width = img.width;
            let height = img.height;
      
            if (width > maxWidth || height > maxHeight) {
              const aspectRatio = width / height;
              if (width > height) {
                width = maxWidth;
                height = Math.round(maxWidth / aspectRatio);
              } else {
                height = maxHeight;
                width = Math.round(maxHeight * aspectRatio);
              }
            }
      
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
      
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject("Canvas context not found");
      
            ctx.drawImage(img, 0, 0, width, height);
      
            // Convert canvas to PNG Base64 string
            const base64String = canvas.toDataURL("image/png"); // PNG format, no quality param
            const base64WithoutPrefix = base64String.split(",")[1];
      
            resolve(base64WithoutPrefix);
          };
      
          reader.readAsDataURL(file);
        });
      };
      

  return (
    <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative'>
        <div 
            className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
            style={{backgroundImage: "url('/backgrounds/PointAppointmentBackground.png')"}}
        >

        </div>
        
        <div className='w-sm flex flex-col gap-5 items-center'>
            <h2 className='font-bold text-2xl'>
                Add New Business
            </h2>
            <form onSubmit={handleSubmit} method="post" className='w-full flex flex-col gap-3'>
                {error.length > 0 && <span className='text-red-600 border-1 border-red-500 px-3 py-3'>
                    {error.map((err, index) => (<p key={index}>{index + 1}. {err}</p>))}
                </span>}
                {/* email input */}
                <div className='space-y-2'>
                    <Label className='grow-1' htmlFor="email">Email: </Label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className='px-4 py-2'
                        required
                    />
                </div>

                {/* businessName input */}
                <div className='space-y-2'>
                    <Label htmlFor="name">Business Name: </Label>
                    <Input 
                        id="name"
                        type="text"
                        placeholder="your business name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        className='px-4 py-2'
                        required
                    />
                </div>


                {/* Category input */}
                 <div className='space-y-2'>
                    <Label htmlFor="categories">Categories: </Label>
                    <SelectList 
                        selectListLabel='Categories' 
                        options={categories ?? [{id: 0, name: categoryLoading ? 'Loading...' : 'Categories not found!'}]} 
                        selected={selectedCategories[0]}
                        setSelected={() => setSelectedCategories(categories ?? [])}
                        getOptionLabel={(item) => item.name}
                    />
                </div>

                {/* AboutUs input */}
                <div className='space-y-2'>
                    <Label htmlFor="aboutUs">About Us: </Label>
                    <Textarea 
                        id='aboutUs' 
                        placeholder='Write about yuour business...' 
                        value={aboutUs}
                        onChange={(e) =>  setAboutUs(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>

                {/* Logo input */}
                <div className='space-y-2'>
                    <Label htmlFor="logo">Logo: </Label>
                    {selectedFile ? (
                        <div className="text-sm text-muted-foreground bg-gray-200 p-2 flex justify-between">
                            <span className='text-lg font-semibold'>{selectedFile.name}</span>
                            <X onClick={() => setSelectedFile(null)} color='red' className='hover:bg-gray-400 cursor-pointer' />
                        </div>): 
                        <FileUploader 
                            label="Upload business logo:"
                            accept=".png,.jpg,.jpeg"
                            onFileSelect={setSelectedFile}
                        />
                    }
                </div>
                
                <Button className='w-full cursor-pointer bg-[#383a49]'>
                    {isLoading ? 'Submitting...': 'Submit'}
                </Button>
            </form>
        </div>
    </main>
  )
}

export default CreateBusiness