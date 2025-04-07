import React from 'react'

const ForgotPassword = () => {
  return (
    <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative'>
        <div 
            className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
            style={{backgroundImage: "url('/backgrounds/ProfileBackground.png')"}}
        ></div>

        Change Password
    </main>
  )
}

export default ForgotPassword