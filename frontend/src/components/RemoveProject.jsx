import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import toast from 'react-hot-toast';

function RemoveProjects() {

  const { data } = useContext(userContext);

  const handleRemove = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/dashboard/removeProject?projectId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success("Project removed Successfully")
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
        <div className="p-6 w-full max-w-4xl">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Remove Project
            </h3>
            <p className={`text-sm text-gray-500 dark:text-gray-400 mb-8`}>
                Manage your projects. Click "Delete" to remove a project.
            </p>
            <ul className="space-y-4">
                {data.projects?.map((project) => (
                    <li
                        key={project.id}
                        className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-sm"
                    >
                        <span className="text-gray-300">{project.projectName}</span>
                        <button
                            onClick={() => handleRemove(project._id)}
                            className="bg-[#0ec1e7] text-white py-1 px-3 rounded-md hover:bg-[#0eb4e7] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {(!data.projects || data.projects?.length === 0) && (
                <p className="text-gray-400 mt-4">No projects available to remove.</p>
            )}
        </div>
    </div>
  );
}

export default RemoveProjects;