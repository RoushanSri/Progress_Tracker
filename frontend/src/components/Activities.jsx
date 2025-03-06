import axios from 'axios';
import { Camera } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { userContext } from '../context/userContext';
import toast from 'react-hot-toast';

function Activities() {

    const { data, setData } = useContext(userContext);

const [projectName, setProjectName] = useState('');
const [githubUrl, setGithubUrl] = useState('');
const [description, setDescription] = useState('');
const [websiteUrl, setWebsiteUrl] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    const cover = e.target.coverImage.files[0];
    const reader = new FileReader(cover);
    reader.readAsDataURL(cover);
    reader.onload= async () =>{
        const base64Image = reader.result;
        try {
            const res=await axios.post('http://localhost:8080/api/dashboard/addProject', {
                base64Image,
                projectName,
                githubUrl,
                description,
                websiteUrl
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
            setData({...data,projects:[...data.projects,{base64Image,
                projectName,
                githubUrl,
                description,
                websiteUrl}]});
            toast.success('Project added successfully');
        } catch (error) {
            toast.error('Failed to add project');
        }
    }
};

return (
    <div className="w-full flex flex-col p-8 justify-center h-full">
        <h1 className='text-3xl font-bold text-white'>Projects Settings</h1>
        <p className='text-gray-300'>Add your projects to showcase your work</p>
        <div className="w-full mt-6 p-6 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Add Project</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 font-bold mb-2">Project Name : <span className='text-red-600 text-xl'>*</span></label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        placeholder="Enter your project name..."
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-300 focus:ring-gray-500 bg-gray-700 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 font-bold mb-2">Repository URL : <span className='text-red-600 text-xl'>*</span></label>
                    <input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        required
                        placeholder="https://github.com/"
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-300 focus:ring-gray-500 bg-gray-700 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 font-bold mb-2">Project URL:</label>
                    <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder='https://example.com'
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-300 focus:ring-gray-500 bg-gray-700 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 font-bold mb-2">Description : <span className='text-red-600 text-xl'>*</span></label>
                    <textarea
                        value={description}
                        rows="4"
                        required
                        placeholder="Write a brief description of your project..."
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-300 focus:ring-gray-500 bg-gray-700 text-white"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-300 font-bold">Cover Image : <span className='text-red-600 text-xl'>*</span></label>
                    <small className='text-gray-500'>Only .jpg, .jpeg, .png files are allowed</small>
                    <label htmlFor='coverImage' className='cursor-pointer'><Camera className='text-white bg-gray-700 rounded-md h-10 p-1 m-2 w-16'/></label>
                    <input
                        type="file"
                        accept="image/*"
                        id='coverImage'
                        required
                        className="hidden"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add Project
                </button>
            </form>
        </div>
    </div>
);
}

export default Activities
