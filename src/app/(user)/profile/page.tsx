'use client';

import { Button } from '@/components/ui/button';
import React, { FC, useEffect, useState } from 'react'

type EditProfileProps = {
    showEditForm : (value: boolean) => void
}

const EditProfileForm:FC<EditProfileProps> = ({ showEditForm }) => {
  return (
    <div>
        <span>Change Profile Info</span>
        <Button
            onClick={() => showEditForm(false)} 
            variant={'outline'} 
            className='cursor-pointer'
        >
            Back
        </Button>
        <Button className='cursor-pointer'>
            Save
        </Button>
    </div>
  )
}


type ChangePasswordFormProps = {
    showPasswordChangeForm : (value: boolean) => void
}

const ChangePasswordForm:FC<ChangePasswordFormProps> = ({showPasswordChangeForm}) => {
  return (
    <div>
    <span>Change Password</span>
    <Button
        onClick={() => showPasswordChangeForm(false)} 
        variant={'outline'} 
        className='cursor-pointer'
    >
        Back
    </Button>
    <Button className='cursor-pointer'>
        Save
    </Button>
</div>
  )
}

type ProfileInfoProps = {
    changeInfo: () =>  void,
    changePassword: () => void,
    switchToWorkerAccount: () => void
}

export const ProfileInfoCard:FC<ProfileInfoProps> = ({changeInfo, changePassword, switchToWorkerAccount}) => {
    const avatar = null;

    const getInitials = (name: string): string => {
        return name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase();
    };

  return (
    <div className='border-2 border-black rounded-2xl min-h-4/5 w-xl px-10 py-5 flex flex-col gap-5'>
            {/* Heading */}
            <div className='flex gap-5 items-center'>
                {/* Avatar */}
                <div
                    className='h-[90px] w-[90px] rounded-[50%] bg-[#383a49] flex justify-center items-center text-[50px] text-white'
                >
                    {avatar ? '' : getInitials("Jan Doe")}
                </div>

                {/* Name and Registered Date */}
                <div>
                    <h2 className='text-[30px] font-[700]'>Jane Doe</h2>
                    <span className=''>Registered: 29.01.25</span>
                </div>
            </div>

            {/* Personal Info */}
            <div>
                <h3 className='text-[22px] font-[600] mb-1'>Personal Info</h3>
                <p><b>Phone number :</b> +998 (90) 123-45-67</p>
                <p><b>Email :</b> jdoe@abc.com</p>
            </div>

            {/* About Me */}
            <div>
                <h3 className='text-[22px] font-[600] mb-1'>About Me</h3>
                <p className='text-justify'>
                I&apos;m a highly rated auction seller with over 10 years of experience. I specialize in auctioning gadgets, watches and antiques. I’m known for my professionalism, honesty, and transparency. Maftuna is a great choice for anyone who is looking to sell their items at auction. They have a proven track record of success and they offer a wide range of services to their clients.
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-5'>
                <Button onClick={changeInfo} className='cursor-pointer'>Change Info</Button>
                <Button onClick={changePassword} className='cursor-pointer'>Change Password</Button>
                <Button onClick={switchToWorkerAccount} className='cursor-pointer'>Business Account</Button>
                {/* <Link href={'/profile/edit'} className='bg-black hover:bg-gray-800 rounded-md text-[14px] font-[500] text-white px-5 py-2 cursor-pointer'>Business Account</Link> */}
            </div>
        </div>
  )
}



const ProfilePage = () => {

    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showPasswordChangeForm, setShowPasswordChangeForm] = useState<boolean>(false);
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    useEffect(() => {
        setIsHydrated(true);
    }, [])

    if(!isHydrated){
        return <></>
    }

  return (
    <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative'>
        <div 
            className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
            style={{backgroundImage: "url('/backgrounds/ProfileBackground.png')"}}
        ></div>

        {showEditForm ? 
            <EditProfileForm showEditForm={(value:boolean) => setShowEditForm(value)} /> : 
                showPasswordChangeForm ? 
                    <ChangePasswordForm showPasswordChangeForm={(value: boolean) => setShowPasswordChangeForm(value)} /> : 
                        <ProfileInfoCard 
                            changeInfo={() =>  setShowEditForm(true)} 
                            changePassword={() =>  setShowPasswordChangeForm(true)}
                            switchToWorkerAccount={() =>  console.log("Switched to worker account.")}
                        />}

    </main>
  )
}

export default ProfilePage