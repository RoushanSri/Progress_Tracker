import React, { useContext, useState } from 'react';
import { userContext } from '../context/userContext';
import { BarChart3, Calendar, Home, LayoutDashboard, Settings, LogOut, Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import noimage from '../../public/noImage.webp';
import nscc from '../../public/Newton-School.png';

function Navigations() {
  const { user, setUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getActiveClass = (path) => {
    return location.pathname === path ? 'bg-gray-800 border-2 border-gray-700' : '';
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.post(
      'http://localhost:8080/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div className={`lg:hidden ${isSidebarOpen?"hidden":"block mb-4"} fixed top-4 left-4 z-50`}>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-400 hover:text-white focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div
        className={`fixed lg:relative lg:translate-x-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:flex w-64 flex-col border-r min-h-screen h-full border-gray-800 bg-gray-900 z-40`}
      >
        <div className="flex h-14 gap-4 items-center border-b border-gray-800 px-4">
          <img src={nscc} alt="nscc" className="w-6 h-6" />
          <span className="font-semibold text-white">Progress Tracker</span>
        </div>

        <div className="flex flex-col items-center p-6 text-center">
          <div className="h-28 w-28 rounded-full overflow-hidden">
            <img src={user.avatar || noimage} alt="User Avatar" />
          </div>
          <h3 className="mt-4 font-medium text-lg text-white">{user.username}</h3>
          <p className="text-md text-gray-400">{user.email}</p>
        </div>

        <nav className="flex flex-col items-center justify-center w-full space-y-3 px-2 pl-[3rem]">
          <Link
            to={'dashboard'}
            onClick={closeSidebar}
            className={`w-full p-2 rounded-lg flex items-center text-[1.2rem] justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass(
              '/u/dashboard'
            )}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to={'leaderboard'}
            onClick={closeSidebar}
            className={`w-full p-2 rounded-lg items-center text-[1.2rem] flex justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass(
              '/u/leaderboard'
            )}`}
          >
            <BarChart3 className="h-5 w-5" />
            Leaderboard
          </Link>
          <Link
            to={'doubts'}
            onClick={closeSidebar}
            className={`w-full p-2 rounded-lg flex items-center text-[1.2rem] justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass(
              '/u/doubts'
            )}`}
          >
            <Calendar className="h-5 w-5" />
            Tasks
          </Link>
          <Link
            to={'material'}
            onClick={closeSidebar}
            className={`w-full p-2 rounded-lg items-center text-[1.2rem] flex justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass(
              '/u/material'
            )}`}
          >
            <Home className="h-5 w-5" />
            Material
          </Link>
          <Link
            to={'settings'}
            onClick={closeSidebar}
            className={`w-full p-2 rounded-lg flex items-center text-[1.2rem] justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white ${getActiveClass(
              '/u/settings'
            )}`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full p-2 flex items-center text-[1.2rem] justify-start gap-2 rounded-lg text-red-700 hover:text-red-600"
          >
            <LogOut />
            Logout
          </button>
        </nav>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } lg:ml-64`} // Add margin-left when sidebar is open
      >
      </div>
    </div>
  );
}

export default Navigations;