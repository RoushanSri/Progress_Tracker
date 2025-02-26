import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuPenLine } from "react-icons/lu";
import {Link} from "react-router-dom";

function Dashboard() {
  const { user, data } = useContext(userContext);

  const [date, setDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setDate(date.toUTCString());
  });

  return (
    <div className="flex-1 p-8 min-h-screen bg-gray-950">
      <div className="mb-14 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Hello, {user.username}
          </h1>
          <p className="text-sm text-gray-400">Today is {date}</p>
        </div>
        <div className="flex space-x-5">
          <span>
            <FaInstagram color="white" size={"1.5rem"} />
          </span>
          <span>
            <FaFacebook color="white" size={"1.5rem"} />
          </span>
          <span>
            <FaLinkedin color="white" size={"1.5rem"} />
          </span>
          <span>
            <FaTwitter color="white" size={"1.5rem"} />
          </span>
        </div>
      </div>
      {/*Triple Cards*/}
      <div className="flex space-x-5 w-full h-[15vh]">
        <div className="bg-orange-900 text-white w-full flex items-center justify-around h-full rounded-xl">
          <div>
            <h2 className="font-medium text-xl">Total Questions</h2>
            <p className="text-gray-400">Number of questions Solved🚀 </p>
          </div>
          <span className="text-4xl font-bold">
            {data.leetcode.solvedProblems === -1
              ? "N/A"
              : data.leetcode.solvedProblems}
          </span>
        </div>
        <div className="bg-cyan-900 text-white flex items-center justify-around w-full h-full rounded-xl">
          <div>
            <h2 className="font-medium text-xl">Ranking</h2>
            <p className="text-gray-400">Overall Leaderboard Ranking👑 </p>
          </div>
          <span className="text-4xl font-bold">
            {data.rank === -1 ? "N/A" : data.rank}
          </span>
        </div>
        <div className="bg-purple-900 text-white flex items-center justify-around w-full h-full rounded-xl">
          <div>
            <h2 className="font-medium text-xl">Past days</h2>
            <p className="text-gray-400">Consistency heat map🔥</p>
          </div>
          <span className="text-3xl font-bold flex gap-1">
            {data.past5.map((day, index) => (
              <div
                key={index}
                className={`${
                  day == 0 ? "bg-red-500" : "bg-green-500"
                } w-5 h-5 rounded-md`}
              ></div>
            ))}
          </span>
        </div>
      </div>
      {/*Language Card*/}
      <div className="flex space-x-7 w-full h-[45vh] mt-5">
        <div className="w-full h-full bg-gray-900 border-2 flex text-white flex-col border-gray-800 rounded-xl p-7">
          <h2 className="text-2xl font-medium">Statistics</h2>
          <div className="flex space-x-5 gap-2 w-full h-1/3 my-5 mb-10">
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg">
              <h1 className="text-cyan-400 text-3xl font-medium">
                {data.leetcode.easy}
              </h1>
              <span className="text-xl">Easy</span>
            </div>
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg">
              <h1 className="text-3xl text-orange-400 font-medium">
                {data.leetcode.medium}
              </h1>
              <span className="text-xl">Medium</span>
            </div>
            <div className="border w-full flex flex-col justify-center items-center border-gray-700 rounded-lg">
              <h1 className="text-3xl text-red-700 font-medium">
                {data.leetcode.hard}
              </h1>
              <span className="text-xl">Hard</span>
            </div>
          </div>
          <div className="flex w-full items-center space-x-12">
              <div className="text-xl items-center gap-2 font-medium mb-3 flex">
              <h2>Language for DSA</h2>
              <Link to={"/u/settings/platforms"} className="opacity-70 hover:opacity-100 duration-200"><LuPenLine/></Link>
              </div>
              <span className="text-2xl w-fit font-medium border border-gray-700 rounded-lg p-3">
                {data.dsaLanguage}
              </span>
          </div>
        </div>
        <div className="w-full h-full bg-gray-900 border-2 flex flex-col border-gray-800 text-white rounded-xl p-7">
          <div className="mb-8 h-1/2">
          <div className="text-2xl flex items-center gap-2 font-medium mb-7">
          <h2>Skills</h2>
          <Link to="/u/settings/platforms" className="opacity-70 hover:opacity-100 duration-200"><LuPenLine/></Link>
          </div>
          <div className="flex gap-3 w-full h-fit flex-wrap">
            {data.skills.length!==0?data.skills.map((skill, index) => (
              <div
                key={index}
                className="border block items-center text-wrap justify-center bg-gray-800 border-gray-500 rounded-lg p-1 px-3"
              >
                <span>{skill}</span>
              </div>
            )):(
              <p className="text-gray-400">No Skills added yet..</p>
            )}
          </div>
          </div>
          <div className="w-fit flex flex-col items-center">
              <h2 className="text-xl font-medium mb-3">Platforms</h2>
              <div className="flex">
                {data.leetcode.url !== "" && (
                  <a
                    href={data.leetcode.url}
                    className="text-2xl w-fit font-medium border border-gray-700 rounded-lg p-3"
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
      {/*Projects Card*/}
      <div className="flex w-full h-[25vh] mt-5">
        <div className="w-full h-full bg-gray-900 border-2 p-4 px-6 border-gray-800 rounded-xl">
          <h2 className="text-white font-medium text-2xl">Projects</h2>
          <div className="flex justify-center">
            {data.projects.length == 0 ? (
              <p className="text-gray-400">Currently No Projects are added..</p>
            ) : (
              data.projects.map((project, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p className="text-white">{project.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
