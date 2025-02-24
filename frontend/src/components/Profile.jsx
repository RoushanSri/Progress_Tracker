import { Camera } from "lucide-react";
import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext";

function Profile() {
  const {user, setUser} = useContext(userContext);

  const [username, setUsername]=useState(user.username)

  const handleSubmit = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload=async () => {
        const base64Image = reader.result;
       try {
         await axios.post('http://localhost:8080/api/auth/uploadAvatar', {avatar: base64Image},
            {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }
         );
       } catch (error) {
            console.log(error);
       }
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[1].value;
    try {
      const response = await axios.post('http://localhost:8080/api/auth/updateUsername', {username},
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      setUser(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h3>
      <p className={`text-sm text-gray-500 mb-8 dark:text-gray-400`}>
                Update your Username and Avatar.
              </p>
      <div className="space-y-4 flex flex-col items-center rounded-lg p-6 bg-gray-100 dark:bg-gray-800">
        <form className="w-full max-w-sm" onSubmit={(e)=>{handleFormSubmit(e)}} >
          <div className="relative w-40 h-40 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto">
            <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden text-gray-500 dark:text-gray-400 border-2 border-gray-200">
              <img src={user.avatar} alt="Profile" className="object-cover w-full h-full" />
            </div>
            <label htmlFor="profile-picture">
              <Camera className="absolute bottom-2 right-2 w-10 h-10 bg-gray-700 bg-opacity-60 hover:bg-opacity-80 hover:scale-110 duration-300 rounded-full p-1 cursor-pointer" />
            </label>
          </div>
          <input
            type="file"
            id="profile-picture"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleSubmit(e)}
          />
          <div className="mt-6">
            <label htmlFor="username" className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Username:</label>
            <input type="text" id="username" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={username} onChange={(e)=> setUsername(e.target.value)
            } />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Email:</label>
            <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none sm:text-sm" disabled value={user.email} />
          </div>
          <div>
            <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
