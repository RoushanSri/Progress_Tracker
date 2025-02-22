import React, { useEffect, useState } from 'react';
import logo from '../../public/Newton-School.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    });

    const handleLogout =async () => {

        const token = localStorage.getItem('token');
        if (!token) return;

        await axios.post('http://localhost:8080/api/auth/logout',{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };


    const getActiveClass = (path) => {
        return window.location.pathname === path ? 'bg-zinc-900' : '';
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
                    {isLoggedIn ? (
                        <>
                            <li className={`hover:bg-zinc-900 rounded transition duration-300 px-4 py-1 flex items-center ${getActiveClass('/dashboard')}`}>
                                <Link to="/dashboard" className="text-gray-300 md:flex justify-center hover:text-white active:bg-gray-700">Dashboard</Link>
                            </li>
                            <li className={`hover:bg-zinc-900 rounded transition duration-300 px-4 py-1 flex items-center ${getActiveClass('/leaderboard')}`}>
                                <Link to="/leaderboard" className="text-gray-300 md:flex justify-center hover:text-white active:bg-zinc-900">Leaderboard</Link>
                            </li>
                            <li className={`hover:bg-zinc-900 rounded transition duration-300 px-4 py-1 flex items-center ${getActiveClass('/doubts')}`}>
                                <Link to="/doubts" className="text-gray-300 md:flex justify-center hover:text-white active:bg-zinc-900">Doubts</Link>
                            </li>
                            <li className={`hover:bg-zinc-900 rounded transition duration-300 px-4 py-1 flex items-center ${getActiveClass('/material')}`}>
                                <Link to="/material" className="text-gray-300 md:flex justify-center hover:text-white active:bg-zinc-900">Material</Link>
                            </li>
                            <li className="hover:bg-zinc-900 rounded transition duration-300 md:flex px-3 py-1 justify-center">
                                <button onClick={handleLogout} className="text-gray-300 hover:text-white active:bg-zinc-900 flex items-center">
                                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 10v1m0-10V5"></path>
                                    </svg>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
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
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;