import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from '../../public/float.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        }
        try {
            const user = await axios.post('http://localhost:8080/api/auth/login', userData, {
                withCredentials: true,
            });
            localStorage.setItem("token", user.data.token);
            navigate('/u/dashboard');
            await axios.post('http://localhost:8080/api/dashboard/refresh', {});
        } catch (error) {
            console.log("chuda");
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-zinc-900">
            {/* Left Column - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-[100vh] px-4 sm:px-6 md:px-8 lg:px-16 py-8">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2">Login</h1>
                    <p className="text-sm text-zinc-400 mb-8">Enter your account details</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-[#155E95] focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-[#155E95] focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                            </button>
                        </div>

                        <a href="" className="inline-block text-sm text-zinc-400 hover:text-white pointer-events-none hover:underline">
                            Forgot Password?
                        </a>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-[#155E95] py-2 text-white transition-colors hover:bg-[#155E95]/90"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#155E95] hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Welcome Banner */}
            <div className="hidden md:flex md:w-1/2 p-4 lg:p-8 items-center justify-start">
                <div className="bg-[#155E95] rounded-lg flex flex-col items-center p-4 sm:p-6 lg:p-8 text-center w-full max-w-xl">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                        Welcome to
                        <br />
                        Student Portal
                    </h2>
                    <p className="text-purple-200 mb-4 lg:mb-8">Login to access your account</p>
                    <img
                        src={img}
                        alt="Student Portal"
                        className="w-full max-w-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;