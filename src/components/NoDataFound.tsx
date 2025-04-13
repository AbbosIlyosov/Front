import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useAuthUser } from './AuthUserProvider';

const NoDataFound = ({ title, text }: { title: string, text: string }) => {
    const router = useRouter();
    const { authenticatedUser } = useAuthUser();

    return (
    <div className="flex flex-col items-center justify-start h-full w-full text-gray-500 py-10">
      <svg className="w-20 h-20 mb-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-6 4h6m-3-10v6m-6 4v-4m12 4v-4m-6-6v.01" />
      </svg>
      <h3 className='text-2xl font-bold text-red-300'>{title}</h3>
      <p className="text-xl">{text}</p>
      <div className='p-5 flex flex-col gap-2'>

      {authenticatedUser?.role.toLowerCase() === 'admin' && 
        <Button 
            onClick={() => router.push('/admin-panel')} 
            className='w-xs cursor-pointer'>
                Go to Admin Panel
        </Button>}

      {/* <Button variant={'outline'} onClick={() => router.back()} className='w-xs cursor-pointer' >Back to Previous Page</Button> */}
      
      </div>
    </div>);
}
export default NoDataFound