import React from 'react'
import { BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import axios from 'axios'

function Socials() {

  const handlePlatform = async (e, platform) => {
    e.preventDefault()
    const username = e.target[0].value
    if(!username)
      return alert('Please enter a username')

    if(platform==='facebook'){
      try {
        const response = await axios.post(`http://localhost:8080/api/settings/socials/facebook`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );       
      } catch (error) {
        console.log(error); 
      }
    }
    if(platform==='instagram'){
      try {
        const response = await axios.post(`http://localhost:8080/api/settings/socials/instagram`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );       
      } catch (error) {
        console.log(error); 
      }
    }
    if(platform==='linkedin'){
      try {
        const response = await axios.post(`http://localhost:8080/api/settings/socials/linkedin`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );       
      } catch (error) {
        console.log(error); 
      }
    }
    if(platform==='twitter'){
      try {
        const response = await axios.post(`http://localhost:8080/api/settings/socials/twitter`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );       
      } catch (error) {
        console.log(error); 
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Social Media Platforms</h3>
      <div className="space-y-4 flex flex-col rounded-lg p-6 bg-gray-100 dark:bg-gray-800">
        <form className="flex items-center space-x-2" onSubmit={(e) => handlePlatform(e, "facebook")}>
          <FaFacebook className='text-white' size={'2vw'} />
          <label htmlFor="facebook" className='w-[7rem]'>Facebook</label>
          <input
            type="text"
            id='facebook'
            placeholder="Facebook Username"
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </form>
        <form className="flex items-center space-x-2" onSubmit={(e) => handlePlatform(e, "twitter")}>
          <BsTwitterX className="text-white" size={'2vw'} />
          <label htmlFor="twitter" className='w-[7rem]'>Twitter</label>
          <input
            type="text"
            placeholder="Twitter Username"
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </form>
        <form className="flex items-center space-x-2" onSubmit={(e) => handlePlatform(e, "instagram")}>
          <BsInstagram className="text-white" size={'2vw'} />
          <label htmlFor="instagram" className='w-[7rem]'>Instagram</label>
          <input
            type="text"
            placeholder="Instagram Username"
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </form>
        <form className="flex items-center space-x-2" onSubmit={(e) => handlePlatform(e, "linkedin")}>
          <BsLinkedin className="text-white" size={'2vw'} />
          <label htmlFor="linkedin" className='w-[7rem]'>LinkedIn</label>
          <input
            type="text"
            placeholder="LinkedIn Username"
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Socials
