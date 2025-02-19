import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  
  const [data, setData] = useState([]);
  useEffect(()=>{
    const getAll=async()=>{
      const dataS=await axios.get('http://localhost:8080/api/dashboard/getAll')
      setData(dataS.data);
    }
    getAll();
  },[])
  const handleSort = (key) => {
    const sortedData = [...data].sort((a, b) => b[key] - a[key]);
    setData(sortedData);
  };
  
  return (
    <div className="mx-auto p-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
        Leaderboard
      </h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full mb-8 shadow-lg transition duration-300 transform hover:scale-105"
        onClick={() => handleSort("score")}
      >
        Sort by Score
      </button>
      <div className="w-full max-w-4xl">
        <table className="min-w-full shadow-md rounded-lg text-white overflow-hidden">
          <thead className="bg-gray-900">
            <tr>
              <th className="py-4 px-6 text-left text-gray-300 font-bold uppercase tracking-wider">
                Rank
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-bold uppercase tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-bold uppercase tracking-wider">
                Language
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-bold uppercase tracking-wider">
                Total
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-bold uppercase tracking-wider">
                Previous
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}`}
              >
                <td className="py-4 px-6">
                  {index + 1 === 1 && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                  )}
                  {index + 1 === 2 && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                  )}
                  {index + 1 === 3 && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                  )}
                  {index + 1 > 3 && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6 ">{item.name}</td>
                <td className="py-4 px-6">{item.language}</td>
                <td className="py-4 px-6">{item.score}</td>
                <td className="py-4 px-6 flex items-center gap-2">
                  {
                    item.previous.map((day, index) => (
                      <div
                        key={index}
                        className={`${
                          day == 0 ? "bg-red-500" : "bg-green-500"
                        } w-5 h-5 rounded-md`}
                      ></div>
                    ))
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
