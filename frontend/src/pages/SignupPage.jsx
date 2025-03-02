import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../public/float.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            username,
            password
        };
        try {
            const user = await axios.post('http://localhost:8080/api/auth/signup', userData);
            localStorage.setItem("token", user.data.token);
        } catch (error) {
            alert(error.response.data.message);
        }
        try {
            const token = localStorage.getItem("token");
            const dashboard = await axios.post('http://localhost:8080/api/dashboard/createDashboard', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/u/dashboard');
        } catch (error) {
            console.log(error);
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 md:flex-row-reverse">
            {/* Left Column - Signup Form */}
            <div className="w-full flex flex-col justify-center h-[100vh] items-center px-4 py-8 md:w-1/2 md:px-6 lg:px-16">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2">Sign Up</h1>
                    <p className="text-sm text-zinc-400 mb-8">Enter your account details</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-[#155E95] focus:outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-[#155E95] focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-[#155E95] focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            >
                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-[#155E95] py-2 text-white transition-colors hover:bg-[#155E95]/90"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#155E95] hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Welcome Banner */}
            <div className="w-full flex justify-end items-center p-4 md:w-1/2 md:p-6 lg:p-8">
                <div className="bg-[#155E95] rounded-lg text-center p-6 w-full max-w-lg">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2">
                        Welcome to
                        <br />
                        Student Portal
                    </h2>
                    <p className="text-purple-200 mb-4 md:mb-8">Sign up to create your account</p>
                    <img
                        src={logo}
                        alt="Student Portal Logo"
                        className="max-w-full h-auto mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;