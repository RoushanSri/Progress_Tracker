import React, { useEffect, useState } from "react";
import leetcode from "../../public/leetcode.png";
import gfg from "../../public/gfg.png";
import github from "../../public/github.webp";
import { FaCheckSquare } from "react-icons/fa";
import axios from "axios";

const FormForPlatforms = (props) => {
  const [gfgUsername, setGfgUsername] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [colorL, setColorL] = useState("white");
  const [leetcodeUsername, setLeetcodeUsername] = useState(props.Lusername);

  const check = async (platform) => {
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
        
        const matchedUser=await data.data.data.matchedUser;
        if (matchedUser!=null){
          setColorL("green");
          props.setLeetcode(true);
          const res = axios.post(
            "http://localhost:8080/api/dashboard/updateLeetcode",
            { data: matchedUser, leetcodeUsername: leetcodeUsername },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }
        else{
          setColorL("red");
        }
      }
      catch (error) {
        setColorL("red");
      }
    } else if (platform === "GFG") {
    } else if (platform === "Github") {
    }
  };

  useEffect(() => {
    if (props.Leetcode == true) {
      setColorL("green");
    } else setColorL("white");
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="p-4 relative w-[25vw] bg-gray-900 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Add Platforms
        </h2>

        <div className="flex flex-col gap-4 text-white">
          <div className="flex items-center gap-2">
            <img src={leetcode} alt="LeetCode" className="w-6 h-6" />
            <input
              type="text"
              placeholder="LeetCode Username"
              className={`p-2 w-full rounded-md mb-2 bg-transparent outline outline-gray-500`}
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
            />
            <button onClick={() => check("Leetcode")}>
              <FaCheckSquare color={colorL} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <img src={gfg} alt="GeeksForGeeks" className="w-6 h-6" />
            <input
              type="text"
              placeholder="GeeksForGeeks Username"
              className="p-2 w-full rounded-md mb-2 bg-transparent outline outline-gray-500"
              value={gfgUsername}
              onChange={(e) => setGfgUsername(e.target.value)}
            />
            <button onClick={() => check("GFG")}>
              <FaCheckSquare />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <img src={github} alt="GitHub" className="w-6 h-6" />
            <input
              type="text"
              placeholder="GitHub Username"
              className="p-2 w-full rounded-md mb-2 bg-transparent outline outline-gray-500"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
            />
            <button onClick={() => check("Github")}>
              <FaCheckSquare />
            </button>
          </div>
          <button
            type="submit"
            className="p-2 w-full rounded-md bg-purple-600 text-white"
          >
            Add Platforms
          </button>
        </div>

        <button
          onClick={() => props.setAddPlatformPopup(false)}
          className="absolute top-0 right-2 p-2 rounded-md text-red-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FormForPlatforms;
