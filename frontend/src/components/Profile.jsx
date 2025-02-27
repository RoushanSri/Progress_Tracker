import { Camera, LucidePenLine } from "lucide-react";
import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import axios from "axios";
import noimage from "../../public/noImage.webp";
import { FaPlus } from "react-icons/fa";


function Profile() {
  const { user, setUser, data, setData } = useContext(userContext);

  const [username, setUsername] = useState(user.username);
  const [language, setLanguage] = useState(data.dsaLanguage);
  const [skills, setSkills] = useState(data.skills);
  const [skill, setSkill] = useState("");

  const handleSubmit = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        await axios.post(
          "http://localhost:8080/api/auth/uploadAvatar",
          { avatar: base64Image },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[1].value;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/updateUsername",
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editLang = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/dashboard/editLanguage",
        {
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addSkill = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/dashboard/addSkill",
        {
          skill: skill,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData({ ...data, skills: [...data.skills, skill] });
      setSkills([...skills, skill]);
      setSkill("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSkill = async (index) => {
    try {
      await axios.post(
        `http://localhost:8080/api/dashboard/deleteSkill`,
        {
          skill: data.skills[index],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
      setSkills(skills.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
        Profile Settings
      </h3>
      <p className={`text-sm text-gray-500 mb-8 dark:text-gray-400`}>
        Update your Username and Avatar.
      </p>
      <div className="space-y-4 flex flex-col items-center rounded-lg p-6 bg-gray-100 dark:bg-gray-800">
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <div className="relative w-40 h-40 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto">
            <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden text-gray-500 dark:text-gray-400 border-2 border-gray-200">
              <img
                src={user.avatar || noimage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
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
            <label
              htmlFor="username"
              className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none sm:text-sm"
              disabled
              value={user.email}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Language Settings
        </h3>
        <p className={`text-sm text-gray-500 dark:text-gray-400 mb-8`}>
          Add your Language for DSA.
        </p>
        <div className="flex bg-gray-800 items-center space-x-3 rounded-lg p-5">
          <LucidePenLine className="text-xl" />
          <label htmlFor="dsa" className="text-xl font-medium">
            Language
          </label>
          <input
            type="text"
            id="dsa"
            value={language}
            placeholder="Edit Language.."
            className="flex h-10 w-1/3 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
            onChange={(e) => setLanguage(e.target.value)}
          />
          <button
            onClick={() => editLang()}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Done
          </button>
        </div>
      </div>

      <div className="mt-8 w-full">
        <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Skills Settings
        </h3>
        <p className={`text-sm text-gray-500 dark:text-gray-400 mb-8`}>
          Update your Skill set.
        </p>
        <div className="rounded-lg p-5 w-full flex flex-col space-y-4 bg-gray-800 ">
          <div className="flex items-center space-x-3">
            <LucidePenLine className="text-xl" />
            <label htmlFor="skill" className="text-xl font-medium">
              Skill
            </label>
            <input
              type="text"
              id="skill"
              value={skill}
              placeholder="Add Skill.."
              className="flex h-10 w-1/3 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
              onChange={(e) => setSkill(e.target.value)}
            />
            <button
              onClick={() => addSkill()}
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
            >
              Done
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-900 rounded-lg border border-gray-500"
              >
                <div className="flex justify-center items-center border-r p-1 px-2 border-gray-500 text-nowrap">
                  {skill}
                </div>
                <button
                  onClick={() => deleteSkill(index)}
                  className="w-full inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 sm:w-auto p-1"
                >
                  <span className="rotate-45">
                    <FaPlus size={"1.2rem"} className="text-red-600 hover:text-red-500 duration-200 scale-110" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
