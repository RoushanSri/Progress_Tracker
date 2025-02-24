import React from 'react'
import Navigations from '../components/Navigations'
import {Outlet} from 'react-router-dom'

function MainLayout() {
return (
    <div className='flex '>
        <Navigations className='w-full'/>
        <div className='w-full'>
            <Outlet/>
        </div>
    </div>
)
}

export default MainLayout
