"use client"

import { useState, useEffect } from "react"
import { FiMoon, FiSun,  } from "react-icons/fi"
import { Camera } from "lucide-react";
import { HiMiniUserCircle } from "react-icons/hi2";



const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for the user's theme preference
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme === "dark" : false
  })
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [preferredLanguage, setPreferredLanguage] = useState("")
  const [codingPlatforms, setCodingPlatforms] = useState([
    { name: "LeetCode", connected: false, username: "" },
    { name: "CodeChef", connected: true, username: "" },
    { name: "Codeforces", connected: false, username: "" },
    { name: "GitHub", connected: true, username: "" },
    { name: "GeeksforGeeks", connected: false, username: "" },
  ])
  const [socialPlatforms, setSocialPlatforms] = useState([
    { name: "Facebook", connected: false, username: "" },
    { name: "Twitter", connected: false, username: "" },
    { name: "Instagram", connected: false, username: "" },
    { name: "LinkedIn", connected: false, username: "" },
  ])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  const togglePlatformConnection = (index, type) => {
    if (type === "coding") {
      setCodingPlatforms((prevPlatforms) => {
        const updatedPlatforms = prevPlatforms.map((platform, i) => 
          i === index ? { ...platform, connected: !platform.connected } : platform
        )
        return updatedPlatforms
      })
    } else if (type === "social") {
      setSocialPlatforms((prevPlatforms) => {
        const updatedPlatforms = prevPlatforms.map((platform, i) => 
          i === index ? { ...platform, connected: !platform.connected } : platform
        )
        return updatedPlatforms
      })
    }
  }

  const handlePlatformInputChange = (index, field, value, type) => {
    if (type === "coding") {
      setCodingPlatforms((prevPlatforms) => {
        const updatedPlatforms = prevPlatforms.map((platform, i) => 
          i === index ? { ...platform, [field]: value } : platform
        )
        return updatedPlatforms
      })
    } else if (type === "social") {
      setSocialPlatforms((prevPlatforms) => {
        const updatedPlatforms = prevPlatforms.map((platform, i) => 
          i === index ? { ...platform, [field]: value } : platform
        )
        return updatedPlatforms
      })
    }
  }

  return (
   
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="flex items-center space-x-4 mb-4 ">
              <div className="relative w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full ">
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
               < HiMiniUserCircle className="h-[29vh] w-[29vw] "/>
                </div>
                <label htmlFor="profile-picture">
                   <Camera className="absolute bottom-0 right-0 w-9 h-9 bg-black rounded-full p-1 " />

                </label>
                </div>
                <input
                  type="file"
                  id="profile-picture"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="old-password" className="block mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  id="old-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your old password"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div>
              <label htmlFor="coding-language" className="block mb-1">
                Preferred Coding Language
              </label>
              <select
                id="coding-language"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select a language</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="c++">C++</option>
                <option value="java">Java</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Connected Platforms Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Connected Platforms</h2>
            <div className="space-y-4">
              {codingPlatforms.map((platform, index) => (
                <div key={platform.name} className="flex flex-col space-y-2">
                  <span>{platform.name}</span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={platform.username}
                      onChange={(e) => handlePlatformInputChange(index, "username", e.target.value, "coding")}
                      className="px-3 py-2 border w-1/2 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                  <button
                    onClick={() => togglePlatformConnection(index, "coding")}
                    className={`px-4 py-2 rounded ${
                      platform.connected
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        : "bg-blue-500 text-white"
                    } hover:bg-opacity-80 transition-colors`}
                  >
                    {platform.connected ? "Disconnect" : "Add Account"}
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Social Platforms</h2>
            <div className="space-y-4">
              {socialPlatforms.map((platform, index) => (
                <div key={platform.name} className="flex flex-col space-y-2">
                  <span>{platform.name}</span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={platform.username}
                      onChange={(e) => handlePlatformInputChange(index, "username", e.target.value, "social")}
                      className="px-3 py-2 border w-1/2 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                  <button
                    onClick={() => togglePlatformConnection(index, "social")}
                    className={`px-4 py-2 rounded ${
                      platform.connected
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        : "bg-blue-500 text-white"
                    } hover:bg-opacity-80 transition-colors`}
                  >
                    {platform.connected ? "Disconnect" : "Add Account"}
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-opacity-80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage
