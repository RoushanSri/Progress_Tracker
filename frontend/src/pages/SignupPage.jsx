import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import logo from '../../public/Newton-School.png';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit =  async(e) => {
        e.preventDefault();
        const userData = {
            email,
            username,
            password
        }
        try {
            const user = await axios.post('http://localhost:8080/api/auth/signup', userData);
            localStorage.setItem("token", user.data.token);
        } catch (error) {
            console.log(error);
        }
        try {
            const token = localStorage.getItem("token");
            const dashboard = await axios.post('http://localhost:8080/api/dashboard/createDashboard',{},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-lg shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
                <img
                    className="mx-auto h-24 w-24 object-cover animate-bounce"
                    src={logo}
                />
                <h2 className="text-3xl font-extrabold text-white mb-6 text-center animate-pulse">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="username">
                            Username
                        </label>
                        <div className="flex items-center bg-gray-700 rounded-lg">
                            <FaUser className="text-gray-400 ml-3" />
                            <input
                                type="text"
                                id="username"
                                className="bg-gray-700 text-white rounded-lg w-full py-2 px-3 focus:outline-none"
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center bg-gray-700 rounded-lg">
                            <FaEnvelope className="text-gray-400 ml-3" />
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-700 text-white rounded-lg w-full py-2 px-3 focus:outline-none"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center bg-gray-700 rounded-lg">
                            <FaLock className="text-gray-400 ml-3" />
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-700 text-white rounded-lg w-full py-2 px-3 focus:outline-none"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-4">
                    Already have an account? <span onClick={() => navigate('/login')} className='text-blue-400 hover:text-blue-600 duration-300 cursor-pointer'>Login</span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
                