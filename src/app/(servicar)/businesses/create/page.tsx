
'use client';

import { FileUploader } from '@/components/FileUploader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SelectList from '@/components/ui/select-list'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

const CreateBusiness = () => {
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
            <form action="" method="post" className='w-full flex flex-col gap-3'>
                {/* email input */}
                <div className='space-y-2'>
                    <Label className='grow-1' htmlFor="email">Email: </Label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        // value={email}
                        // // onChange={(e) => setEmail(e.target.value)}
                        // required
                        // disabled={isLoading}
                        className='px-4 py-2'
                        required
                    />
                </div>

                {/* businessName input */}
                <div className='space-y-2'>
                    <Label htmlFor="businessName">Business Name: </Label>
                    <Input 
                        id="businessName"
                        type="text"
                        placeholder="your business name"
                        // value={email}
                        // // onChange={(e) => setEmail(e.target.value)}
                        // required
                        // disabled={isLoading}
                        className='px-4 py-2'
                        required
                    />
                </div>


                {/* Category input */}
                 <div className='space-y-2'>
                    <Label htmlFor="categories">Categories: </Label>
                    <SelectList label='Categories' options={['Fuel', 'Maintenance', 'CarWash', "Repair", 'Tyre']} />
                </div>

                {/* AboutUs input */}
                <div className='space-y-2'>
                    <Label htmlFor="aboutUs">About Us: </Label>
                    <Textarea placeholder='Write about yuour business...' />
                </div>

                {/* Logo input */}
                <div className='space-y-2'>
                    <Label htmlFor="logo">Logo: </Label>
                    {selectedFile ? (
                        <p className="text-sm text-muted-foreground">
                            Selected File: {selectedFile.name}
                        </p>): <FileUploader 
                        label="Upload business logo:"
                        accept=".png,.jpg,.jpeg"
                        onFileSelect={setSelectedFile}
                    />}
                </div>
                
                <Button className='w-full cursor-pointer'>
                    Add
                </Button>
            </form>
        </div>
    </main>
  )
}

export default CreateBusiness