import React from 'react'
import Navigations from '../components/Navigations'
import {Outlet} from 'react-router-dom'

function MainLayout() {
return (
    <div className='flex '>
        <Navigations className='w-full'/>
        <div className='w-full lg:ml-64 transition-all duration-300'>
            <Outlet/>
        </div>
    </div>
)
}

export default MainLayout
