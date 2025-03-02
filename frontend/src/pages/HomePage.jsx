import React from 'react';
import logo from '../../public/homepage.jpeg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <main className="bg-black px-5 text-white">
          {/* Hero Section */}
          <div
            className="relative min-h-screen flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative container mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-medium mb-4 text-[#155E95]">
                Welcome to Progress Tracker
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Track your progress, get instant doubt assistance, and stay motivated with our user-friendly platform..
              </p>

              <div className="flex justify-center items-center gap-2">
                <button
                  className="bg-[#155E95] text-white py-2 px-4 rounded-lg hover:bg-3D8D7A-dark transition duration-300 transform hover:scale-105"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </button>
                <button
                  className="bg-[#155E95] text-white py-2 px-4 rounded-lg hover:bg-3D8D7A-dark transition duration-300 transform hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  Learn More
                </button>
              </div>

              {/* Featured Section */}
              <div className="mt-24">
                <p className="text-sm text-white/70 mb-6">Recognized as a leading platform for progress tracking and goal achievement.</p>
                <div className="flex justify-center items-center gap-8 grayscale opacity-70">
                  <div className="text-white font-serif text-2xl">Unlock Your Progress</div>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
};

export default HomePage;