import React, { useContext, useEffect, useState } from "react";
import noImage from "../../public/noImage.webp";
import leetcode from "../../public/leetcode.png";
import gfg from "../../public/gfg.png";
import github from "../../public/github.webp";
import { LuArrowUpRight } from "react-icons/lu";
import { MdAddCircleOutline } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import FormForPlatforms from "../components/FormForPlatforms";
import { userContext } from "../context/userContext";

const Dashboard = () => {

  const {user, data} = useContext(userContext);

  const [editedLang, setEditedLang] = useState("");
  const [skills, setSkills] = useState([]);
  const [pastFive, setPastFive] = useState([]);
  const [dbHistory, setDbHistory] = useState({});
  const [add, setAdd] = useState(false);
  const [editLang, setEditLang] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [Leetcode, setLeetcode] = useState(false);
  const [addPlatformPopup, setAddPlatformPopup] = useState(false);
  const [Gfg, setGfg] = useState(false);

  const getPastFiveDays= ()=> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pastFiveDays = [];
  
    for (let i = 4; i >= 0; i--) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      const utcTimestamp = Date.UTC(pastDate.getUTCFullYear(), pastDate.getUTCMonth(), pastDate.getUTCDate());
      pastFiveDays.push( utcTimestamp/1000);
    }    
    return pastFiveDays;
  }

  useEffect(() => {
    const fetchDashboard = async () => {   
      if(data){   
      setDbHistory(data.leetcode.calendar)
      setLeetcode(data.leetcode.url==""?false:true)
      }
      const matchDate = getPastFiveDays();      
      if(dbHistory.length!=0){              
      setPastFive(check(matchDate, dbHistory));      
      }
      else{
        setPastFive([0,0,0,0,0])
      }
    };
    fetchDashboard();
    },[user,dbHistory]);  

  const handleAddSkill = async (e) => {
    e.preventDefault();
      await axios.post(
      "http://localhost:8080/api/dashboard/addSkill",
      {
        skill: newSkill,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setNewSkill("");
    setAdd(false);
    setSkills([...skills, newSkill]);
  };

  const handleEditLang = async (e) => {
    e.preventDefault();
    const dashboard = await axios.post(
      "http://localhost:8080/api/dashboard/editLanguage",
      {
        editedLang,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setEditLang(false);
    setDsaLanguages(editLang);
  };

  const check= (matchDate, dbHistory)=> {
    
    const dbObject=JSON.parse(dbHistory);
    
    const set = new Set(Object.keys(dbObject).map(Number));

    const finalDate = [0,0,0,0,0]
    for(let i=4; i>=0; i--) {
        if(set.has(matchDate[i])) {
          finalDate[i]=1                    
        }   
      }    
      
         
    return finalDate;
    }
  

  return (
    <div className="h-full p-4 bg-gradient-to-tl from-black via-purple-900 to-black sm:px-8 md:px-16 lg:px-32 overflow-hidden">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Performance Tracker Dashboard
      </h1>
      <div className="grid grid-rows-5 md:grid-rows-5 grid-cols-1 h-[70%] md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-tl from-purple-900 via-black to-purple-900 bg-opacity-90 flex flex-col gap-5 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-5 md:col-span-2 lg:col-span-2">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-full mx-auto">
            <img
              src={noImage}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white text-center">
            {user.username}
          </h2>
          <ul className="list-none flex justify-center gap-2">
            <li>
              <a href="#" target="blank">
                <FaLinkedin color="white" />
              </a>
            </li>
            <li>
              <a href="#" target="blank">
                <FaInstagram color="white" />
              </a>
            </li>
            <li>
              <a href="#" target="blank">
                <FaXTwitter color="white" />
              </a>
            </li>
          </ul>
          <hr className="bg-gray-100 h-[1.1px]" />
          <p className="text-gray-100 font-semibold text-xl text-center">
            Problem Solving Platforms...
          </p>
          <ul className="list-none space-y-4">
            {Leetcode && (
              <li className="lg:px-5">
                <div className="flex items-center gap-2 w-full border shadow-sm justify-around bg-purple-700 rounded-lg p-2">
                  <img src={leetcode} alt="LeetCode" className="w-6 h-6" />
                  <p className="text-white">LeetCode</p>
                  <a
                    href={`https://leetcode.com/u/${data.leetcode.username}`}
                    target="blank"
                    className="flex items-center p-[1px] rounded-md hover:bg-purple-600"
                  >
                    <LuArrowUpRight color="white" size={"1.5rem"} />
                  </a>
                </div>
              </li>
            )}
            {Gfg && (
              <li className="lg:px-5">
                <div className="flex items-center gap-2 w-full justify-around border shadow-sm bg-purple-700 rounded-lg p-2">
                  <img src={gfg} alt="GeeksForGeeks" className="w-6 h-6" />
                  <p className="text-white">GeeksForGeeks</p>
                  <a
                    href="https://www.geeksforgeeks.org/user/roshan_srivastav_21/"
                    target="blank"
                    className="flex items-center p-[1px] rounded-md hover:bg-purple-600"
                  >
                    <LuArrowUpRight color="white" size={"1.5rem"} />
                  </a>
                </div>
              </li>
            )}
            <li className="lg:px-5">
              <button
                onClick={() => setAddPlatformPopup(true)}
                className="flex items-center gap-2 w-full text-white border-dashed border-2 border-gray-600 justify-center rounded-lg p-2"
              >
                + Add Platform
              </button>
            </li>
          </ul>
          {addPlatformPopup && (
            <FormForPlatforms
              setAddPlatformPopup={setAddPlatformPopup}
              setLeetcode={setLeetcode}
              Leetcode={Leetcode}
              Lusername={data.leetcode.username}
            />
          )}
          <hr className="bg-gray-100 h-[0.5px]" />
          <p className="text-gray-100 font-semibold text-xl text-center">
            Git Hub
          </p>
          <div className="flex items-center gap-2 w-full border shadow-sm justify-around bg-purple-700 rounded-lg p-2">
            <img src={github} alt="GitHub" className="w-6 h-6" />
            <p className="text-white">GitHub</p>
            <a
              href="https://github.com/RoushanSri"
              target="blank"
              className="flex items-center p-[1px] rounded-md hover:bg-purple-600"
            >
              <LuArrowUpRight color="white" size={"1.5rem"} />
            </a>
          </div>
        </div>
        <div className="bg-gradient-to-tl from-purple-900 via-black to-purple-900 bg-opacity-90 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-1 md:col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-white text-center">
            Total Questions Solved..
          </h2>
          <p className="text-white text-center font-bold flex justify-center text-4xl items-center">
            {data.leetcode.solvedProblems===-1?'N/A':data.leetcode.solvedProblems}
          </p>
        </div>
        <div className="bg-gradient-to-tl from-purple-900 via-black to-purple-900 bg-opacity-90 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-1 md:col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-white text-center">
            Leaderboard Ranking
          </h2>
          <p className="text-white text-center font-bold text-4xl">{data.rank}</p>
        </div>
        <div className="bg-gradient-to-tl from-purple-900 via-black to-purple-900 relative bg-opacity-90 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-2 md:col-span-1 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-5 text-white text-center">
            Skill Set
          </h2>
          <ul className="list-none flex gap-3 flex-wrap">
            {data.skills.map((skill, i) => (
              <li key={i}>
                <div className="bg-purple-400 px-2 rounded-full text-base">
                  <p className="text-white">{skill}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setAdd(true)}
            className="absolute top-6 right-6 p-1 hover:bg-purple-600 rounded-md text-white"
          >
            <MdAddCircleOutline size={"1.5rem"} color="orange" />
          </button>
          {add && (
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center">
              <div className="p-4 relative bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  Add New Skill
                </h2>
                <form onSubmit={(e) => handleAddSkill(e)}>
                  <input
                    type="text"
                    placeholder="Enter Skill"
                    className="p-2 w-full rounded-md mb-4"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button className="p-2 w-full rounded-md bg-purple-600 text-white">
                    Add Skill
                  </button>
                </form>
                <button
                  onClick={() => setAdd(false)}
                  className="absolute top-0 right-2 p-2 rounded-md text-red-400"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-tl from-purple-900 via-black to-purple-900 bg-opacity-90 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-1 md:col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">
            Past five days track
          </h2>
          <div className="flex justify-center items-center gap-2">
            {
            pastFive.map((day, index) => (
              <div
                key={index}
                className={`${
                  day == 0 ? "bg-red-500" : "bg-green-500"
                } w-6 h-6 rounded-md`}
              ></div>
            ))}
          </div>
        </div>
        <div className="relative bg-gradient-to-tl from-purple-900 via-black to-purple-900 bg-opacity-90 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-1 md:col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">
            Language For DSA
          </h2>
          <p className="text-gray-300 text-center text-2xl font-bold">
            {data.dsaLanguage===''?'N/A':data.dsaLanguage}
          </p>
          <button
            onClick={() => setEditLang(true)}
            className="absolute top-6 right-6 text-white"
          >
            +Edit
          </button>
          {editLang && (
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center">
              <div className="p-4 relative bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  Edit Language
                </h2>
                <form onSubmit={(e) => handleEditLang(e)}>
                  <input
                    type="text"
                    placeholder="Enter Language"
                    className="p-2 w-full rounded-md mb-4"
                    value={editedLang}
                    onChange={(e) => setEditedLang(e.target.value)}
                  />
                  <button className="p-2 w-full rounded-md bg-purple-600 text-white">
                    Save Changes
                  </button>
                </form>
                <button
                  onClick={() => setEditLang(false)}
                  className="absolute top-0 right-2 p-2 rounded-md text-red-400"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-tl from-purple-900 via-black to-purple-900 relative bg-opacity-90 shadow-lg rounded-lg p-4 sm:p-6 md:p-8 row-span-2 md:col-span-2 lg:col-span-4">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">
            Projects
          </h2>
          <button className="absolute top-6 right-6 p-1 hover:bg-purple-600 rounded-md text-white">
            <MdAddCircleOutline size={"1.5rem"} color="orange" />
          </button>
          {data.projects.length > 0 ? (
            <ul className="list-none flex gap-4">
              {data.projects.map((project, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 w-full border shadow-sm bg-purple-700 rounded-lg p-2"
                >
                  <p className="text-white">{project}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-[9vw] border-dashed border-2 border-gray-600 rounded-lg">
              <p className="text-gray-300 text-center">Add projects..</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
