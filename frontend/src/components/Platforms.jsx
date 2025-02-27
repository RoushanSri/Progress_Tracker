import React, { useContext, useState } from "react";
import { SiCodechef } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
import { userContext } from "../context/userContext";
import axios from "axios";

function Platforms() {
  const { data } = useContext(userContext);

  const [gfgUsername, setGfgUsername] = useState("");
  const [hackerank, setHackerank] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState(
    data.leetcode.username
  );

  const handlePlatform = async (platform) => {
    if (platform === "Leetcode") {
      try {
        const data = await axios.post(
          "http://localhost:8080/api/dashboard/leetcode",
          { leetcodeUsername: leetcodeUsername },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const matchedUser = await data.data.data.matchedUser;

        if (matchedUser != null) {
          const res = axios.post(
            "http://localhost:8080/api/dashboard/updateLeetcode",
            { data: matchedUser, leetcodeUsername: leetcodeUsername },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else {
          alert("Please provide correct leetcode username");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (platform === "GFG") {
    } else if (platform === "codechef") {
    } else if (platform === "hackerrank") {
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
        Coding Platforms
      </h3>
      <p className={`text-sm text-gray-500 dark:text-gray-400 mb-8`}>
        Add your Coding Platforms. You'll need to verify them.
      </p>
      <div className="space-y-4 flex flex-col rounded-lg p-6 bg-gray-100 dark:bg-gray-800 mb-7">
        <div className="flex items-center space-x-2">
          <SiLeetcode className="text-white" size={"2vw"} />
          <label htmlFor="leetcode" className="w-[7rem]">
            Leetcode
          </label>
          <input
            type="text"
            id="leetcode"
            placeholder="Leetcode Username"
            onChange={(e) => setLeetcodeUsername(e.target.value)}
            value={leetcodeUsername}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            onClick={() => handlePlatform("Leetcode")}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <SiGeeksforgeeks className="text-white" size={"2vw"} />
          <label htmlFor="gfg" className="w-[7rem]">
            GFG
          </label>
          <input
            type="text"
            id="gfg"
            placeholder="GFG Username"
            onChange={(e) => setGfgUsername(e.target.value)}
            value={gfgUsername}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            onClick={() => handlePlatform("gfg")}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <FaHackerrank className="text-white" size={"2vw"} />
          <label htmlFor="hackerank" className="w-[7rem]">
            Hackerank
          </label>
          <input
            type="text"
            placeholder="Hackerank Username"
            onChange={(e) => setHackerank(e.target.value)}
            value={hackerank}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            onClick={() => handlePlatform("hackerank")}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <SiCodechef className="text-white" size={"2vw"} />
          <label htmlFor="code chef" className="w-[7rem]">
            Code chef
          </label>
          <input
            type="text"
            placeholder="Code chef Username"
            onChange={(e) => setCodechef(e.target.value)}
            value={codechef}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            onClick={() => handlePlatform("codechef")}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Platforms;
