import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import git from "../../public/github.webp";
import { Star } from "lucide-react";

function Dashboard() {
  const { user, data } = useContext(userContext);
  const [date, setDate] = useState("");  

  useEffect(() => {
    const date = new Date();
    setDate(date.toUTCString());
  }, []);

  return (
    <div className="flex-1 p-8 md:p-8 min-h-screen bg-gray-950">
      <div className="mb-6 md:mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 lg:pt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Hello, {user.username}
          </h1>
          <p className="text-sm text-gray-400">Today is {date}</p>
        </div>
        <div className="flex space-x-5">
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaInstagram color="white" size={"1.5rem"} />
          </span>
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaFacebook color="white" size={"1.5rem"} />
          </span>
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaLinkedin color="white" size={"1.5rem"} />
          </span>
          <span className="cursor-pointer hover:opacity-80 transition-opacity">
            <FaTwitter color="white" size={"1.5rem"} />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="bg-orange-900 text-white w-full flex items-center justify-around p-4 lg:py-6 rounded-xl">
          <div>
            <h2 className="font-medium text-lg md:text-xl">Total Questions</h2>
            <p className="text-gray-400 text-sm md:text-base">Number of questions Solved🚀</p>
          </div>
          <span className="text-3xl md:text-4xl font-bold">
            {data.leetcode.solvedProblems === -1
              ? "N/A"
              : data.leetcode.solvedProblems}
          </span>
        </div>
        <div className="bg-cyan-900 text-white flex items-center justify-around p-4 lg:py-6 rounded-xl">
          <div>
            <h2 className="font-medium text-lg md:text-xl">Ranking</h2>
            <p className="text-gray-400 text-sm md:text-base">Overall Leaderboard Ranking👑</p>
          </div>
          <span className="text-3xl md:text-4xl font-bold">
            {data.rank === -1 ? "N/A" : data.rank}
          </span>
        </div>
        <div className="bg-purple-900 text-white flex items-center justify-around p-4 lg:py-6 rounded-xl md:col-span-2 lg:col-span-1">
          <div>
            <h2 className="font-medium text-lg md:text-xl">Past days</h2>
            <p className="text-gray-400 text-sm md:text-base">Consistency heat map🔥</p>
          </div>
          <span className="text-3xl font-bold flex gap-1">
            {data.past5.map((day, index) => (
              <div
                key={index}
                className={`${
                  day == 0 ? "bg-red-500" : "bg-green-500"
                } w-4 h-4 md:w-5 md:h-5 rounded-md`}
              ></div>
            ))}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 my-4 md:my-5">
        <div className="bg-gray-900 border-2 flex text-white flex-col border-gray-800 rounded-xl p-4 md:p-7">
          <h2 className="text-xl md:text-2xl font-medium">Statistics</h2>
          
          <div className="grid grid-cols-3 gap-2 md:gap-5 w-full my-4 md:my-5 md:mb-10">
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg py-3">
              <h1 className="text-cyan-400 text-2xl md:text-3xl font-medium">
                {data.leetcode.easy}
              </h1>
              <span className="text-base md:text-xl">Easy</span>
            </div>
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg py-3">
              <h1 className="text-2xl md:text-3xl text-orange-400 font-medium">
                {data.leetcode.medium}
              </h1>
              <span className="text-base md:text-xl">Medium</span>
            </div>
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg py-3">
              <h1 className="text-2xl md:text-3xl text-red-700 font-medium">
                {data.leetcode.hard}
              </h1>
              <span className="text-base md:text-xl">Hard</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full items-start sm:items-center sm:space-x-4 md:space-x-12 mt-2">
            <div className="text-lg md:text-xl items-center gap-2 font-medium mb-3 flex">
              <h2>Language for DSA</h2>
              <Link to={"/u/settings"} className="opacity-70 hover:opacity-100 duration-200">
                <LuPenLine />
              </Link>
            </div>
            <span className="text-xl md:text-2xl w-fit font-medium border border-gray-700 rounded-lg p-2 md:p-3">
              {data.dsaLanguage}
            </span>
          </div>
        </div>
        <div className="bg-gray-900 border-2 flex flex-col border-gray-800 text-white rounded-xl p-4 md:p-7">
          <div className="mb-4 md:mb-8 h-auto md:h-1/2">
            <div className="text-xl md:text-2xl flex items-center gap-2 font-medium mb-4 md:mb-7">
              <h2>Skills</h2>
              <Link to="/u/settings" className="opacity-70 hover:opacity-100 duration-200">
                <LuPenLine />
              </Link>
            </div>
            <div className="flex gap-2 md:gap-3 w-full h-fit flex-wrap">
              {data.skills.length !== 0 ? (
                data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="border block items-center text-wrap justify-center bg-gray-800 border-gray-500 rounded-lg p-1 px-2 md:px-3 text-sm md:text-base"
                  >
                    <span>{skill}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No Skills added yet..</p>
              )}
            </div>
          </div>
          
          <div className="w-fit flex flex-col items-start md:items-center mt-4">
            <h2 className="text-lg md:text-xl font-medium mb-2 md:mb-3">Platforms</h2>
            <div className="flex">
              {data.leetcode.url !== "" && (
                <a
                  href={data.leetcode.url}
                  className="text-xl md:text-2xl w-fit font-medium border border-gray-700 rounded-lg p-2 md:p-3 hover:bg-gray-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <SiLeetcode />
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-5">
        <div className="w-full h-full bg-gray-900 border-2 p-4 px-4 md:px-6 border-gray-800 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-medium text-xl md:text-2xl">Projects</h2>
            <Link to="/u/settings" className="text-gray-400 hover:text-white duration-200">
              <LuPenLine size={24} />
            </Link>
          </div>
          <div className="flex justify-center">
            {data.projects.length == 0 ? (
              <p className="text-gray-400 py-6">Currently No Projects are added..</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg border border-gray-600 flex flex-col gap-2">
                    <div className="w-full h-44 md:h-52 border-b-gray-600 border-b-2 rounded-t-lg overflow-hidden flex items-center justify-center">
                    <img src={project.coverImage} alt={project.projectName} className="" />
                    </div>
                    <div className="p-4 pt-0">
                    <p className="text-white text-start flex items-center gap-1 text-xl font-semibold mb-2"><Star color="gold" fill="gold"/>{project.projectName}</p>{
                    project.websiteUrl!=="" &&(
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-white text-sm md:text-base mb-2">
                      View Project
                    </a>)}
                    <a href={project.githubUrl} target="blank" className="bg-gray-700 gap-2 flex text-gray-300 mb-1 p-1 px-2 rounded-full items-center xl:w-fit"><img src={git} alt="git" className="w-5 h-5"/><p className='overflow-hidden'>{project.githubUrl.split("com/")[1]}</p></a>                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;