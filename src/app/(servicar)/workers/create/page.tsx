import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SelectList from '@/components/ui/select-list'
import React from 'react'

const CreateWorker = () => {
  return (
    <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative'>
      <div 
        className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
        style={{backgroundImage: "url('/backgrounds/PointAppointmentBackground.png')"}}
      >
      </div>
      
      <div className='w-sm flex flex-col gap-5 items-center'>
            <h2 className='font-bold text-2xl'>
                Add New Worker
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
                    />
                </div>

                {/* businessName input */}
                <div className='space-y-2'>
                    <Label htmlFor="Business">Business: </Label>
                    <SelectList label={'Business'} options={['business1', 'business2']} />
                </div>

                {/* Category input */}
                
                <Button className='w-full cursor-pointer'>
                    Add
                </Button>
            </form>
        </div>
    </main>
  )
}

export default CreateWorker