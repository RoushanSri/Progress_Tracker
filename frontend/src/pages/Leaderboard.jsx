import React, { useEffect, useState } from "react";
import axios from "axios";
import trophy from "../../public/trophy.png";
import noimage from "../../public/noImage.webp";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const dataS = await axios.get('http://localhost:8080/api/dashboard/getAll');
      setData(dataS.data);
    };
    getAll();
  }, []);

  return (
    <div className="mx-auto p-4 bg-gray-950 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold my-4 text-center text-white drop-shadow-lg">
        Leaderboard🚀
      </h1>
      <div className="w-full p-4 md:p-12 pt-4">
        <div className="flex flex-col md:flex-row w-full justify-between space-y-4 md:space-y-0 md:space-x-8 items-center mb-4">
          {data?.map((item, index) => (
            index < 3 && (
              <div key={item.id} className="w-full md:w-1/3 flex shadow-lg shadow-gray-900 flex-col text-white text-2xl border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between font-bold">
                  <Link to={`/u/dashboard/${item.user._id}`} className="flex items-center gap-4 font-bold">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                      <img src={item?.avatar || noimage} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="md:w-[8.5vw] overflow-hidden text-nowrap">{item?.name}</span>
                  </Link>
                  <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                    <img src={trophy} alt="" className="w-14 h-14" />
                  </div>
                </div>
                <div className="flex w-full items-center mt-4">
                  <div className="w-full flex flex-col items-center">
                    <h1 className="text-gray-500 text-lg font-semibold">Rank</h1>
                    <h1 className="text-white text-2xl font-bold">{index + 1}</h1>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <h1 className="text-gray-500 text-lg font-semibold">Total</h1>
                    <h1 className="text-white text-2xl font-bold">{item?.score}</h1>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <h1 className="text-gray-500 text-lg font-semibold">Language</h1>
                    <h1 className="text-white text-2xl font-bold">{item?.language}</h1>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="overflow-x-auto mt-12">
          <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
            <thead className="bg-gray-950">
              <tr className="text-left">
                <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">Rank</th>
                <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">Language</th>
                <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">Total</th>
                <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">Previous</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="py-3 px-6 text-white">{index + 1}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={item.avatar || noimage} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                      <Link to={`/u/dashboard/${item.user._id}`} className="text-white hover:text-gray-400">
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-white">{item.language}</td>
                  <td className="py-3 px-6 text-white">{item.score}</td>
                  <td className="py-3 px-6">
                    <div className="flex gap-2">
                      {item.previous.map((day, idx) => (
                        <div
                          key={idx}
                          className={`w-5 h-5 rounded-md ${day === 0 ? "bg-red-500" : "bg-green-500"}`}
                        ></div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;