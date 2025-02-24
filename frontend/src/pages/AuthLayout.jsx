import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AuthLayout() {
return (
    <div className='max-h-screen overflow-hidden flex flex-col'>
            <Navbar />
            <div className='flex-grow h-full'>
                    <Outlet />
            </div>
    </div>
)
}

export default AuthLayout
