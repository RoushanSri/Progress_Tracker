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
    const [showPassword, setShowPassword] = useState(false); // Added state for showPassword

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
            console.log(error);
        }
        try {
            const token = localStorage.getItem("token");
            const dashboard = await axios.post('http://localhost:8080/api/dashboard/createDashboard', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="flex flex-row-reverse min-h-screen">
            {/* Left Column - Signup Form */}
            <div className="flex w-full flex-col justify-center bg-zinc-900 md:w-1/2 md:px-12 lg:px-16">
                <div className="mx-[6vw] w-full max-w-sm">
                    <h1 className="mb-2 text-[3vw] font-semibold text-white">Sign Up</h1>
                    <p className="mb-8 text-sm text-zinc-400">Enter your account details</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
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
                            className="w-full rounded-md bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-400">
                        Already have an account? 
                        <Link to="/login" className="text-purple-500 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Welcome Banner */}
            <div className="hidden bg-purple-600 md:flex md:w-1/2">
                <div className="flex flex-col items-center py-6 px-[12vw] text-center">
                    <h2 className="mb-2 text-6xl font-bold text-white">
                        Welcome to
                        <br />
                        Student Portal
                    </h2>
                    <p className="mb-8 text-purple-200">Sign up to create your account</p>
                    <img
                        src={logo}
                        className="max-w-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;