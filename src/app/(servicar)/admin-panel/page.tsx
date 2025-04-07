'use client';

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminPanel = () => {
    const router = useRouter();

  return (
    <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative'>
        <div 
            className="absolute top-0 right-0 inset-0 bg-center bg-no-repeat -z-10 before:content-[''] before:absolute before:inset-0 before:backdrop-blur-none"
            style={{backgroundImage: "url('/backgrounds/AdminPanelBackground.png')"}}
          >
        </div>

        <div className='w-sm flex flex-col gap-5 items-center'>
            <h2 className='font-bold text-2xl'>
                Admin Panel
            </h2>
            <Button onClick={() => router.push('/workers/create')} className='w-full cursor-pointer'>
                Add Worker
            </Button>
            <Button onClick={() => router.push('/businesses/create')} className='w-full cursor-pointer'>
                Add Business
            </Button>
        </div>
    </main>
  )
}

export default AdminPanel