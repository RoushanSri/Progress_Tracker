import React, { useEffect, useState } from 'react';
import logo from '../../public/Newton-School.png';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {

    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const getActiveClass = (path) => {
        return location.pathname === path ? 'bg-zinc-900' : '';
    };

    return (
        <nav className="bg-[#155E95] p-3 shadow-lg">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="text-white text-lg font-bold flex items-center">
                    <img src={logo} alt="Logo" className="h-8 mr-2" />
                    <span>Progress Tracker</span>
                </div>
                <button className="text-gray-300 hover:text-white md:hidden block" onClick={() => setMenuOpen(!menuOpen)}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <ul className={`md:flex md:space-x-6 ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
                    
                        <>
                            <li className={`hover:bg-zinc-900 rounded px-4 py-1 flex items-center transition duration-300 ${getActiveClass('/')}`}>
                                <Link to="/" className="text-gray-300 md:flex justify-center hover:text-white active:bg-zinc-900">Home</Link>
                            </li>
                            <li className={`hover:bg-zinc-900 rounded transition duration-300 px-4 py-1 flex items-center ${getActiveClass('/login')}`}>
                                <Link to="/login" className="text-gray-300 md:flex justify-center hover:text-white active:bg-zinc-900">Login</Link>
                            </li>
                            <li className={`hover:bg-zinc-900 rounded transition md:flex justify-center duration-300 px-4 py-1 flex items-center ${getActiveClass('/signup')}`}>
                                <Link to="/signup" className="text-gray-300 hover:text-white active:bg-zinc-900">SignUp</Link>
                            </li>
                        </>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;