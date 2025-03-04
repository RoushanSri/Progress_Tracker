import React from 'react';
import { BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import axios from 'axios';

function Socials() {
  const handlePlatform = async (e, platform) => {
    e.preventDefault();
    const username = e.target[0].value;
    if (!username) return alert('Please enter a username');

    try {
      const response = await axios.post(
        `http://localhost:8080/api/settings/socials/${platform}`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Social Media Platforms</h3>
      <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">
        Add your Social Media handles. You'll need to verify them.
      </p>
      <div className="space-y-4 rounded-lg p-6 bg-gray-100 dark:bg-gray-800">
        <form
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          onSubmit={(e) => handlePlatform(e, "facebook")}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <FaFacebook className="text-white w-6 h-6" />
            <label htmlFor="facebook" className="text-sm w-20 sm:text-base">Facebook</label>
          </div>
          <input
            type="text"
            id="facebook"
            placeholder="Facebook Username"
            className="flex-1 w-full sm:w-auto h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </form>
        <form
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          onSubmit={(e) => handlePlatform(e, "twitter")}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <BsTwitterX className="text-white w-6 h-6" />
            <label htmlFor="twitter" className="text-sm w-20 sm:text-base">Twitter</label>
          </div>
          <input
            type="text"
            placeholder="Twitter Username"
            className="flex-1 w-full sm:w-auto h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </form>
        <form
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          onSubmit={(e) => handlePlatform(e, "instagram")}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <BsInstagram className="text-white w-6 h-6" />
            <label htmlFor="instagram" className="text-sm w-20 sm:text-base">Instagram</label>
          </div>
          <input
            type="text"
            placeholder="Instagram Username"
            className="flex-1 w-full sm:w-auto h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </form>
        <form
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          onSubmit={(e) => handlePlatform(e, "linkedin")}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <BsLinkedin className="text-white w-6 h-6" />
            <label htmlFor="linkedin" className="text-sm sm:text-base w-20">LinkedIn</label>
          </div>
          <input
            type="text"
            placeholder="LinkedIn Username"
            className="flex-1 w-full sm:w-auto h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Socials;