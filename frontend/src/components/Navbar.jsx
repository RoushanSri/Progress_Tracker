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
        return window.location.pathname === path ? 'bg-purple-500' : '';
    };

    return (
        <nav className="bg-gradient-to-r from-purple-900 via-black to-purple-900 p-4 shadow-lg">
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
                            <li className={`hover:bg-purple-700 rounded transition duration-300 py-1 ${getActiveClass('/dashboard')}`}>
                                <Link to="/dashboard" className="text-gray-300 md:flex justify-center hover:text-white px-3 py-2 active:bg-gray-700">Dashboard</Link>
                            </li>
                            <li className={`hover:bg-purple-500 rounded transition duration-300 py-1 ${getActiveClass('/leaderboard')}`}>
                                <Link to="/leaderboard" className="text-gray-300 md:flex justify-center hover:text-white px-3 py-2 active:bg-purple-500">Leaderboard</Link>
                            </li>
                            <li className={`hover:bg-purple-500 rounded transition duration-300 py-1 ${getActiveClass('/doubts')}`}>
                                <Link to="/doubts" className="text-gray-300 md:flex justify-center hover:text-white px-3 py-2 active:bg-purple-500">Doubts</Link>
                            </li>
                            <li className={`hover:bg-purple-500 rounded transition duration-300 py-1 ${getActiveClass('/material')}`}>
                                <Link to="/material" className="text-gray-300 md:flex justify-center hover:text-white px-3 py-2 active:bg-purple-500">Material</Link>
                            </li>
                            <li className="hover:bg-purple-500 rounded transition duration-300 md:flex justify-center">
                                    <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-1 active:bg-purple-500 flex items-center">
                                        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 10v1m0-10V5"></path>
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </>
                    ) : (
                        <>
                            <li className={`hover:bg-purple-500 rounded transition duration-300 py-1 ${getActiveClass('/')}`}>
                                <Link to="/" className="text-gray-300 md:flex justify-center hover:text-white px-3 py-2 active:bg-purple-500">Home</Link>
                            </li>
                            <li className={`hover:bg-purple-500 rounded transition duration-300 py-1 ${getActiveClass('/login')}`}>
                                <Link to="/login" className="text-gray-300 md:flex justify-center hover:text-white px-3 py-2 active:bg-purple-500">Login</Link>
                            </li>
                            <li className={`hover:bg-purple-500 rounded transition md:flex justify-center duration-300 py-1 ${getActiveClass('/signup')}`}>
                                <Link to="/signup" className="text-gray-300 hover:text-white px-3 py-2 active:bg-purple-500">SignUp</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;