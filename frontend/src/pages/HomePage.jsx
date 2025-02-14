import React from 'react';
import logo from '../../public/Newton-School.png';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 overflow-hidden p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-4xl transform transition duration-500 hover:scale-105">
                <img
                    className="mx-auto h-24 w-24 object-cover animate-bounce"
                    src={logo}
                    alt="Logo"
                />
                <h1 className="text-4xl font-extrabold text-white mb-6 text-center animate-pulse">Welcome to Progress Tracker</h1>
                <p className="text-gray-400 text-center mb-8">
                Track your progress, get instant doubt assistance, and stay motivated with our user-friendly platform..
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:scale-105"
                        onClick={() => navigate("/signup")}
                    >
                        Get Started
                    </button>
                    <button
                        className="bg-gradient-to-r from-red-400 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-red-500 hover:to-pink-600 transition duration-300 transform hover:scale-105"
                        onClick={() => navigate("/login")}
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;