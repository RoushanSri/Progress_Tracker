import React, { useState } from 'react';
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
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                {/* Logo and brand name */}
                <div className="flex items-center text-lg font-bold text-white">
                    <img src={logo} alt="Logo" className="mr-2 h-8" />
                    <span>Progress Tracker</span>
                </div>
                
                {/* Mobile menu button */}
                <button 
                    className="block text-gray-300 hover:text-white md:hidden" 
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
                
                {/* Navigation links */}
                <div className={`w-full md:flex md:w-auto md:items-center ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="mt-4 flex flex-col space-y-2 md:mt-0 md:flex-row md:space-x-6 md:space-y-0">
                        <li className={`flex items-center rounded px-4 py-2 transition duration-300 hover:bg-zinc-900 ${getActiveClass('/')}`}>
                            <Link 
                                to="/" 
                                className="w-full text-gray-300 hover:text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className={`flex items-center rounded px-4 py-2 transition duration-300 hover:bg-zinc-900 ${getActiveClass('/login')}`}>
                            <Link 
                                to="/login" 
                                className="w-full text-gray-300 hover:text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </li>
                        <li className={`flex items-center rounded px-4 py-2 transition duration-300 hover:bg-zinc-900 ${getActiveClass('/signup')}`}>
                            <Link 
                                to="/signup" 
                                className="w-full text-gray-300 hover:text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                SignUp
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;