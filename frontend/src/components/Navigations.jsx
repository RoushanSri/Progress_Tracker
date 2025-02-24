import React, { useContext } from 'react'
import { userContext } from '../context/userContext';
import { BarChart3, Calendar, Home, LayoutDashboard, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Navigations() {

    const {user, setUser} = useContext(userContext);

    const location = useLocation();

    const getActiveClass = (path) => {
      return location.pathname === path ? 'bg-gray-800 border-2 border-gray-700' : '';
  };

  return (
    <div>
        <div className="flex w-64 flex-col border-r min-h-screen h-full border-gray-800 bg-gray-900">
        <div className="flex h-14 items-center border-b border-gray-800 px-4">
          <span className="font-semibold text-white">📊 Progress Tracker</span>
        </div>

        <div className="flex flex-col items-center p-6 text-center">
          <div className="h-28 w-28 rounded-full overflow-hidden">
            <img src={user.avatar} alt="Sarah Connor" />
          </div>
          <h3 className="mt-4 font-medium text-lg text-white">{user.username}</h3>
          <p className="text-md text-gray-400">{user.email}</p>
        </div>

        <nav className="flex flex-col items-center justify-center w-full space-y-3 px-2 pl-[3rem]">
          <Link to={'dashboard'}
            className={`w-full p-2 rounded-lg flex items-center text-[1.2rem] justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass('/u/dashboard')}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link >
          <Link to={'leaderboard'}
            className={`w-full p-2 rounded-lg items-center text-[1.2rem] flex justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass('/u/leaderboard')}`}
          >
            <BarChart3 className="h-5 w-5" />
            Leaderboard
          </Link >
          <Link to={'doubts'}
            className={`w-full p-2 rounded-lg flex items-center text-[1.2rem] justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass('/u/doubts')}`}
          >
            <Calendar className="h-5 w-5" />
            Doubts
          </Link >
          <Link to={'material'}
            className={`w-full p-2 rounded-lg items-center text-[1.2rem] flex justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass('/u/material')}`}
          >
            <Home className="h-5 w-5" />
            Material
          </Link >
          <Link to={'settings'}
            className={`w-full p-2 rounded-lg flex items-center text-[1.2rem] justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass('/u/settings')}`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link >
        </nav>
      </div>
    </div>
  )
}

export default Navigations;